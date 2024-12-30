import { MouseEvent, useMemo } from "react";
import { useCurrencyConverterStateContext, useCurrencyConverterDispatchContext } from "../../context/consumer";
import { InputType } from "../../types";
import { combinedCurrencyDetailsList } from "../../constants/converter-constatnts";
import { getInputFieldsCurrencyShortFormList } from "../../utils/currency-converter";

export const InputColors = () => {
    const converterState = useCurrencyConverterStateContext();
    const converterDispatch = useCurrencyConverterDispatchContext();

    const handleClick = (e: MouseEvent<HTMLElement>, inputType: InputType) => {
        if (inputType !== "inputField"
            &&
            inputType !== "inputGroup")
            return;

        const target = e.target as HTMLButtonElement;
        if (!target.closest("button")) return;

        const groupId = target.dataset.groupId;
        if (!groupId) return;

        if (inputType === "inputGroup") {
            document.querySelector(`#input-group-${groupId}`)?.scrollIntoView();
        }

        converterDispatch({
            type: "SET_SELECTED_INPUT_GROUP_OR_FIELD_ID",
            payload: {
                groupId,
                inputType,
            }
        });
    };

    return (
        <>
            <div className="flex items-center gap-3 bg-orange-400 rounded-md p-2"
                onClick={(e) => handleClick(e, "inputGroup")}
            >
                Groups:
                {
                    converterState.inputGroupList.map((inputGroupObj) => {
                        return (
                            <button
                                key={`group-color-button-${inputGroupObj.inputGroupId}`}
                                className={`
                                    size-4 rounded-full 
                                    ${converterState.selectedInputGroupId === inputGroupObj.inputGroupId ? "outline outline-2 outline-white cursor-default" : ""}
                                    `}
                                data-group-id={inputGroupObj.inputGroupId}
                                tabIndex={converterState.selectedInputGroupId === inputGroupObj.inputGroupId ? -1 : 0}
                                style={{
                                    backgroundColor: inputGroupObj.inputGroupColor,
                                }}
                            />
                        );
                    })
                }
            </div>
            <div className="flex items-center gap-3 bg-orange-400 rounded-md p-2"
                onClick={(e) => handleClick(e, "inputField")}
            >
                Fields:
                {
                    converterState.inputGroupList.map((inputGroupObj) => {
                        if (inputGroupObj.inputGroupId === converterState.selectedInputGroupId)
                            return inputGroupObj.inputFieldList.map((inputFieldObj) => (
                                <button
                                    key={`filed-color-button-${inputFieldObj.inputFieldId}`}
                                    className={`
                                        size-4 rounded-full 
                                        ${inputFieldObj.inputFieldId === inputGroupObj.selectedInputFieldId ? "outline outline-2 outline-white cursor-default" : ""}
                                        `}
                                    data-group-id={inputFieldObj.inputFieldId}
                                    tabIndex={inputFieldObj.inputFieldId === inputGroupObj.selectedInputFieldId ? -1 : 0}
                                    style={{
                                        backgroundColor: inputFieldObj.inputFieldColor,
                                    }}
                                />
                            ));

                    })
                }
            </div>
        </>
    );
};

export const CategoryButtons = ({
    currentCategory
}: {
    currentCategory: string;
}) => {

    return (
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
    );
};

export const CurrencyButtons = ({
    currentCategory
}: {
    currentCategory: string;
}) => {
    const converterState = useCurrencyConverterStateContext();
    const currencyDetailsObj = combinedCurrencyDetailsList.find((currencyDetailsObj) => currencyDetailsObj.category === currentCategory);
    const inputFieldsCurrencyDetailsList = useMemo(() => getInputFieldsCurrencyShortFormList(converterState), [converterState]);


    return (
        <>
            {currencyDetailsObj
                &&
                currencyDetailsObj.subCategoryList.map((subCategoryObj) => subCategoryObj.currencyList.map((currencyObj) => {
                    const isCurrencySelectedBefore = inputFieldsCurrencyDetailsList.some((currencyShortForm) => currencyShortForm === currencyObj.currencyShortForm);
                    return (<button
                        key={`currency-options-${currencyObj.currencyName}`}
                        className={`p-2 ${isCurrencySelectedBefore ? "bg-gray-500" : "bg-green-700"}`}
                        data-sub-category-name={subCategoryObj.subCategoryName}
                        data-currency-name={currencyObj.currencyName}
                        data-currency-symbol={currencyObj.currencySymbol}
                        data-currency-short-form={currencyObj.currencyShortForm}
                        data-relative-value-to-usd={currencyObj.relativeValueToUSD}
                        disabled={isCurrencySelectedBefore}
                        tabIndex={isCurrencySelectedBefore ? -1 : 0}
                        children={
                            `${subCategoryObj.subCategoryName} -
                                    ${currencyObj.currencyName} 
                                    (${currencyObj.currencyShortForm})
                                    (${currencyObj.currencySymbol})
                                  `}
                    />);
                }))
            }
        </>
    );
};