import { CalculatorNormalBody } from "./components";
import { CalculatorStateDispatchProvider } from "./context/provider";


const CalculatorNormalMain = () => {

    return (
        <CalculatorStateDispatchProvider>
            <CalculatorNormalBody />
        </CalculatorStateDispatchProvider>
    )
}

export default CalculatorNormalMain


