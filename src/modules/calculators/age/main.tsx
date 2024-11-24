import CalculatorAgeBody from "./components/calculator-body";
import { AgeCalculatorStateDispatchProvider } from "./context/provider";



const CalculatorAgeMain = () => {

    return (
        <AgeCalculatorStateDispatchProvider>
            <CalculatorAgeBody />
        </AgeCalculatorStateDispatchProvider>
    )
}

export default CalculatorAgeMain