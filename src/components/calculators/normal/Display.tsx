
const CalculatorNormalDisplay = ({
    calculatorTopDisplay,
    calculatorMainDisplay,
    calculatorBottomDisplay
}: {
    calculatorTopDisplay: string,
    calculatorMainDisplay: string,
    calculatorBottomDisplay: string
}) => (
    <>
        <p className="w-full absolute right-2 top-0 flex flex-row-reverse flex-nowrap items-center tracking-wide font-mono text-nowrap text-sm overflow-x-hidden overflow-y-hidden"
        >
            {calculatorTopDisplay}
        </p>
        <p className="h-full flex flex-row-reverse flex-nowrap items-center tracking-wide font-mono text-nowrap overflow-x-hidden overflow-y-hidden" >
            {calculatorMainDisplay}
        </p>
        <p
            className="w-full absolute right-2 bottom-0 flex flex-row-reverse flex-nowrap items-center tracking-wide font-mono text-nowrap text-sm overflow-x-hidden overflow-y-hidden"
        >
            {calculatorBottomDisplay}
        </p>
    </>
)

export default CalculatorNormalDisplay