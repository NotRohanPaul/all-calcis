import { useCalculatorState } from "../context/consumer"

const CalculatorNormalDisplay = () => {
    const calculatorState = useCalculatorState()

    return (
        <>
            <p className="w-full absolute right-2 top-0 flex flex-row-reverse flex-nowrap items-center tracking-wide font-mono text-nowrap text-sm overflow-x-hidden overflow-y-hidden"
            >
                {calculatorState.topDisplay}
            </p>
            <p className="h-full flex flex-row-reverse flex-nowrap items-center tracking-wide font-mono text-nowrap overflow-x-hidden overflow-y-hidden" >
                {calculatorState.mainDisplay}
            </p>
            <p
                className="w-full absolute right-2 bottom-0 flex flex-row-reverse flex-nowrap items-center tracking-wide font-mono text-nowrap text-sm overflow-x-hidden overflow-y-hidden"
            >
                {calculatorState.bottomDisplay}
            </p>
        </>
    )
}

export default CalculatorNormalDisplay