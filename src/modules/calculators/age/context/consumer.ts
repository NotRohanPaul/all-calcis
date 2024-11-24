import { createContext, useContext } from "react";
import { AgeCalculatorAction, AgeCalculatorState } from "../types";

export const CalculatorStateContext = createContext<AgeCalculatorState | undefined>(undefined);
export const CalculatorDispatchContext = createContext<React.Dispatch<AgeCalculatorAction> | undefined>(undefined);

export const useCalculatorState = () => {
    const context = useContext(CalculatorStateContext);
    if (!context) throw new Error("useCalculatorState must be used within a CalculatorStateDispatchProvider");
    return context;
};

export const useCalculatorDispatch = () => {
    const context = useContext(CalculatorDispatchContext);
    if (!context) throw new Error("useCalculatorDispatch must be used within a CalculatorStateDispatchProvider");
    return context;
};
