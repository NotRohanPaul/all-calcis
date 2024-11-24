import {
    MouseEventHandler,
    RefObject,
    TouchEventHandler
} from "react";

import { LogsIcon } from "lucide-react";

import useContainerDrag from "@hooks/useContainerDrag";
import {
    useCalculatorDispatch,
    useCalculatorState
} from "../context/consumer";
import CalculatorNormalMenu from "./menu";

const CalculatorNormalTitleBar = ({
    calculatorRef,
    pageRef
}: {
    calculatorRef: RefObject<HTMLElement>,
    pageRef: RefObject<HTMLElement>,
}) => {
    const calculatorState = useCalculatorState()
    const calculatorDispatch = useCalculatorDispatch()

    const startDragging = useContainerDrag(calculatorRef, pageRef);

    return (
        <>
            <div className="w-full hover:cursor-move"
                onMouseDown={startDragging as MouseEventHandler}
                onTouchStart={startDragging as TouchEventHandler}
            >
                <p>Normal Calci</p>
            </div>
            <LogsIcon
                className="cursor-pointer"
                onClick={() => calculatorDispatch({ type: "TOGGLE_CALC_MENU" })}
            />

            {
                calculatorState.isCalculatorMenuVisible
                &&
                <CalculatorNormalMenu />
            }
        </>
    )
}

export default CalculatorNormalTitleBar