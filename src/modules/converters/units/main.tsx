import UnitsConverterBody from "./components/converter-body"
import { UnitConverterStateDispatchProvider } from "./context/provider"

const UnitsConverterMain = () => {
    return (
        <UnitConverterStateDispatchProvider>
            <UnitsConverterBody />
        </UnitConverterStateDispatchProvider>
    )
}

export default UnitsConverterMain