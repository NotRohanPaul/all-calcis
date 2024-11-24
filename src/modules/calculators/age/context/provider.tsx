import { FC, ReactNode, useReducer } from "react";

import { ageCalculatorInitialState, ageCalculatorReducer } from "../reducers/reducer";
import { CalculatorDispatchContext, CalculatorStateContext } from "./consumer";


export const AgeCalculatorStateDispatchProvider: FC<{ children: ReactNode }> =
    ({ children }) => {
        const [calculatorState, calculatorDispatch] = useReducer(ageCalculatorReducer, ageCalculatorInitialState);

        return (
            <CalculatorStateContext.Provider value={calculatorState}>
                <CalculatorDispatchContext.Provider value={calculatorDispatch}>
                    {children}
                </CalculatorDispatchContext.Provider>
            </CalculatorStateContext.Provider>
        );
    };

