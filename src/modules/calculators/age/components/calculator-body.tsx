import {
    MouseEventHandler,
    RefObject,
    TouchEventHandler,
    useRef,
} from "react";
import { useOutletContext } from "react-router-dom";

import useContainerDrag from "@hooks/useContainerDrag";
import useResetOnWindowResize from "@hooks/useResetOnWindowResize";
import { useCalculatorState } from "../context/consumer";

import ResizableContainer from "@containers/resizable-container/main";

import InputSection from "./input-section";


const CalculatorAgeBody = () => {
    const calculatorRef = useRef<HTMLDivElement>(null)
    const pageRef: RefObject<HTMLDivElement> = useOutletContext();

    const startDragging = useContainerDrag(calculatorRef, pageRef);
    useResetOnWindowResize(calculatorRef);

    const ageCalculatorState = useCalculatorState()

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
            className={`absolute w-[400px] h-[500px] bg-gray-500 border-white border-2 flex`}
            ref={calculatorRef}
        >
            <section className="min-w-[200px] w-full h-full flex flex-col select-none overflow-hidden">
                <header className="flex h-10 p-2 bg-indigo-950 ">
                    <div className="w-full hover:cursor-move"
                        onMouseDown={startDragging as MouseEventHandler}
                        onTouchStart={startDragging as TouchEventHandler}
                    >
                        <p>Age Calci</p>
                    </div>
                </header>
                <main className="w-full h-[30%] flex flex-col gap-2 text-2xl p-2  select-text">
                    <InputSection />
                </main>
                <footer className="w-full h-full p-2 bg-orange-200 text-black">
                    {
                        ageCalculatorState.calculatedAge !== 0 &&
                        <p className="font-semibold text-2xl">
                            Your Age: {ageCalculatorState.calculatedAge}
                        </p>
                    }
                </footer>
            </section >
        </ResizableContainer >
    )
}

export default CalculatorAgeBody