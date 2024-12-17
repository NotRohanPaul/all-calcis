import { v4 as uuidv4 } from 'uuid';
import {
    MAX_INPUT_GROUP_LIMIT,
    MAX_TO_GROUP_LIMIT,
    DEFAULT_COLORS,
} from "../constants/units-converter-constants";
import { getRandomizeArray } from "@utils/common-utils";
import { getInputGroupUnitsDetails } from "../utils/converter-utils";
import {
    InputGroupType,
    UnitConverterActionType,
    UnitConverterStateType,
} from "../types";

export const unitConverterInitialState = (): UnitConverterStateType => {
    const initialInputGroupId = uuidv4();
    const initialToInfoId = uuidv4();

    const randomizeInputGroupColorsList = getRandomizeArray(DEFAULT_COLORS.inputGroup);

    const randomizeToGroupColorsList = getRandomizeArray(DEFAULT_COLORS.toGroup);

    return {
        selectedInputGroupId: initialInputGroupId,
        inputGroupColorsList: randomizeInputGroupColorsList.slice(1),
        inputGroupList: [
            {
                inputGroupId: initialInputGroupId,
                inputGroupCategory: null,
                inputGroupColor: randomizeInputGroupColorsList[0],

                fromValue: null,
                fromUnitsDetails: {
                    metricSystemName: null,
                    unitName: null,
                    unitShortForm: null,
                    unitMultiplier: null,
                },

                toGroupColorsList: randomizeToGroupColorsList.slice(1),
                selectedToGroupId: initialToInfoId,
                toGroupList: [
                    {
                        toGroupId: initialToInfoId,
                        toGroupColor: randomizeToGroupColorsList[0],

                        toValue: null,
                        toUnitsDetails: {
                            metricSystemName: null,
                            unitName: null,
                            unitShortForm: null,
                            unitMultiplier: null,
                        },
                    },
                ]
            },
        ]
    }
}

export const unitConverterReducer = (
    state: UnitConverterStateType,
    { type, payload }: UnitConverterActionType,
): UnitConverterStateType => {

    switch (type) {
        case "SET_SELECTED_GROUP_ID":
            return setSelectedGroupId(state, payload);

        case "INSERT_GROUP":
            return insertGroup(state, payload)

        case "SET_GROUP_UNIT_DETAILS":
            return setGroupUnitDetails(state, payload);

        case "SET_GROUP_INPUT_VALUES":
            return setGroupInputValues(state, payload);
    }
}


const setSelectedGroupId = (
    state: UnitConverterStateType,
    payload: Extract<UnitConverterActionType, { type: "SET_SELECTED_GROUP_ID" }>["payload"]
): UnitConverterStateType => {
    if (payload.groupType !== "inputGroup" &&
        payload.groupType !== "toGroup")
        return state;

    if (payload.groupType === "inputGroup") {
        if (state.selectedInputGroupId === payload.groupId) return state;

        return {
            ...state,
            selectedInputGroupId: payload.groupId,
        }
    }
    else {
        const newInputGroupList = state.inputGroupList.map((inputGroup) => {
            if (inputGroup.inputGroupId !== state.selectedInputGroupId) {
                return inputGroup;
            }

            return {
                ...inputGroup,
                selectedToGroupId: payload.groupId
            }
        })

        return {
            ...state,
            inputGroupList: newInputGroupList,
        };
    }
}


const insertGroup = (
    state: UnitConverterStateType,
    payload: Extract<UnitConverterActionType, { type: "INSERT_GROUP" }>["payload"]
): UnitConverterStateType => {
    if (payload.groupType !== "inputGroup" &&
        payload.groupType !== "toGroup")
        return state;


    if (payload.groupType === "inputGroup") {
        if (state.inputGroupList.length >= MAX_INPUT_GROUP_LIMIT) return state;
        if (payload.groupId !== state.selectedInputGroupId) return state;
        const newInputGroupColorList = [...state.inputGroupColorsList];

        const newInputGroupList = state.inputGroupList.flatMap((inputGroup) => {
            if (inputGroup.inputGroupId !== state.selectedInputGroupId) return inputGroup;

            let newInputGroup: InputGroupType = unitConverterInitialState().inputGroupList[0];
            newInputGroup = {
                ...newInputGroup,
                inputGroupColor: newInputGroupColorList.shift() ?? "teal",
            }

            return [inputGroup, newInputGroup]
        })

        return {
            ...state,
            inputGroupColorsList: newInputGroupColorList,
            inputGroupList: newInputGroupList,
        };

    }
    else {
        const newInputGroupList = state.inputGroupList.map((inputGroup) => {
            if (inputGroup.inputGroupId !== state.selectedInputGroupId ||
                inputGroup.toGroupList.length >= MAX_TO_GROUP_LIMIT) return inputGroup;
            if (payload.groupId !== inputGroup.selectedToGroupId) return inputGroup;

            const newToGroupColorsList = [...inputGroup.toGroupColorsList];
            const newToGroupList = inputGroup.toGroupList.flatMap((toGroup) => {
                if (toGroup.toGroupId !== inputGroup.selectedToGroupId) return toGroup;

                let newToGroup = unitConverterInitialState().inputGroupList[0].toGroupList[0];
                newToGroup = {
                    ...newToGroup,
                    toGroupColor: newToGroupColorsList.shift() ?? "lime",
                }

                return [toGroup, newToGroup]
            })

            return {
                ...inputGroup,
                toGroupColorsList: newToGroupColorsList,
                toGroupList: newToGroupList,
            }
        })

        return {
            ...state,
            inputGroupList: newInputGroupList,
        };
    }
}


const setGroupUnitDetails = (
    state: UnitConverterStateType,
    payload: Extract<UnitConverterActionType, { type: "SET_GROUP_UNIT_DETAILS" }>["payload"]
): UnitConverterStateType => {
    if (payload.groupType !== "inputGroup" &&
        payload.groupType !== "toGroup")
        return state;

    if (getInputGroupUnitsDetails(state, "unitShortForm").includes(payload.unitShortForm)) {
        return state;
    }

    if (payload.groupType === "inputGroup") {
        const newInputGroupList = state.inputGroupList.map((inputGroup) => {
            if (inputGroup.inputGroupId !== state.selectedInputGroupId) return inputGroup;
            if (inputGroup.inputGroupCategory === null || inputGroup.inputGroupCategory === payload.inputGroupCategory) {
                return {
                    ...inputGroup,
                    inputGroupCategory: payload.inputGroupCategory,
                    fromValue: null,
                    fromUnitsDetails: {
                        metricSystemName: payload.metricSystemName,
                        unitName: payload.unitName,
                        unitShortForm: payload.unitShortForm,
                        unitMultiplier: payload.unitMultiplier
                    }
                }
            }
            else {
                const newToGroupList = inputGroup.toGroupList.map((toGroup) => {
                    return {
                        ...toGroup,
                        toValue: null,
                        toUnitsDetails: {
                            metricSystemName: null,
                            unitName: null,
                            unitShortForm: null,
                            unitMultiplier: null
                        }
                    }
                })

                return {
                    ...inputGroup,
                    inputGroupCategory: payload.inputGroupCategory,
                    fromValue: null,
                    fromUnitsDetails: {
                        metricSystemName: payload.metricSystemName,
                        unitName: payload.unitName,
                        unitShortForm: payload.unitShortForm,
                        unitMultiplier: payload.unitMultiplier
                    },
                    toGroupList: newToGroupList,
                }
            }
        })

        return {
            ...state,
            inputGroupList: newInputGroupList
        };
    }
    else {
        const newInputGroupList = state.inputGroupList.map((inputGroup) => {
            if (inputGroup.inputGroupId !== state.selectedInputGroupId) return inputGroup;

            if (inputGroup.inputGroupCategory === null || inputGroup.inputGroupCategory === payload.inputGroupCategory) {
                const newToGroupList = inputGroup.toGroupList.map((toGroup) => {
                    if (toGroup.toGroupId !== inputGroup.selectedToGroupId) return toGroup;

                    return {
                        ...toGroup,
                        toValue: null,
                        toUnitsDetails: {
                            metricSystemName: payload.metricSystemName,
                            unitName: payload.unitName,
                            unitShortForm: payload.unitShortForm,
                            unitMultiplier: payload.unitMultiplier
                        }
                    }
                })

                return {
                    ...inputGroup,
                    inputGroupCategory: payload.inputGroupCategory,
                    fromValue: null,
                    toGroupList: newToGroupList
                };
            }
            else {
                const newToGroupList = inputGroup.toGroupList.map((toGroup) => {
                    if (toGroup.toGroupId !== inputGroup.selectedToGroupId) {
                        return {
                            ...toGroup,
                            toValue: null,

                            toUnitsDetails: {
                                metricSystemName: null,
                                unitName: null,
                                unitShortForm: null,
                                unitMultiplier: null
                            }
                        }
                    }
                    else {
                        return {
                            ...toGroup,
                            toValue: null,

                            toUnitsDetails: {
                                metricSystemName: payload.metricSystemName,
                                unitName: payload.unitName,
                                unitShortForm: payload.unitShortForm,
                                unitMultiplier: payload.unitMultiplier
                            }
                        }
                    }
                })

                return {
                    ...inputGroup,
                    toValue: null,

                    fromUnitsDetails: {
                        metricSystemName: null,
                        unitName: null,
                        unitShortForm: null,
                        unitMultiplier: null
                    },
                    inputGroupCategory: payload.inputGroupCategory,
                    toGroupList: newToGroupList,
                }
            }
        })

        return {
            ...state,
            inputGroupList: newInputGroupList
        };
    }

}

const setGroupInputValues = (
    state: UnitConverterStateType,
    payload: Extract<UnitConverterActionType, { type: "SET_GROUP_INPUT_VALUES" }>["payload"]
): UnitConverterStateType => {
    if (payload.groupType !== "inputGroup" &&
        payload.groupType !== "toGroup")
        return state;


    if (payload.groupType === "inputGroup") {
        const newInputGroupList = state.inputGroupList.map((inputGroup) => {
            if (inputGroup.inputGroupId !== state.selectedInputGroupId) return inputGroup;
            if (payload.inputValue.length === 1 && payload.inputValue[0] === ".") {
                return {
                    ...inputGroup,
                    fromValue: payload.inputValue,
                }
            }
            const newInputGroupList = inputGroup.toGroupList.map((toGroup) => {
                if (inputGroup.fromUnitsDetails.unitMultiplier === null || toGroup.toUnitsDetails.unitMultiplier === null) return toGroup;

                const newToGroupValue = "" + (+payload.inputValue * (+inputGroup.fromUnitsDetails.unitMultiplier) / (+toGroup.toUnitsDetails.unitMultiplier))
                return {
                    ...toGroup,
                    toValue: newToGroupValue,
                }
            })
            return {
                ...inputGroup,
                fromValue: payload.inputValue,
                toGroupList: newInputGroupList
            }
        });

        return {
            ...state,
            inputGroupList: newInputGroupList
        }
    }
    // else {

    // }

    return state;
}