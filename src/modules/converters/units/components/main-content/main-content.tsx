import { InputGroup } from "./input-group";
import { useUnitConverterStateContext } from "../../context/consumer";



const MainContent = () => {
    const converterState = useUnitConverterStateContext()
    return (
        <>
            {converterState.inputGroupList.map((value) => {
                return (
                    <InputGroup key={value.id} value={value} />
                )
            })}
        </>
    )
}

export default MainContent;