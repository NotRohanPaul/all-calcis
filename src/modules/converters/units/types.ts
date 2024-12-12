import { DEFAULT_COLORS } from "./constants/units-converter-constants";

// Constants Types
export type UnitsDetailsType = {
    category: string,
    multiplierBaseUnit: string,
    metricSystemList: {
        metricSystemName: string,
        unitsList: {
            unitName: string,
            shortForm: string,
            multiplier: number,
        }[],
    }[],
}[];

export type currentGroupColorDetailsType = {
    groupId: string;
    groupColor: string;
    selectedGroupId: string;
}

export type GroupType = "inputGroup" | "toGroup";


// Reducer Types
export type UnitConverterStateType = {
    selectedInputGroupId: string,
    inputGroupColorsList: InputGroupColorsType[],
    inputGroupList: InputGroupType[]
}

export type InputGroupType = {
    inputGroupId: string,
    inputGroupCategory: null | string,
    inputGroupColor: InputGroupColorsType,

    fromValue: null | string,
    fromUnitsDetails: InputUnitDetailsType,

    toGroupColorsList: ToGroupColorsType[],
    selectedToGroupId: string,
    toGroupList: ToGroupType[],
};

export type ToGroupType = {
    toGroupId: string,
    toGroupColor: ToGroupColorsType,

    toValue: null | string,
    toUnitsDetails: InputUnitDetailsType,
}

export type InputGroupColorsType = (typeof DEFAULT_COLORS.inputGroup)[number];
export type ToGroupColorsType = (typeof DEFAULT_COLORS.toGroup)[number];


export type InputUnitDetailsType = {
    metricSystemName: null | string,
    unitName: null | string,
    unitShortForm: null | string,
    unitMultiplier: null | number,
};

export type UnitConverterActionType =
    | {
        type: "SET_SELECTED_GROUP_ID",
        payload: {
            groupType: GroupType,
            groupId: string,
        }
    }
    | {
        type: "INSERT_GROUP",
        payload: {
            groupType: GroupType,
            groupId: string,
        }
    }
    | {
        type: "SET_GROUP_UNIT_DETAILS",
        payload: InputUnitDetailsType & {
            inputGroupCategory: string,
            groupType: GroupType
        }
    }
    | {
        type: "SET_GROUP_INPUT_VALUES",
        payload: {
            inputValue: string,
            groupType: GroupType
        }
    }
