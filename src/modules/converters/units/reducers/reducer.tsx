import {
    InputGroupType,
    UnitConverterActionType,
    UnitConverterInitialStateType,
} from "../types";
import { v4 as uuidv4 } from 'uuid';
import { getInputGroupUnitsDetails } from "../utils/converter-utils";
import { ScatterChartIcon } from "lucide-react";
import { DEFAULT_COLORS, MAX_INPUT_GROUP_LIMIT, MAX_TO_GROUP_LIMIT } from "../constants/units-converter-constants";

export const unitConverterInitialState = (): UnitConverterInitialStateType => {
    const initialInputGroupId = uuidv4();
    const initialToInfoId = uuidv4();

    const randomizeToColorsList = [...DEFAULT_COLORS.toGroup];
    randomizeToColorsList.forEach((_, i, arr) => {
        const randomIndex = Math.floor(Math.random() * arr.length);
        [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]]
    })
    { console.log(randomizeToColorsList) }

    return {
        selectedInputGroupId: initialInputGroupId,
        inputGroupColorsList: ["tomato", "royalblue", "gold", "deeppink"],
        inputGroupList: [
            {
                inputGroupId: initialInputGroupId,
                inputGroupCategory: null,
                inputGroupColor: "teal",

                fromValue: null,
                fromUnitsDetails: {
                    metricSystemName: null,
                    unitName: null,
                    unitShortForm: null,
                },

                toGroupColorsList: randomizeToColorsList.slice(1),
                selectedToGroupId: initialToInfoId,
                toGroupList: [
                    {
                        toGroupId: initialToInfoId,
                        toGroupColor: randomizeToColorsList[0],

                        toValue: null,
                        toUnitsDetails: {
                            metricSystemName: null,
                            unitName: null,
                            unitShortForm: null,
                        },
                    },
                ]
            },
        ]
    }
}


export const unitConverterReducer = (
    state: UnitConverterInitialStateType,
    { type, payload }: UnitConverterActionType,
) => {

    switch (type) {
        case "SET_SELECTED_GROUP_ID": {
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

        case "INSERT_GROUP": {

            if (payload.groupType !== "inputGroup" &&
                payload.groupType !== "toGroup")
                return state;


            if (payload.groupType === "inputGroup") {
                if (state.inputGroupList.length >= MAX_INPUT_GROUP_LIMIT) return state;
                if (payload.groupId !== state.selectedInputGroupId) return state;
                { console.log("hello") }
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

        case "SET_INPUT_UNIT_DETAILS": {
            if (payload.groupType !== "inputGroup" &&
                payload.groupType !== "toGroup")
                return state;

            if (getInputGroupUnitsDetails(state, "unitShortForm").includes(payload.unitShortForm)) {
                return ScatterChartIcon;
            }

            if (payload.groupType === "inputGroup") {
                const newInputGroupList = state.inputGroupList.map((inputGroup) => {
                    if (inputGroup.inputGroupId !== state.selectedInputGroupId) return inputGroup;
                    if (inputGroup.inputGroupCategory === null || inputGroup.inputGroupCategory === payload.inputGroupCategory) {
                        return {
                            ...inputGroup,
                            inputGroupCategory: payload.inputGroupCategory,
                            fromUnitsDetails: {
                                metricSystemName: payload.metricSystemName,
                                unitName: payload.unitName,
                                unitShortForm: payload.unitShortForm
                            }
                        }
                    }
                    else {
                        const newToGroupList = inputGroup.toGroupList.map((toGroup) => {
                            return {
                                ...toGroup,
                                toUnitsDetails: {
                                    metricSystemName: null,
                                    unitName: null,
                                    unitShortForm: null,
                                }
                            }
                        })

                        return {
                            ...inputGroup,
                            inputGroupCategory: payload.inputGroupCategory,
                            fromUnitsDetails: {
                                metricSystemName: payload.metricSystemName,
                                unitName: payload.unitName,
                                unitShortForm: payload.unitShortForm
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
                                toUnitsDetails: {
                                    metricSystemName: payload.metricSystemName,
                                    unitName: payload.unitName,
                                    unitShortForm: payload.unitShortForm
                                }
                            }
                        })

                        return {
                            ...inputGroup,
                            inputGroupCategory: payload.inputGroupCategory,
                            toGroupList: newToGroupList
                        };
                    }
                    else {
                        const newToGroupList = inputGroup.toGroupList.map((toGroup) => {
                            if (toGroup.toGroupId !== inputGroup.selectedToGroupId) {
                                return {
                                    ...toGroup,
                                    toUnitsDetails: {
                                        metricSystemName: null,
                                        unitName: null,
                                        unitShortForm: null,
                                    }
                                }
                            }
                            else {
                                return {
                                    ...toGroup,
                                    toUnitsDetails: {
                                        metricSystemName: payload.metricSystemName,
                                        unitName: payload.unitName,
                                        unitShortForm: payload.unitShortForm
                                    }
                                }
                            }
                        })

                        return {
                            ...inputGroup,
                            fromUnitsDetails: {
                                metricSystemName: null,
                                unitName: null,
                                unitShortForm: null,
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
    }
}
