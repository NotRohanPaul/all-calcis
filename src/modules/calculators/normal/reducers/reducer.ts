import { operatorButtons } from "../constants/normal-calc";
import { CalculatorAction, CalculatorState } from "../types";
import { isOperator } from "../utils/utils";


export const calculatorInitialState: CalculatorState = {
    mainDisplay: "",
    topDisplay: "",
    bottomDisplay: "",
    enteredInfo: {
        operands: [],
        operators: [],
        operandsCurrentIndex: 0,
    },
    isCalculatorMenuVisible: false,
    history: [],
    isHistoryPaneVisible: false,
};

export function calculatorReducer(
    state: CalculatorState,
    action: CalculatorAction
): CalculatorState {
    const previousInput = state.mainDisplay.at(-1);
    const isPreviousInputOperator = !!operatorButtons.find(button => button.symbol === previousInput)?.symbol;

    switch (action.type) {
        case "ADD_OPERAND": {
            if (previousInput === "%") return state;

            const newMainDisplayText = state.mainDisplay + action.payload.inputSymbol;
            const newOperands = [...state.enteredInfo.operands];
            const operandIndex = state.enteredInfo.operandsCurrentIndex;

            newOperands[operandIndex] = !newOperands[operandIndex] ?
                action.payload.inputSymbol
                :
                newOperands[operandIndex] + action.payload.inputSymbol

            return {
                ...state,
                mainDisplay: newMainDisplayText,
                enteredInfo: {
                    ...state.enteredInfo,
                    operands: newOperands
                }
            }
        }

        case "ADD_OPERATOR": {
            if (isPreviousInputOperator || state.mainDisplay === "") return state;

            const newMainDisplayText = state.mainDisplay + action.payload.inputSymbol;
            const newOperandsCurrentIndex = state.enteredInfo.operandsCurrentIndex + 1;
            const newOperators = [...state.enteredInfo.operators];
            newOperators.push(action.payload.inputSymbol)

            return {
                ...state,
                mainDisplay: newMainDisplayText,
                enteredInfo: {
                    ...state.enteredInfo,
                    operandsCurrentIndex: newOperandsCurrentIndex,
                    operators: newOperators
                }

            }
        }

        case "ADD_DECIMAL": {
            const newOperands = [...state.enteredInfo.operands];
            const currentIndex = state.enteredInfo.operandsCurrentIndex;

            if (newOperands[currentIndex] && newOperands[currentIndex].includes(".")) return state;


            newOperands[currentIndex] = newOperands[currentIndex] ? newOperands[currentIndex] + "." : "."

            return {
                ...state,
                mainDisplay: state.mainDisplay + ".",
                enteredInfo: {
                    ...state.enteredInfo,
                    operands: newOperands
                }
            }
        }

        case "ADD_PERCENTAGE": {
            if (previousInput === "%" || isPreviousInputOperator) return state;

            const newOperands = [...state.enteredInfo.operands];
            const currentIndex = state.enteredInfo.operandsCurrentIndex;

            newOperands[currentIndex] = parseFloat((+newOperands[currentIndex] / 100).toFixed(3)).toString()

            return {
                ...state,
                mainDisplay: state.mainDisplay + "%",
                enteredInfo: {
                    ...state.enteredInfo,
                    operands: newOperands
                }
            }
        }

        case "CLEAR_ALL": {
            return {
                ...state,
                mainDisplay: "",
                topDisplay: "",
                bottomDisplay: "",
                enteredInfo: {
                    operands: [],
                    operandsCurrentIndex: 0,
                    operators: []
                },
            }
        }

        case "CLEAR_ENTRY": {
            if (isPreviousInputOperator) {
                const newMainDisplayText = state.mainDisplay.slice(0, -1)
                const newOperators = state.enteredInfo.operators.splice(0, -1);


                return {
                    ...state,
                    mainDisplay: newMainDisplayText,
                    enteredInfo: {
                        ...state.enteredInfo,
                        operators: newOperators
                    }
                }

            }

            let newMainDisplayText = state.mainDisplay;
            let islastInputTypeOperand = true;
            let lastIndexToSlice = newMainDisplayText.length;

            for (let i = newMainDisplayText.length - 1; islastInputTypeOperand === true && i >= 0; i--) {
                if (isOperator(newMainDisplayText[i])) {
                    islastInputTypeOperand = false;
                }
                else {
                    lastIndexToSlice = i;
                }
            }

            newMainDisplayText = newMainDisplayText.slice(0, lastIndexToSlice);

            let newOperandsCurrentIndex = state.enteredInfo.operandsCurrentIndex;

            if (newOperandsCurrentIndex !== 0)
                newOperandsCurrentIndex--;

            const newOperators = state.enteredInfo.operators.splice(0, -1);

            return {
                ...state,
                mainDisplay: newMainDisplayText,
                enteredInfo: {
                    ...state.enteredInfo,
                    operandsCurrentIndex: newOperandsCurrentIndex,
                    operators: newOperators,

                }
            }
        }

        case "EVALUATE": {
            if (state.enteredInfo.operators.length == 0 || state.enteredInfo.operands.length !== state.enteredInfo.operators.length + 1) return state;

            const newOperands = [...state.enteredInfo.operands];
            const newOperators = [...state.enteredInfo.operators];
            let newOperandsCurrentIndex = state.enteredInfo.operandsCurrentIndex;

            let result: string = "";
            for (let i = 0; i < newOperands.length - 1; i++) {
                if (newOperators[i] !== "x" && newOperators[i] !== "/") continue;

                const operandLeft = [newOperands[i]];
                const operandRight = [newOperands[i + 1]];
                if (newOperators[i] === "x") {

                    result = parseFloat((+operandLeft * +operandRight).toFixed(3)).toString();
                }
                else if (newOperators[i] === "/") {

                    result = parseFloat((+operandLeft / +operandRight).toFixed(3)).toString();
                }

                newOperands.splice(i, i + 2, result)
                newOperators.splice(i, i + 1)
                if (newOperandsCurrentIndex !== 0)
                    newOperandsCurrentIndex--;

                i--;
            }

            for (let i = 0; i < newOperands.length - 1; i++) {
                if (newOperators[i] !== "-" && newOperators[i] !== "+") continue;

                const operandLeft = [newOperands[i]];
                const operandRight = [newOperands[i + 1]];
                if (newOperators[i] === "-") {
                    result = parseFloat((+operandLeft - +operandRight).toFixed(3)).toString();
                }
                else if (newOperators[i] === "+") {
                    result = parseFloat((+operandLeft + +operandRight).toFixed(3)).toString();
                }

                newOperands.splice(i, i + 2, result)
                newOperators.splice(i, i + 1)
                if (newOperandsCurrentIndex !== 0)
                    newOperandsCurrentIndex--;

                i--;
            }

            if (Number.isNaN(result) || !Number.isFinite(Number(result)) || result === "") {
                return {
                    ...state,
                    bottomDisplay: result,
                };
            }

            const newHistory = [...state.history];
            const now = new Date();
            let date = now.toISOString().split('T')[0];
            const time = now.toTimeString().split(' ')[0];
            date = date.split("-").reverse().join("-")

            newHistory.push({
                id: newHistory.length,
                expression: state.mainDisplay,
                result: result,
                timestamp: date + " " + time
            })

            return {
                ...state,
                topDisplay: state.mainDisplay,
                mainDisplay: result,
                enteredInfo: {
                    operandsCurrentIndex: 0,
                    operands: [result],
                    operators: []
                },
                history: newHistory,
            }
        }

        case "TOGGLE_HISTORY_PANE":
            return { ...state, isHistoryPaneVisible: !state.isHistoryPaneVisible };

        case "TOGGLE_CALC_MENU":
            return { ...state, isCalculatorMenuVisible: !state.isCalculatorMenuVisible };

        default:
            return state;
    }
}



