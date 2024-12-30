import { MouseEvent, useState } from "react";
import { CategoryButtons, CurrencyButtons, InputColors } from "./footer-components";
import { useCurrencyConverterDispatchContext } from "../../context/consumer";

const FooterContent = () => {
    const converterDispatch = useCurrencyConverterDispatchContext();
    const [currentCategory, setCurrentCategory] = useState("Asia");

    const handleClick = (e: MouseEvent<HTMLElement>) => {
        const target = e.target as HTMLButtonElement;

        if (target.tagName !== "BUTTON") return;

        const {
            subCategoryName,
            currencyName,
            currencySymbol,
            currencyShortForm,
            relativeValueToUsd: relativeValueToUSD
        } = target.dataset;

        if (![
            subCategoryName,
            currencyName,
            currencySymbol,
            currencyShortForm,
            relativeValueToUSD
        ].every((item) => typeof item !== "undefined"))
            return;

        { console.log("hello"); }

        converterDispatch({
            type: "SET_INPUT_GROUP_OR_FIELD_CURRENCY_DETAILS",
            payload: {
                category: currentCategory,
                subCategory: subCategoryName as string,
                currencyName: currencyName as string,
                currencySymbol: currencySymbol as string,
                currencyShortForm: currencyShortForm as string,
                relativeValueToUSD: +(relativeValueToUSD as string),
            }
        });

    };

    return (
        <section className="w-full h-full flex flex-col gap-2 text-white overflow-auto">
            <header className="w-full flex gap-2 items-center justify-center">
                <InputColors />
            </header>

            <main className="w-full h-full flex items-center overflow-auto">
                <aside className="w-[25%] h-full p-2 pr-0 bg-orange-400">
                    <div className="w-full h-full flex flex-col gap-2 overflow-auto pr-2"
                        onClick={(e) => {
                            if ((e.target as HTMLButtonElement).tagName !== "BUTTON") return;
                            const target = e.target as HTMLButtonElement;
                            setCurrentCategory(target.value);
                        }}
                    >
                        <CategoryButtons
                            currentCategory={currentCategory}
                        />
                    </div>
                </aside>

                <aside className="w-full h-full bg-orange-400 p-2">
                    <div className="w-full h-full flex flex-col gap-2 overflow-auto"
                        onClick={handleClick}
                    >
                        <CurrencyButtons
                            currentCategory={currentCategory}
                        />
                    </div>
                </aside>

            </main>
        </section >
    );
};

export default FooterContent;