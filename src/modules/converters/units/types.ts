
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
export type unitConverterInitialStateType = {
    inputGroupList: InputGroupType[]
}

export type InputGroupType = {
    id: string;
    fromInfo: {
        fromValue: null;
        fromUnitsDetails: {
            category: null;
            metricSystemName: null;
            unitName: null;
            unitShortForm: null;
        };
    };
    toInfoList: ToInfoList[];
};

export type ToInfoList = {
    id: string;
    toValue: null;
    toUnitsDetails: {
        category: null;
        metricSystemName: null;
        unitName: null;
        unitShortForm: null;
    };
}


export type unitConverterActionType =
    | {
        type: "SET_CATEGORY",
        payload: {
            inputType: "From" | "To",
            id: string,
        }
    }
    | {
        type: "SET_METRIC_SYSTEM",
        payload: {
            inputType: "From" | "To",
            id: string,
        }
    }
    | {
        type: "SET_UNIT",
        payload: {
            inputType: "From" | "To",
            id: string,
        }
    }
    | {
        type: "ADD_TO_INPUT_GROUP",
        payload: {
            callerId: string,
        }
    }