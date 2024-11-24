import { Dispatch, MouseEvent, SetStateAction } from "react";
import { buttonLayout, orderedButtons } from "../constants/normal-calc";
import { useCalculatorDispatch } from "../context/consumer";

const useHandleButtonClick = (setTypedSymbol: Dispatch<SetStateAction<string | null>>) => {
    const calulatorDispatch = useCalculatorDispatch()

    const handleButtonClick = (e: MouseEvent<HTMLDivElement> | KeyboardEvent) => {
        let target: HTMLElement;
        let inputSymbol: string | undefined;
        let inputType: string | undefined;

        if ('key' in e) {
            let key = e.key;
            if (key === "Enter") key = "=";
            if (key === "*") key = "x";
            const button = orderedButtons.find(b => b.symbol === key);
            if (button) {
                setTypedSymbol(button.symbol)
                inputSymbol = button.symbol;
                inputType = button.type;
            }
        } else {
            target = e.target as HTMLButtonElement;
            inputSymbol = target.dataset.symbol;
            inputType = target.dataset.type;
        }

        if (!(inputSymbol && buttonLayout.includes(inputSymbol))) return;

        switch (inputType) {
            case "operand": {
                calulatorDispatch({
                    type: "ADD_OPERAND",
                    payload: {
                        inputSymbol
                    }
                })
                return;
            }

            case "operator": {
                calulatorDispatch({
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
                        calulatorDispatch({ type: "CLEAR_ALL" })
                        return;
                    }

                    case "CE": {
                        calulatorDispatch({ type: "CLEAR_ENTRY" })
                        return;
                    }

                    case "%": {
                        calulatorDispatch({ type: "ADD_PERCENTAGE" })
                        return;
                    }

                    case "+/-": {
                        calulatorDispatch({ type: "CHANGE_TYPE" })
                        return;
                    }

                    case ".": {
                        calulatorDispatch({ type: "ADD_DECIMAL" })
                        return;
                    }

                    case "=": {
                        calulatorDispatch({ type: "EVALUATE" })
                        return;
                    }
                }
            }

        }
        return;
    }

    return handleButtonClick
}

export default useHandleButtonClick