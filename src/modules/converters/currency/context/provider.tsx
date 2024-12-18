import { ReactNode, useReducer } from "react";
import { CurrencyConverterStateContext, CurrencyConverterDispatchContext } from "./consumer";
import { currencyConverterReducer, currencyConveterInitialState } from "../reducer/reducer";

export const CurrencyConverterStateDispatchProvider = ({ children }: { children: ReactNode; }) => {
    const [state, dispatch] = useReducer(currencyConverterReducer, currencyConveterInitialState());

    return (
        <CurrencyConverterStateContext.Provider value={state}>
            <CurrencyConverterDispatchContext.Provider value={dispatch}>
                {children}
            </CurrencyConverterDispatchContext.Provider>
        </CurrencyConverterStateContext.Provider>
    );
}; 