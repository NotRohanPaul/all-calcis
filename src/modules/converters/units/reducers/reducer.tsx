import { InputGroupType, unitConverterActionType, unitConverterInitialStateType } from "../types";
import { v4 as uuidv4 } from 'uuid';


export const unitConverterInitialState = (): unitConverterInitialStateType => ({
    inputGroupList: [
        {
            id: uuidv4(),
            fromInfo: {
                fromValue: null,
                fromUnitsDetails: {
                    category: null,
                    metricSystemName: null,
                    unitName: null,
                    unitShortForm: null,
                },
            },
            toInfoList: [
                {
                    id: uuidv4(),
                    toValue: null,
                    toUnitsDetails: {
                        category: null,
                        metricSystemName: null,
                        unitName: null,
                        unitShortForm: null,
                    },
                },
            ]
        },
    ]
})


export const unitConverterReducer = (
    state: unitConverterInitialStateType,
    action: unitConverterActionType,
) => {

    switch (action.type) {

        case "SET_CATEGORY": {
            return state;
        }

        case "SET_METRIC_SYSTEM": {
            return state;
        }

        case "SET_UNIT": {
            return state;
        }

        case "ADD_TO_INPUT_GROUP": {
            if (state.inputGroupList.length >= 5) return state;

            const newInputGroupList = state.inputGroupList.flatMap((inputGroup) => {
                if (inputGroup.id === action.payload.callerId) {
                    const newInputGroup: InputGroupType = unitConverterInitialState().inputGroupList[0];

                    return [inputGroup, newInputGroup]
                }
                return inputGroup;
            })

            return {
                ...state,
                inputGroupList: newInputGroupList,
            };
        }

    }

}
