import { FC, ReactNode, useReducer } from "react";

import { calculatorInitialState, calculatorReducer } from "../reducers/reducer";
import { CalculatorDispatchContext, CalculatorStateContext } from "./consumer";


export const CalculatorStateDispatchProvider: FC<{ children: ReactNode }> =
    ({ children }) => {
        const [calculatorState, calculatorDispatch] = useReducer(calculatorReducer, calculatorInitialState);

        return (
            <CalculatorStateContext.Provider value={calculatorState}>
                <CalculatorDispatchContext.Provider value={calculatorDispatch}>
                    {children}
                </CalculatorDispatchContext.Provider>
            </CalculatorStateContext.Provider>
        );
    };

