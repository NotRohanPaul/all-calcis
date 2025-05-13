import { useEffect, useState } from "react";
import { unitsDetailsList } from "../../constants/units-converter-constants";
import { FooterUnitsTable } from "./footer-units-table";
import { CategoryButtons } from "./footer-button-components";
import { useUnitConverterStateContext } from "../../context/consumer";
import { getCurrentCategory } from "../../utils/converter-utils";

const FooterContent = () => {
    const converterState = useUnitConverterStateContext();
    const [currentCategory, setCurrentCategory] = useState<string>(
        () => getCurrentCategory(converterState) ?? unitsDetailsList[0].category
    );

    useEffect(() => {
        const newCategory = getCurrentCategory(converterState) ?? unitsDetailsList[0].category;
        setCurrentCategory(newCategory);
    }, [converterState]);



    return (
        <div className="w-full h-full flex gap-2 p-1 pr-2 overflow-hidden contain-paint">
            <aside className="min-w-[25%] h-[80%] self-end flex flex-col gap-2 text-white overflow-auto p-1"
                onClick={(e) => {
                    const target = e.target as HTMLButtonElement;
                    if (target.tagName === "BUTTON" && "value" in target)
                        setCurrentCategory(target.value);
                }}
                children={<CategoryButtons currentCategory={currentCategory} />}
            />
            <FooterUnitsTable key="input-group" groupType="inputGroup" currentCategory={currentCategory} />
            <FooterUnitsTable key="to-group" groupType="toGroup" currentCategory={currentCategory} />
        </div>
);
};

export default FooterContent;