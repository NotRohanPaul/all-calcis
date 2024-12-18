import { createContext, Dispatch, useContext } from "react";
import { CurrencyConverterActionType, CurrencyConverterStateType } from "../types";



export const CurrencyConverterStateContext = createContext<CurrencyConverterStateType | undefined>(undefined);
export const CurrencyConverterDispatchContext = createContext<Dispatch<CurrencyConverterActionType> | undefined>(undefined);

export const useCurrencyConverterStateContext = () => {
    const context = useContext(CurrencyConverterStateContext);
    if (!context)
        throw new Error("CurrencyConverterStateContext must be used in CurrencyConverterStateContext.Provider");
    return context;
};

export const useCurrencyConverterDispatchContext = () => {
    const context = useContext(CurrencyConverterDispatchContext);
    if (!context)
        throw new Error("CurrencyConverterDispatchContext must be used in CurrencyConverterDispatchContext.Provider");
    return context;
};