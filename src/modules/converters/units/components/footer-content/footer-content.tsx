import { useMemo, useState } from "react"
import { unitsDetailsList } from "../../constants/units-converter-constants"
import { FooterUnitsTable } from "./footer-table"
import { CategoryButtons } from "./footer-button-components";
import { useUnitConverterStateContext } from "../../context/consumer";
import { getCurrentCategory } from "../../utils/converter-utils";

const FooterContent = () => {
    const converterState = useUnitConverterStateContext();
    const initialCategory = useMemo(
        () => getCurrentCategory(converterState) ?? unitsDetailsList[0].category,
        [converterState]
    );
    const [currentCategory, setCurrentCategory] = useState<string>(initialCategory);

    return (
        <div className="w-full h-full flex gap-2 p-1 pr-2 overflow-auto">
            <aside className="w-[25%] h-[80%] self-end flex flex-col gap-2 text-white overflow-auto p-1"
                onClick={(e) => {
                    const target = e.target as HTMLButtonElement
                    if (target.tagName === "BUTTON" && "value" in target)
                        setCurrentCategory(target.value)
                }}
                children={<CategoryButtons currentCategory={currentCategory} />}
            />
            <FooterUnitsTable groupType="inputGroup" currentCategory={currentCategory} />
            <FooterUnitsTable groupType="toGroup" currentCategory={currentCategory} />
        </div>
    )
}

export default FooterContent