import {
    MouseEvent,
} from "react"

import {
    buttonLayout,
    orderedButtons
} from "../constants/normal-calc"
import { useCalculatorDispatch } from "../context/consumer"


const CalculatorNormalKeypad = () => {
    const CalulatorDispatch = useCalculatorDispatch()
    const handleButtonClick = (e: MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLButtonElement;
        const { symbol: inputSymbol, type: inputType } = target.dataset;

        if (!(inputSymbol && buttonLayout.includes(inputSymbol))) return;

        switch (inputType) {
            case "operand": {
                CalulatorDispatch({
                    type: "ADD_OPERAND",
                    payload: {
                        inputSymbol
                    }
                })
                return;
            }

            case "operator": {
                CalulatorDispatch({
                    type: "ADD_OPERATOR",
                    payload: {
                        inputSymbol
                    }
                })
                return;
            }

            case "special": {
                switch (inputSymbol) {
                    case "C": {
                        CalulatorDispatch({ type: "CLEAR_ALL" })
                        return;
                    }

                    case "CE": {
                        CalulatorDispatch({ type: "CLEAR_ENTRY" })
                        return;
                    }

                    case "%": {
                        CalulatorDispatch({ type: "ADD_PERCENTAGE" })
                        return;
                    }

                    case ".": {
                        CalulatorDispatch({ type: "ADD_DECIMAL" })
                        return;
                    }

                    case "=": {
                        CalulatorDispatch({ type: "EVALUATE" })
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