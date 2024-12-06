import { unitsDetailsList } from "../constants/units-converter";
import {
    InputGroupType,
    UnitConverterActionType,
    UnitConverterInitialStateType,
} from "../types";
import { v4 as uuidv4 } from 'uuid';

const initialInputGroupId = uuidv4();
const initialToInfoId = uuidv4();

export const initialFromUnitDetails = {
    category: unitsDetailsList[0].category,
    metricSystemName: unitsDetailsList[0].metricSystemList[0].metricSystemName,
    unitName: unitsDetailsList[0].metricSystemList[0].unitsList[0].unitName,
    unitShortForm: unitsDetailsList[0].metricSystemList[0].unitsList[0].shortForm,
}

export const initialToUnitDetails = {
    category: unitsDetailsList[0].category,
    metricSystemName: unitsDetailsList[0].metricSystemList[0].metricSystemName,
    unitName: unitsDetailsList[0].metricSystemList[0].unitsList[1].unitName,
    unitShortForm: unitsDetailsList[0].metricSystemList[0].unitsList[1].shortForm,
}

export const unitConverterInitialState = (): UnitConverterInitialStateType => ({
    currentInputGroupId: initialInputGroupId,
    inputGroupList: [
        {
            id: initialInputGroupId,
            fromValue: null,
            fromUnitsDetails: initialFromUnitDetails,
            currentToInfoId: initialToInfoId,
            toInfoList: [
                {
                    id: initialToInfoId,
                    toValue: null,
                    toUnitsDetails: initialToUnitDetails,
                },
            ]
        },
    ]
})
export const unitConverterReducer = (
    state: UnitConverterInitialStateType,
    action: UnitConverterActionType,
) => {

    switch (action.type) {

        case "SET_CURRENT_INPUT_GROUP": {
            return {
                ...state,
                currentInputGroupId: action.payload.id,
            }
        }

        case "SET_CURRENT_TO_INFO": {
            const newInputGroupList = state.inputGroupList.map((inputGroup) => {
                if (inputGroup.id !== state.currentInputGroupId) return inputGroup;

                return {
                    ...inputGroup,
                    currentToInfoId: action.payload.id
                }

            })

            return {
                ...state,
                inputGroupList: newInputGroupList,
            };
        }

        case "SET_FROM_UNIT_DETAILS": {
            const newInputGroupList = state.inputGroupList.map((inputGroup) => {
                if (inputGroup.id !== state.currentInputGroupId) return inputGroup;

                if (action.payload.buttonType === "unit") {
                    const [unitName, unitShortForm] = action.payload.value.split(":")
                    return {
                        ...inputGroup,
                        fromUnitsDetails: {
                            ...inputGroup.fromUnitsDetails,
                            unitName,
                            unitShortForm
                        }
                    }
                }

                return {
                    ...inputGroup,
                    fromUnitsDetails: {
                        ...inputGroup.fromUnitsDetails,
                        [action.payload.buttonType]: action.payload.value
                    }
                }
            })

            return {
                ...state,
                inputGroupList: newInputGroupList
            };
        }

        case "SET_TO_UNIT_DETAILS": {
            const newInputGroupList = state.inputGroupList.map((inputGroup) => {
                if (inputGroup.id !== state.currentInputGroupId) return inputGroup;

                const newInfoList = inputGroup.toInfoList.map((toInfo) => {
                    if (toInfo.id !== inputGroup.currentToInfoId) return toInfo;

                    if (action.payload.buttonType !== "unit") return {
                        ...toInfo,
                        toUnitsDetails: {
                            ...toInfo.toUnitsDetails,
                            [action.payload.buttonType]: action.payload.value
                        }
                    }

                    const [unitName, unitShortForm] = action.payload.value.split(":")
                    return {
                        ...toInfo,
                        toUnitsDetails: {
                            ...toInfo.toUnitsDetails,
                            unitName,
                            unitShortForm
                        }
                    }
                })

                return {
                    ...inputGroup,
                    toInfoList: newInfoList,
                }
            })

            return {
                ...state,
                inputGroupList: newInputGroupList
            };
        }

        case "ADD_INPUT_GROUP": {
            if (state.inputGroupList.length >= 5) return state;

            const newInputGroupList = state.inputGroupList.flatMap((inputGroup) => {
                if (inputGroup.id !== state.currentInputGroupId) return inputGroup;

                let newInputGroup: InputGroupType = unitConverterInitialState().inputGroupList[0];
                newInputGroup = {
                    ...newInputGroup,
                    id: uuidv4()
                }

                return [inputGroup, newInputGroup]
            })

            return {
                ...state,
                inputGroupList: newInputGroupList,
            };
        }

        case "ADD_TO_INFO": {
            const newInputGroupList = state.inputGroupList.map((inputGroup) => {
                if (inputGroup.id !== state.currentInputGroupId || inputGroup.toInfoList.length >= 5) return inputGroup;

                const newToInfoList = inputGroup.toInfoList.flatMap((toInfo) => {
                    if (toInfo.id !== inputGroup.currentToInfoId) return toInfo;
                    let newToInfo = unitConverterInitialState().inputGroupList[0].toInfoList[0];
                    newToInfo = {
                        ...newToInfo,
                        id: uuidv4(),
                    }

                    return [toInfo, newToInfo]
                })

                return {
                    ...inputGroup,
                    toInfoList: newToInfoList,
                }

            })
            return {
                ...state,
                inputGroupList: newInputGroupList,
            };
        }

    }

}
