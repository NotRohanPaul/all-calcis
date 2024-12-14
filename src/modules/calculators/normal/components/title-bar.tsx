import {
    MouseEventHandler,
    RefObject,
    TouchEventHandler
} from "react";

import { LogsIcon, Maximize, Minimize } from "lucide-react";

import useContainerDrag from "@hooks/useContainerDrag";
import {
    useCalculatorDispatch,
    useCalculatorState
} from "../context/consumer";
import CalculatorNormalMenu from "./menu";
import useMaximizeMinimizeContainer from "@hooks/useMaximizeMinimizeContainer";

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
    const [handleMaximize, handleMinimize] = useMaximizeMinimizeContainer(calculatorRef, pageRef)

    return (
        <>
            <div className="w-full hover:cursor-move"
                onMouseDown={startDragging as MouseEventHandler}
                onTouchStart={startDragging as TouchEventHandler}
            >
                <p>Normal Calci</p>
            </div>
            <div className="flex gap-2">
                <button className="cursor-pointer"
                    onClick={handleMinimize}
                >
                    <Minimize size={20} />
                </button>
                <button
                    className="cursor-pointer"
                    onClick={handleMaximize}
                >
                    <Maximize size={20} />
                </button>
                <LogsIcon
                    className="cursor-pointer"
                    onClick={() => calculatorDispatch({ type: "TOGGLE_CALC_MENU" })}
                />
            </div>

            {
                calculatorState.isCalculatorMenuVisible
                &&
                <CalculatorNormalMenu />
            }
        </>
    )
}

export default CalculatorNormalTitleBar