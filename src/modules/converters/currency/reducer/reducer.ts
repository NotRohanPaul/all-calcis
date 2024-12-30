import { getRandomizeArray } from "@utils/common-utils";
import {
    DEFAULT_COLORS,
    MAX_INPUT_FIELD_LIMIT,
    MAX_INPUT_GROUP_LIMIT
} from "../constants/converter-constatnts";
import {
    CurrencyConverterActionType,
    CurrencyConverterStateType,
    InputFieldType,
    InputGroupType
} from "../types";

export const currencyConveterInitialState = (): CurrencyConverterStateType => {
    const initialInputGroupId = crypto.randomUUID();
    const initialInputFieldIds = [crypto.randomUUID(), crypto.randomUUID()];

    const randomizeInputGroupColorsList = getRandomizeArray(DEFAULT_COLORS.inputGroup);

    const randomizeInputFieldColorsList = getRandomizeArray(DEFAULT_COLORS.inputField);

    return {
        selectedInputGroupId: initialInputGroupId,
        inputGroupColorsList: randomizeInputGroupColorsList.slice(1),
        inputGroupList: [
            {
                inputGroupId: initialInputGroupId,
                inputGroupColor: randomizeInputGroupColorsList[0],

                inputFieldColorsList: randomizeInputFieldColorsList.slice(2),
                selectedInputFieldId: initialInputFieldIds[0],
                inputFieldList: [
                    {
                        inputFieldId: initialInputFieldIds[0],
                        inputFieldColor: randomizeInputFieldColorsList[0],

                        inputFieldValue: null,
                        inputFieldCurrencyDetails: {
                            category: null,
                            subCategory: null,
                            currencyName: null,
                            currencyShortForm: null,
                            currencySymbol: null,
                            relativeValueToUSD: null,
                        }
                    },
                    {
                        inputFieldId: initialInputFieldIds[1],
                        inputFieldColor: randomizeInputFieldColorsList[1],

                        inputFieldValue: null,
                        inputFieldCurrencyDetails: {
                            category: null,
                            subCategory: null,
                            currencyName: null,
                            currencyShortForm: null,
                            currencySymbol: null,
                            relativeValueToUSD: null,
                        }
                    },
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
            return selectInput(state, payload);
        }
        case "INSERT_INPUT_GROUP_OR_FIELD": {
            return insertInput(state, payload);
        }
        case "SET_INPUT_GROUP_OR_FIELD_CURRENCY_DETAILS": {
            return currencyDetails(state, payload);
        }
        case "SET_INPUT_GROUP_OR_FIELD_INPUT_VALUES": {
            return setValues(state, payload);
        }
    }

};

const selectInput = (
    state: CurrencyConverterStateType,
    payload: Extract<CurrencyConverterActionType,
        { type: "INSERT_INPUT_GROUP_OR_FIELD"; }>["payload"]
): CurrencyConverterStateType => {
    if (payload.inputType !== "inputGroup" && payload.inputType !== "inputField") return state;

    if (payload.inputType === "inputGroup") {
        if (state.selectedInputGroupId === payload.groupId) return state;

        return {
            ...state,
            selectedInputGroupId: payload.groupId
        };
    }
    else {
        const newInputGroupList = state.inputGroupList.map((inputGroupObj) => {
            if (state.selectedInputGroupId !== inputGroupObj.inputGroupId) return inputGroupObj;

            const isInputFiledPresent = inputGroupObj.inputFieldList.some((inputFieldObj) => inputFieldObj.inputFieldId === payload.groupId);
            if (!isInputFiledPresent)
                return inputGroupObj;

            return {
                ...inputGroupObj,
                selectedInputFieldId: payload.groupId,
            };
        });

        return {
            ...state,
            inputGroupList: newInputGroupList,
        };
    }
};

const insertInput = (
    state: CurrencyConverterStateType,
    payload: Extract<CurrencyConverterActionType,
        { type: "INSERT_INPUT_GROUP_OR_FIELD"; }>["payload"]
): CurrencyConverterStateType => {
    if (payload.inputType !== "inputGroup" && payload.inputType !== "inputField") return state;

    if (payload.inputType === "inputGroup") {
        if (state.inputGroupList.length >= MAX_INPUT_GROUP_LIMIT) return state;

        const newInputGroupColorsList = [...state.inputGroupColorsList];
        const newInputGroupList = state.inputGroupList.flatMap((inputGroupObj) => {
            if (inputGroupObj.inputGroupId !== payload.groupId) return inputGroupObj;

            let newInputGroupObj: InputGroupType = currencyConveterInitialState().inputGroupList[0];

            newInputGroupObj = {
                ...newInputGroupObj,
                inputGroupColor: newInputGroupColorsList.pop() ?? "teal"
            };

            return [inputGroupObj, newInputGroupObj];
        });

        return {
            ...state,
            inputGroupColorsList: newInputGroupColorsList,
            inputGroupList: newInputGroupList,
        };
    }
    else {
        const newInputGroupList = state.inputGroupList.map((inputGroupObj) => {
            if (state.selectedInputGroupId !== inputGroupObj.inputGroupId) return inputGroupObj;
            if (inputGroupObj.selectedInputFieldId !== payload.groupId) return inputGroupObj;
            if (inputGroupObj.inputFieldList.length >= MAX_INPUT_FIELD_LIMIT) return inputGroupObj;

            const newInputFieldColorsList = [...inputGroupObj.inputFieldColorsList];
            const newInputFieldList = inputGroupObj.inputFieldList.flatMap((inputFieldObj) => {
                if (inputFieldObj.inputFieldId !== inputGroupObj.selectedInputFieldId) return inputFieldObj;

                let newInputFieldObject: InputFieldType = currencyConveterInitialState().inputGroupList[0].inputFieldList[0];

                newInputFieldObject = {
                    ...newInputFieldObject,
                    inputFieldColor: newInputFieldColorsList.pop() ?? "aqua"
                };

                return [inputFieldObj, newInputFieldObject];

            });

            return {
                ...inputGroupObj,
                inputFieldColorsList: newInputFieldColorsList,
                inputFieldList: newInputFieldList,
            };
        });

        return {
            ...state,
            inputGroupList: newInputGroupList,
        };
    }
};

const currencyDetails = (
    state: CurrencyConverterStateType,
    payload: Extract<CurrencyConverterActionType, { type: "SET_INPUT_GROUP_OR_FIELD_CURRENCY_DETAILS"; }>["payload"]
): CurrencyConverterStateType => {
    const newInputGroupList = state.inputGroupList.map((inputGroupObj) => {
        if (state.selectedInputGroupId !== inputGroupObj.inputGroupId)
            return inputGroupObj;

        const isCurrencySelectedBefore = !!inputGroupObj.inputFieldList.find((inputFieldObj) => inputFieldObj.inputFieldCurrencyDetails.currencyName === payload.currencyName);
        if (isCurrencySelectedBefore) return inputGroupObj;

        const newInputFieldList = inputGroupObj.inputFieldList.map((inputFieldObj) => {
            if (inputFieldObj.inputFieldId !== inputGroupObj.selectedInputFieldId)
                return {
                    ...inputFieldObj,
                    inputFieldValue: null,
                };

            return {
                ...inputFieldObj,
                inputFieldValue: null,
                inputFieldCurrencyDetails: {
                    category: payload.category,
                    subCategory: payload.subCategory,
                    currencyName: payload.currencyName,
                    currencyShortForm: payload.currencyShortForm,
                    currencySymbol: payload.currencySymbol,
                    relativeValueToUSD: payload.relativeValueToUSD,
                }
            };

        });

        return {
            ...inputGroupObj,
            inputFieldList: newInputFieldList,
        };
    });


    return {
        ...state,
        inputGroupList: newInputGroupList,
    };
};

const setValues = (
    state: CurrencyConverterStateType,
    payload: Extract<CurrencyConverterActionType, { type: "SET_INPUT_GROUP_OR_FIELD_INPUT_VALUES"; }>["payload"]
): CurrencyConverterStateType => {
    const newInputGroupList = state.inputGroupList.map((inputGroupObj) => {
        if (state.selectedInputGroupId !== inputGroupObj.inputGroupId)
            return inputGroupObj;

        const relativeValueToUSD = inputGroupObj.inputFieldList.find((inputFieldObj) => inputFieldObj.inputFieldId === inputGroupObj.selectedInputFieldId)?.inputFieldCurrencyDetails.relativeValueToUSD;

        if (!relativeValueToUSD) return inputGroupObj;

        const currentValueInUSD = +payload.inputValue * relativeValueToUSD;
        const newInputFieldList = inputGroupObj.inputFieldList.map((inputFieldObj) => {
            if (inputFieldObj.inputFieldId !== inputGroupObj.selectedInputFieldId)
                return {
                    ...inputFieldObj,
                    inputFieldValue: inputFieldObj.inputFieldCurrencyDetails.relativeValueToUSD ? (currentValueInUSD / inputFieldObj.inputFieldCurrencyDetails.relativeValueToUSD).toString(10) : null,
                };

            return {
                ...inputFieldObj,
                inputFieldValue: payload.inputValue,
            };

        });

        return {
            ...inputGroupObj,
            inputFieldList: newInputFieldList,
        };
    });


    return {
        ...state,
        inputGroupList: newInputGroupList,
    };
};