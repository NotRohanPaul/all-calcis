import { RefObject, useRef } from "react";

import useResetOnWindowResize from "@hooks/useResetOnWindowResize";
import {
    CalculatorNormalDisplay,
    CalculatorNormalKeypad,
    CalculatorNormalHistory

} from "."
import { useCalculatorState } from "../context/consumer";
import { useOutletContext } from "react-router-dom";
import useContainerDrag from "@hooks/useContainerDrag";
import ResizableContainer from "@containers/resizable-container/main";
import CalculatorNormalTitleBar from "./title-bar";


const CalculatorNormalBody = () => {
    const calculatorState = useCalculatorState()

    const calculatorRef = useRef<HTMLDivElement>(null)
    const pageRef: RefObject<HTMLDivElement> = useOutletContext();

    const startDragging = useContainerDrag(calculatorRef, pageRef);

    useResetOnWindowResize(calculatorRef);

    return (
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
            className={`absolute w-[400px] h-[500px] bg-gray-500 border-white border-2 flex ${calculatorState.historyPanePosition === "left" ? "flex-row-reverse" : "flex-row"}`}
            ref={calculatorRef}
        >

            <section className="min-w-[200px] w-full h-full flex flex-col select-none overflow-hidden">
                <header className="flex h-10 p-2 bg-indigo-950 ">
                    <CalculatorNormalTitleBar
                        calculatorRef={calculatorRef}
                        pageRef={pageRef}
                    />
                </header>

                <main className="relative w-full h-[25%] text-2xl p-2 bg-white text-black select-text">
                    <CalculatorNormalDisplay />
                </main>

                <footer className="h-full text-2xl text-black border-t-4 border-gray-500">
                    <CalculatorNormalKeypad />
                </footer>
            </section>

            {calculatorState.isHistoryPaneVisible
                &&
                <CalculatorNormalHistory
                    calculatorRef={calculatorRef}
                    startDragging={startDragging}
                />}


        </ResizableContainer >

    )
}

export default CalculatorNormalBody