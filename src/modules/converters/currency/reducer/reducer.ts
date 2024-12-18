import { getRandomizeArray } from "@utils/common-utils";
import { DEFAULT_COLORS } from "../constants/converter-constatnts";
import { CurrencyConverterActionType, CurrencyConverterStateType } from "../types";

export const currencyConveterInitialState = (): CurrencyConverterStateType => {
    const initialInputGroupId = crypto.randomUUID();
    const initialInputFieldId = crypto.randomUUID();

    const randomizeInputGroupColorsList = getRandomizeArray(DEFAULT_COLORS.inputGroup);

    const randomizeInputFieldColorsList = getRandomizeArray(DEFAULT_COLORS.inputField);

    return {
        selectedInputGroupId: initialInputGroupId,
        inputGroupColorsList: randomizeInputGroupColorsList.slice(1),
        inputGroupList: [
            {
                inputGroupId: initialInputGroupId,
                inputGroupColor: randomizeInputGroupColorsList[0],

                inputFieldColorsList: randomizeInputFieldColorsList.slice(1),
                selectedInputFieldId: initialInputFieldId,
                inputFieldList: [
                    {
                        inputFieldId: initialInputFieldId,
                        inputFieldColor: randomizeInputFieldColorsList[0],

                        inputFieldValue: null,
                        inputFieldCurrencyDetails: {
                            category: null,
                            subCategory: null,
                            currencyName: null,
                            currencyShortForm: null,
                            relativeValueToUSD: null,
                        }
                    }
                ]
            },
        ]
    };
};


export const currencyConverterReducer = (
    state: CurrencyConverterStateType,
    { type, payload }: CurrencyConverterActionType
) => {

    switch (type) {
        case "SET_SELECTED_INPUT_GROUP_OR_FIELD_ID": {
            return state;
        }
        case "INSERT_INPUT_GROUP_OR_FIELD": {
            return state;
        }
        case "SET_INPUT_GROUP_OR_FIELD_CURRENCY_DETAILS": {
            return state;
        }
        case "SET_INPUT_GROUP_OR_FIELD_INPUT_VALUES": {
            return state;
        }
    }

};
