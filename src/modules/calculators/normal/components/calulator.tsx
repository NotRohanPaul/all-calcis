import { MouseEventHandler, RefObject, TouchEventHandler } from "react";
import { LogsIcon } from "lucide-react";

import useResetOnWindowResize from "@hooks/useResetOnWindowResize";
import {
    CalculatorNormalDisplay,
    CalculatorNormalKeypad,
    CalculatorNormalMenu,
    CalculatorNormalHistory

} from "../components"
import { useCalculatorDispatch, useCalculatorState } from "../context/consumer";


const CalculatorNormalBody = ({
    calculatorRef,
    startDragging,
}: {
    calculatorRef: RefObject<HTMLElement>,
    startDragging: MouseEventHandler<HTMLElement> | TouchEventHandler<HTMLElement>
}) => {
    const CalculatorState = useCalculatorState()
    const CalculatorDispatch = useCalculatorDispatch()

    useResetOnWindowResize(calculatorRef);

    return (
        <>
            <section
                className="min-w-[200px] w-full h-full flex flex-col select-none overflow-hidden"
            >
                <header className="flex relative h-10 p-2 bg-indigo-950 "
                >
                    <div className="w-full hover:cursor-move"
                        onMouseDown={startDragging as MouseEventHandler}
                        onTouchStart={startDragging as TouchEventHandler}

                    >
                        <p>Normal Calci</p>
                    </div>
                    <LogsIcon
                        className="cursor-pointer"
                        onClick={() => CalculatorDispatch({ type: "TOGGLE_CALC_MENU" })}
                    />

                    {CalculatorState.isCalculatorMenuVisible
                        &&
                        <CalculatorNormalMenu />
                    }

                </header>
                <main className="relative w-full h-[25%] text-2xl p-2 bg-white text-black  select-text"
                >
                    <CalculatorNormalDisplay />
                </main>
                <footer className="h-full text-2xl text-black border-t-4 border-gray-500">
                    <CalculatorNormalKeypad />
                </footer>
            </section>

            {CalculatorState.isHistoryPaneVisible
                &&
                <CalculatorNormalHistory
                    calculatorRef={calculatorRef}
                    startDragging={startDragging}
                />}
        </>

    )
}

export default CalculatorNormalBody