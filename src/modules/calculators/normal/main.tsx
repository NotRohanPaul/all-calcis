import {
    RefObject,
    useRef,
} from "react";
import { useOutletContext } from "react-router-dom";

import useContainerDrag from "@hooks/useContainerDrag";
import ResizableContainer from "@containers/resizable-container/ResizableContainer";
import { CalculatorNormalBody } from "./components";
import { CalculatorStateDispatchProvider } from "./context/provider";


const CalculatorNormalMain = () => {
    const calculatorRef = useRef<HTMLDivElement>(null)
    const pageRef: RefObject<HTMLDivElement> = useOutletContext();

    const startDragging = useContainerDrag(calculatorRef, pageRef);

    return (
        <CalculatorStateDispatchProvider>
            <ResizableContainer
                parentRef={pageRef}
                activeHandles={{
                    leftBorder: true,
                    rightBorder: true,
                    topBorder: true,
                    bottomBorder: true,
                    topLeftCorner: true,
                    topRightCorner: true,
                    bottomRightCorner: true,
                    bottomLeftCorner: true,
                }}
                className="absolute w-[400px] h-[500px] bg-gray-500 border-white border-2 flex"
                ref={calculatorRef}
            >

                <CalculatorNormalBody
                    calculatorRef={calculatorRef}
                    startDragging={startDragging}
                />

            </ResizableContainer >
        </CalculatorStateDispatchProvider>
    )
}

export default CalculatorNormalMain


