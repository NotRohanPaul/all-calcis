import { ReactNode, useReducer } from "react";
import { unitConverterInitialState, unitConverterReducer } from "../reducers/reducer";
import { UnitConverterDispatchContext, UnitConverterStateContext } from "./consumer";


export const UnitConverterStateDispatchProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(unitConverterReducer, unitConverterInitialState())

    return (
        <UnitConverterStateContext.Provider value={state}>
            <UnitConverterDispatchContext.Provider value={dispatch}>
                {children}
            </UnitConverterDispatchContext.Provider>
        </UnitConverterStateContext.Provider>
    )
}