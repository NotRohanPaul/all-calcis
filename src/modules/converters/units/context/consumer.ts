import { createContext, useContext, Dispatch } from "react";
import { unitConverterActionType, unitConverterInitialStateType } from "../types";

export const UnitConverterStateContext = createContext<unitConverterInitialStateType | undefined>(undefined)
export const UnitConverterDispatchContext = createContext<Dispatch<unitConverterActionType> | undefined>(undefined)

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