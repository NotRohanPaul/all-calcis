import { useEffect, useState } from "react";
import { combinedCurrencyDetailsList } from "../../constants/converter-constatnts";

const FooterContent = () => {
    const [currentCategory, setCurrentCategory] = useState("Asia");
    useEffect(() => {
        console.log(currentCategory);
    }, [currentCategory]);

    return (
        <section className="w-full h-full flex flex-col gap-2 overflow-auto">
            <header className="w-full flex flex-col items-center">
                <div>
                    Group Id
                </div>
                <div>
                    Unit Id
                </div>
            </header>
            <main className="w-full flex flex-col items-center">
                <div className="flex gap-2"
                    onClick={(e) => {
                        if ((e.target as HTMLButtonElement).tagName !== "BUTTON") return;
                        const target = e.target as HTMLButtonElement;
                        setCurrentCategory(target.value);
                    }}
                    children={
                        <>
                            {combinedCurrencyDetailsList.map((currencyDetailsObj) => {
                                return (
                                    <button
                                        value={currencyDetailsObj.category}>
                                        {currencyDetailsObj.category}
                                    </button>
                                );
                            })}
                        </>
                    }
                />
                <div className="flex flex-col">
                    <>
                        {combinedCurrencyDetailsList.map((currencyDetailsObj) => {
                            if (currencyDetailsObj.category !== currentCategory) return;

                            return currencyDetailsObj.subCategoryList.map((subCategoryObj) => {
                                return subCategoryObj.currencyList.map((currencyObj) => {
                                    return <button
                                    >
                                        {subCategoryObj.subCategoryName}
                                        {currencyObj.currencyName}
                                        {currencyObj.currencyShortForm}
                                    </button>;
                                }
                                );
                            });
                        })}
                    </>
                </div>
            </main>
        </section >
    );
};

export default FooterContent;