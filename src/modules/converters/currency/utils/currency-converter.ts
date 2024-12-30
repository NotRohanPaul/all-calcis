import { CurrencyConverterStateType, } from "../types";

export const getInputFieldsCurrencyShortFormList = (state: CurrencyConverterStateType): string[] => {
    const results: string[] = [];

    const currentInputGroup = state.inputGroupList.find((inputGroupObj) => inputGroupObj.inputGroupId === state.selectedInputGroupId);

    currentInputGroup?.inputFieldList.forEach((inputFieldGroup) => {
        if (!inputFieldGroup.inputFieldCurrencyDetails.currencyShortForm) return;
        results.push(inputFieldGroup.inputFieldCurrencyDetails.currencyShortForm);
    });

    return results;

};