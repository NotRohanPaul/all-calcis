import { createContext, useContext, Dispatch } from "react";
import { UnitConverterActionType, UnitConverterInitialStateType } from "../types";

export const UnitConverterStateContext = createContext<UnitConverterInitialStateType | undefined>(undefined)
export const UnitConverterDispatchContext = createContext<Dispatch<UnitConverterActionType> | undefined>(undefined)

export const useUnitConverterStateContext = () => {
    const context = useContext(UnitConverterStateContext);
    if (!context) {
        throw new Error("unitConverterStateContext must be used in unitConverterStateDispatchProvider")
    }
    return context;
}

export const useUnitConverterDispatchContext = () => {
    const context = useContext(UnitConverterDispatchContext);
    if (!context) {
        throw new Error("unitConverterDispatchContext must be used in unitConverterStateDispatchProvider")
    }
    return context;

}