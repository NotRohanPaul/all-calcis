import { currentGroupColorDetailsType, GroupType, InputUnitDetailsType, UnitConverterStateType } from "../types"

export const getInputGroupUnitsDetails = (state: UnitConverterStateType, unitDetailName: keyof InputUnitDetailsType) => {
    if (!(["metricSystemName", "unitName", "unitShortForm"]
        .some((name) => name === unitDetailName)))
        throw new Error("Wrong input type");

    const unitDetailNameList: (string | null)[] = [];

    const currentInputGroup = state.inputGroupList.find((inputGroup) => inputGroup.inputGroupId === state.selectedInputGroupId);

    if (!currentInputGroup)
        return unitDetailNameList;

    unitDetailNameList.push(currentInputGroup.fromUnitsDetails[unitDetailName]);
    currentInputGroup.toGroupList.forEach((toGroup) => {
        unitDetailNameList.push(toGroup.toUnitsDetails[unitDetailName])
    })
    return unitDetailNameList
}

export const getCurrentGroupColorDetails = (state: UnitConverterStateType, inputType: GroupType): currentGroupColorDetailsType[] => {
    if (inputType !== "inputGroup" &&
        inputType !== "toGroup")
        throw new Error("Wrong input type");

    const result: { groupId: string, groupColor: string, selectedGroupId: string, }[] = []

    if (inputType === "inputGroup") {
        state.inputGroupList.map(inputGroup => {
            result.push({
                groupId: inputGroup.inputGroupId,
                groupColor: inputGroup.inputGroupColor,
                selectedGroupId: state.selectedInputGroupId,
            })
        })

    }
    else {
        const currentGroup = state.inputGroupList.find(
            (inputGroup) => inputGroup.inputGroupId === state.selectedInputGroupId)
        if (currentGroup)
            currentGroup.toGroupList.map(toGroup => {
                result.push({
                    groupId: toGroup.toGroupId,
                    groupColor: toGroup.toGroupColor,
                    selectedGroupId: currentGroup.selectedToGroupId,
                })
            })
    }
    return result;
}


export const getCurrentCategory = (state: UnitConverterStateType) => {
    const currentInputGroup = state.inputGroupList.find((inputGroup) => inputGroup.inputGroupId === state.selectedInputGroupId);

    if (!currentInputGroup || !currentInputGroup.inputGroupCategory)
        return null;

    return currentInputGroup?.inputGroupCategory;
}