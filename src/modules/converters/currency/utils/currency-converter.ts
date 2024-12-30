import { CurrencyConverterStateType } from "../types";

export const getInputFieldsCurrencyNameList = (state: CurrencyConverterStateType): string[] => {
    const results: string[] = [];

    const currentInputGroup = state.inputGroupList.find((inputGroupObj) => inputGroupObj.inputGroupId === state.selectedInputGroupId);

    currentInputGroup?.inputFieldList.forEach((inputFieldGroup) => {
        if (!inputFieldGroup.inputFieldCurrencyDetails.currencyName) return;
        results.push(inputFieldGroup.inputFieldCurrencyDetails.currencyName);
    });

    return results;

};