import { DEFAULT_COLORS } from "./constants/converter-constatnts";

export type CurrencyDetailsType = {
    category: string,
    subCategoryList: {
        subCategoryName: string,
        currencyList: {
            currencyName: string,
            currencyShortForm: string,
            relativeValueToUSD: number,
        }[];
    }[];
}[]

export type CurrentGroupColorDetailsType = {
    groupId: string,
    groupColor: string,
    selectedGroupId: string,
}

export type InputType = "inputGroup" | "inputField";

// Reducer Types
export type CurrencyConverterStateType = {
    selectedInputGroupId: string,
    inputGroupColorsList: InputGroupColorsType[],
    inputGroupList: InputGroupType[]
}

export type InputGroupType = {
    inputGroupId: string,
    inputGroupColor: InputGroupColorsType,

    inputFieldColorsList: inputFieldColorsType[],
    selectedInputFieldId: string,
    inputFieldList: inputFieldType[],
};

export type inputFieldType = {
    inputFieldId: string,
    inputFieldColor: inputFieldColorsType,

    inputFieldValue: null | string,
    inputFieldCurrencyDetails: InputFieldDetailsType,
}

export type InputGroupColorsType = (typeof DEFAULT_COLORS.inputGroup)[number];
export type inputFieldColorsType = (typeof DEFAULT_COLORS.inputField)[number];


export type InputFieldDetailsType = {
    category: string | null,
    subCategory: string | null,
    currencyName: string | null,
    currencyShortForm: string | null,
    relativeValueToUSD: number | null,
};

export type CurrencyConverterActionType =
    | {
        type: "SET_SELECTED_INPUT_GROUP_OR_FIELD_ID",
        payload: {
            inputType: InputType,
            groupId: string,
        }
    }
    | {
        type: "INSERT_INPUT_GROUP_OR_FIELD",
        payload: {
            inputType: InputType,
            groupId: string,
        }
    }
    | {
        type: "SET_INPUT_GROUP_OR_FIELD_CURRENCY_DETAILS",
        payload: InputFieldDetailsType & {
            inputGroupCategory: string,
            inputType: InputType
        }
    }
    | {
        type: "SET_INPUT_GROUP_OR_FIELD_INPUT_VALUES",
        payload: {
            inputValue: string,
            inputType: InputType
        }
    }

