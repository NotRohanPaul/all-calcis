import { useCurrencyConverterStateContext } from "../../context/consumer";
import { InputGroup } from "./main-components";

const MainContent = () => {
    const converterState = useCurrencyConverterStateContext();

    return (
        <>
            {converterState.inputGroupList.map((inputGroupObj) => (
                <InputGroup
                    key={inputGroupObj.inputGroupId}
                    inputGroupObj={inputGroupObj}
                />
            ))}
        </>
    );

};

export default MainContent;