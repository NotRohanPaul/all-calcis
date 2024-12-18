import { useState } from "react";
import { combinedCurrencyDetailsList } from "../../constants/converter-constatnts";

const FooterContent = () => {
    const [currentCategory, setCurrentCategory] = useState("Asia");

    return (
        <section className="w-full h-full flex flex-col gap-2 text-white overflow-auto">
            <header className="w-full flex flex-col items-center">
                <div>
                    Group Id
                </div>
                <div>
                    Unit Id
                </div>
            </header>

            <main className="w-full h-full flex items-center overflow-auto">
                <aside className="w-[25%] h-full p-2 pr-0 bg-orange-400">
                    <div className="w-full h-full flex flex-col gap-2 overflow-auto pr-2"
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
                                            key={`category-${currencyDetailsObj.category}`}
                                            value={currencyDetailsObj.category}
                                            className={`w-full h-full p-2 ${currencyDetailsObj.category === currentCategory ? "bg-blue-500" : "bg-gray-700"}`}
                                            tabIndex={currencyDetailsObj.category === currentCategory ? -1 : 0}
                                        >
                                            {currencyDetailsObj.category}
                                        </button>
                                    );
                                })}
                            </>
                        }
                    />
                </aside>

                <div className="w-full h-full flex flex-col gap-2 p-2 bg-orange-400 overflow-auto">
                    <>
                        {combinedCurrencyDetailsList.map((currencyDetailsObj) => {
                            if (currencyDetailsObj.category !== currentCategory) return;

                            return currencyDetailsObj.subCategoryList.map((subCategoryObj) => {
                                return subCategoryObj.currencyList.map((currencyObj) => {
                                    return (<button
                                        key={`currency-options-${currencyDetailsObj.category}-${subCategoryObj.subCategoryName}-${currencyObj.currencyName}`}
                                        className="p-2 bg-green-700"
                                    >
                                        {`${subCategoryObj.subCategoryName} -
                                          ${currencyObj.currencyName} 
                                          (${currencyObj.currencyShortForm})
                                        `}
                                    </button>);
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