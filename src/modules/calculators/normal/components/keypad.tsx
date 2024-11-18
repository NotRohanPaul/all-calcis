import {
    Dispatch,
    MouseEvent,
    SetStateAction,
    useRef
} from "react"
import {
    buttonLayout,
    operatorButtons,
    orderedButtons
} from "../constants/normal-calc"
import { CalculatorHistoryType } from "../types"

function isOperator(symbol: string) {
    return !!operatorButtons.find((button) => button.symbol === symbol)
}

const CalculatorNormalKeypad = ({
    calculatorMainDisplay,
    setCalculatorMainDisplay,
    setCalculatorTopDisplay,
    setCalculatorBottomDisplay,
    setCalculatorHistory,
}: {
    calculatorMainDisplay: string,
    setCalculatorMainDisplay: Dispatch<SetStateAction<string>>,
    setCalculatorTopDisplay: Dispatch<SetStateAction<string>>,
    setCalculatorBottomDisplay: Dispatch<SetStateAction<string>>,
    setCalculatorHistory: Dispatch<SetStateAction<CalculatorHistoryType[]>>
}) => {

    const enteredInfo = useRef<{
        operandsCurrentIndex: number,
        operands: string[],
        operators: string[]
    }>({
        operands: [],
        operandsCurrentIndex: 0,
        operators: [],
    })


    const handleButtonClick = (e: MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLButtonElement;
        const { symbol: inputSymbol, type: inputType } = target.dataset;

        if (!(inputSymbol && buttonLayout.includes(inputSymbol))) return;

        const previousInput = calculatorMainDisplay.at(-1);
        const isPreviousInputOperator = !!operatorButtons.find(button => button.symbol === previousInput)?.symbol;

        const handleOperandInput = () => {
            const operandIndex = enteredInfo.current.operandsCurrentIndex;
            enteredInfo.current.operands[operandIndex] = !enteredInfo.current.operands[operandIndex] ?
                inputSymbol
                :
                enteredInfo.current.operands[operandIndex] + inputSymbol

            setCalculatorMainDisplay(prev => {
                return prev + inputSymbol;
            })
        }

        const handleOperatorInput = () => {
            if (isPreviousInputOperator || calculatorMainDisplay === "") return;
            enteredInfo.current.operandsCurrentIndex++;
            enteredInfo.current.operators.push(inputSymbol)
            setCalculatorMainDisplay(prev => prev + inputSymbol)
        }

        const handleClearInput = () => {
            enteredInfo.current = {
                operands: [],
                operandsCurrentIndex: 0,
                operators: []
            }
            setCalculatorMainDisplay("")
            setCalculatorTopDisplay("")
        }

        const handleClearEntryInput = () => {
            if (isPreviousInputOperator) {
                setCalculatorMainDisplay(calculatorMainDisplay.slice(0, -1));
                enteredInfo.current.operators.pop();
                return;
            }

            const newOutput = calculatorMainDisplay;
            let islastInputTypeOperand = true;
            let lastIndexToSlice = newOutput.length;
            for (let i = newOutput.length - 1; islastInputTypeOperand === true && i >= 0; i--) {
                if (isOperator(newOutput[i])) {
                    islastInputTypeOperand = false;
                }
                else {
                    lastIndexToSlice = i;
                }
            }

            if (enteredInfo.current.operandsCurrentIndex !== 0)
                enteredInfo.current.operandsCurrentIndex--;
            enteredInfo.current.operands.pop();
            setCalculatorMainDisplay(newOutput.slice(0, lastIndexToSlice))
        }

        const handelEqualInput = () => {
            if (enteredInfo.current.operators.length == 0 || enteredInfo.current.operands.length !== enteredInfo.current.operators.length + 1) return;

            let result: string = "";
            for (let i = 0; i < enteredInfo.current.operands.length - 1; i++) {
                if (enteredInfo.current.operators[i] !== "x" && enteredInfo.current.operators[i] !== "/") continue;

                if (enteredInfo.current.operators[i] === "x") {
                    const operandLeft = enteredInfo.current.operands[i]
                    const operandRight = enteredInfo.current.operands[i + 1];

                    result = parseFloat((+operandLeft * +operandRight).toFixed(3)).toString();
                }
                else if (enteredInfo.current.operators[i] === "/") {
                    const operandLeft = enteredInfo.current.operands[i]
                    const operandRight = enteredInfo.current.operands[i + 1];

                    result = parseFloat((+operandLeft / +operandRight).toFixed(3)).toString();
                }

                enteredInfo.current.operands.splice(i, i + 2, result)
                enteredInfo.current.operators.splice(i, i + 1)
                if (enteredInfo.current.operandsCurrentIndex !== 0)
                    enteredInfo.current.operandsCurrentIndex--;

                i--;
            }

            for (let i = 0; i < enteredInfo.current.operands.length - 1; i++) {
                if (enteredInfo.current.operators[i] !== "-" && enteredInfo.current.operators[i] !== "+") continue;

                const operandLeft = enteredInfo.current.operands[i]
                const operandRight = enteredInfo.current.operands[i + 1];
                if (enteredInfo.current.operators[i] === "-") {
                    result = parseFloat((+operandLeft - +operandRight).toFixed(3)).toString();
                }
                else if (enteredInfo.current.operators[i] === "+") {
                    result = parseFloat((+operandLeft + +operandRight).toFixed(3)).toString();
                }

                enteredInfo.current.operands.splice(i, i + 2, result)
                enteredInfo.current.operators.splice(i, i + 1)
                if (enteredInfo.current.operandsCurrentIndex !== 0)
                    enteredInfo.current.operandsCurrentIndex--;

                i--;
            }


            if (Number.isNaN(result) || !Number.isFinite(Number(result))) {
                setCalculatorBottomDisplay(result)
                return;
            }

            setCalculatorHistory(prev => {
                const newArr = [...prev];
                const now = new Date();
                const date = now.toISOString().split('T')[0];
                const time = now.toTimeString().split(' ')[0];
                newArr.push({
                    id: newArr.length,
                    expression: calculatorMainDisplay,
                    result: result,
                    timestamp: date + " " + time
                })

                return newArr;
            })
            setCalculatorTopDisplay(calculatorMainDisplay)
            enteredInfo.current = {
                operandsCurrentIndex: 0,
                operands: [result],
                operators: []
            }
            setCalculatorMainDisplay(result)
        }

        switch (inputType) {
            case "operand": {
                handleOperandInput()
                return;
            }

            case "operator": {
                handleOperatorInput()
                return;
            }

            case "special": {
                switch (inputSymbol) {
                    case "C": {
                        handleClearInput()
                        return;
                    }

                    case "CE": {
                        handleClearEntryInput()
                        return;
                    }
                    case "=": {
                        handelEqualInput()
                        return;
                    }
                    case ".": {
                        setCalculatorMainDisplay(prev => prev + '.')
                        return;
                    }
                }
            }

        }

        return;
    }


    return (
        <div className="h-full grid grid-cols-4 gap-1 "
            onClick={handleButtonClick}
        >
            {orderedButtons.map(({ name, symbol, type }) =>
                <button
                    key={name}
                    value={symbol}
                    className="bg-orange-200 p-2 hover:bg-orange-300 active:bg-orange-400"
                    data-name={name}
                    data-symbol={symbol}
                    data-type={type}
                    aria-label={name}
                >
                    {symbol}
                </button>
            )}
        </div>
    )
}

export default CalculatorNormalKeypad