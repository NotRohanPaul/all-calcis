
// Constants Types
export type UnitsDetailsType = {
    category: string;
    metricSystemList: {
        metricSystemName: string;
        unitsList: {
            unitName: string;
            shortForm: string;
        }[];
    }[];
}[];


// Reducer Types
export type UnitConverterInitialStateType = {
    currentInputGroupId: string,
    inputGroupList: InputGroupType[]
}

export type UnitDetails = {
    category: string;
    metricSystemName: string;
    unitName: string;
    unitShortForm: string;
};

export type InputGroupType = {
    id: string;
    fromValue: null;
    fromUnitsDetails: UnitDetails
    currentToInfoId: string,
    toInfoList: ToInfoList[];
};

export type ToInfoList = {
    id: string;
    toValue: null;
    toUnitsDetails: UnitDetails;
}


export type UnitConverterActionType =
    | {
        type: "SET_CURRENT_INPUT_GROUP",
        payload: {
            id: string,
        }
    }
    | {
        type: "SET_CURRENT_TO_INFO",
        payload: {
            id: string,
        }
    }
    | {
        type: "SET_FROM_UNIT_DETAILS",
        payload: {
            buttonType: "category" | "metricSystemName" | "unit",
            value: string,
        }
    }
    | {
        type: "SET_TO_UNIT_DETAILS",
        payload: {
            buttonType: "category" | "metricSystemName" | "unit",
            value: string,
        }
    }
    | {
        type: "ADD_INPUT_GROUP",
    }
    | {
        type: "ADD_TO_INFO",
    }