export type CalculatorState = {
    mainDisplay: string;
    topDisplay: string;
    bottomDisplay: string;
    history: {
        id: number;
        expression: string;
        result: string;
        timestamp: string
    }[];
    enteredInfo: {
        operands: string[];
        operators: string[];
        operandsCurrentIndex: number;
    };
    isHistoryPaneVisible: boolean,
    isCalculatorMenuVisible: boolean,
};

export type CalculatorAction =
    | {
        type: "ADD_INPUT";
        payload: {
            input: string;
            inputType: "operand" | "operator"
        }
    }
    | { type: "CLEAR_ALL" }
    | { type: "CLEAR_ENTRY" }
    | { type: "EVALUATE" }
    | { type: "TOGGLE_HISTORY_PANE" };

export const calculatorInitialState: CalculatorState = {
    mainDisplay: "",
    topDisplay: "",
    bottomDisplay: "",
    history: [],
    enteredInfo: {
        operands: [],
        operators: [],
        operandsCurrentIndex: 0,
    },
    isHistoryPaneVisible: false,
    isCalculatorMenuVisible: false,
};

export function calculatorReducer(
    state: CalculatorState,
    action: CalculatorAction
): CalculatorState {
    switch (action.type) {
        case "ADD_INPUT": {
            const { input, inputType } = action.payload;
            const { operands, operators, operandsCurrentIndex } = state.enteredInfo;

            if (inputType === "operand") {
                operands[operandsCurrentIndex] = operands[operandsCurrentIndex]
                    ? operands[operandsCurrentIndex] + input
                    : input;

                return {
                    ...state,
                    mainDisplay: state.mainDisplay + input,
                    enteredInfo: { ...state.enteredInfo, operands },
                };
            }

            if (inputType === "operator") {
                if (!state.mainDisplay || operators.includes(state.mainDisplay.slice(-1))) {
                    return state; // Prevent invalid operator input
                }
                operands[operandsCurrentIndex + 1] = "";
                operators.push(input);

                return {
                    ...state,
                    mainDisplay: state.mainDisplay + input,
                    enteredInfo: {
                        ...state.enteredInfo,
                        operandsCurrentIndex: operandsCurrentIndex + 1,
                        operators,
                    },
                };
            }
            return state;
        }

        case "CLEAR_ALL":
            return calculatorInitialState;

        case "CLEAR_ENTRY": {
            const { mainDisplay, enteredInfo } = state;
            const lastChar = mainDisplay.slice(-1);

            if (["+", "-", "x", "/"].includes(lastChar)) {
                enteredInfo.operators.pop();
                return {
                    ...state,
                    mainDisplay: mainDisplay.slice(0, -1),
                    enteredInfo,
                };
            }

            const currentOperand = enteredInfo.operands[enteredInfo.operandsCurrentIndex] || "";
            enteredInfo.operands[enteredInfo.operandsCurrentIndex] = currentOperand.slice(0, -1);

            return {
                ...state,
                mainDisplay: mainDisplay.slice(0, -1),
                enteredInfo,
            };
        }

        case "EVALUATE": {
            const { operands, operators } = state.enteredInfo;
            if (operands.length < 2 || operators.length === 0) return state;

            let result = parseFloat(operands[0]);
            for (let i = 0; i < operators.length; i++) {
                const operandRight = parseFloat(operands[i + 1]);
                switch (operators[i]) {
                    case "+":
                        result += operandRight;
                        break;
                    case "-":
                        result -= operandRight;
                        break;
                    case "x":
                        result *= operandRight;
                        break;
                    case "/":
                        result /= operandRight;
                        break;
                    default:
                        break;
                }
            }

            const now = new Date();
            const timestamp = now.toISOString().split("T")[0] + " " + now.toTimeString().split(" ")[0];

            return {
                ...state,
                mainDisplay: result.toString(),
                topDisplay: state.mainDisplay,
                history: [
                    ...state.history,
                    {
                        id: state.history.length,
                        expression: state.mainDisplay,
                        result: result.toString(),
                        timestamp,
                    },
                ],
                enteredInfo: {
                    operands: [result.toString()],
                    operators: [],
                    operandsCurrentIndex: 0,
                },
            };
        }

        case "TOGGLE_HISTORY_PANE":
            return { ...state, isHistoryPaneVisible: !state.isHistoryPaneVisible };

        default:
            return state;
    }
}
