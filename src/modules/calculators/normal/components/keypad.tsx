import {
    useEffect,
    useState,
} from "react"

import {
    orderedButtons
} from "../constants/normal-calc"
import useHandleButtonClick from "../hooks/useHandleButtonClick";

const CalculatorNormalKeypad = () => {
    const [typedSymbol, setTypedSymbol] = useState<string | null>(null)
    const handleButtonClick = useHandleButtonClick(setTypedSymbol);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            handleButtonClick(e);
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleButtonClick]);


    useEffect(() => {
        const handleKeyUp = () => {
            setTypedSymbol(null)
        };

        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);


    return (
        <div className="h-full grid grid-cols-4 gap-1 "
            onClick={handleButtonClick}
        >
            {orderedButtons.map(({ name, symbol, type }) =>
                <button
                    key={name}
                    value={symbol}
                    className={`bg-orange-200 p-2 hover:bg-orange-300 active:bg-orange-400 focus:outline-none ${typedSymbol === symbol ? "bg-orange-400" : "bg-orange-200"
                        }`}
                    data-name={name}
                    data-symbol={symbol}
                    data-type={type}
                    aria-label={name}
                    tabIndex={-1}
                    onClick={(e) => e.preventDefault()}
                    onKeyDown={(e) => e.preventDefault()}
                >
                    {symbol}
                </button>
            )}
        </div>
    )
}

export default CalculatorNormalKeypad