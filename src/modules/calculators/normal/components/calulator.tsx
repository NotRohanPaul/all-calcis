import CalculatorNormalDisplay from "./display"
import CalculatorNormalKeypad from "./keypad"
import { Dispatch, MouseEventHandler, RefObject, SetStateAction, TouchEventHandler, useEffect, useState } from "react";
import { LogsIcon } from "lucide-react";
import { CalculatorHistoryType } from "../types";
import useResetOnWindowResize from "src/hooks/useResetOnWindowResize";
import CalculatorMenu from "./menu";

const CalulatorNormalBody = ({
    calculatorRef,
    setCalculatorHistory,
    isCalulatorMenuVisible,
    setIsCalulatorMenuVisible,
    isHistoryPaneVisible,
    setIsHistoryPaneVisible,
    startDragging,
}: {
    calculatorRef: RefObject<HTMLElement>,
    isCalulatorMenuVisible: boolean,
    setIsCalulatorMenuVisible: Dispatch<SetStateAction<boolean>>,
    isHistoryPaneVisible: boolean
    setCalculatorHistory: Dispatch<SetStateAction<CalculatorHistoryType[]>>,
    setIsHistoryPaneVisible: Dispatch<SetStateAction<boolean>>,
    startDragging: MouseEventHandler<HTMLElement> | TouchEventHandler<HTMLElement>
}) => {
    const [calculatorMainDisplay, setCalculatorMainDisplay] = useState<string>("");
    const [calculatorTopDisplay, setCalculatorTopDisplay] = useState<string>("");
    const [calculatorBottomDisplay, setCalculatorBottomDisplay] = useState<string>("");

    useResetOnWindowResize(calculatorRef);

    useEffect(() => {
        setCalculatorBottomDisplay("")
    }, [calculatorMainDisplay])

    return (
        <section
            className="w-full h-full flex flex-col select-none overflow-hidden"
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
                    onClick={() => setIsCalulatorMenuVisible(!isCalulatorMenuVisible)}
                />

                {isCalulatorMenuVisible
                    &&
                    <CalculatorMenu
                        isHistoryPaneVisible={isHistoryPaneVisible}
                        setIsHistoryPaneVisible={setIsHistoryPaneVisible}
                    />
                }

            </header>
            <main className="relative w-full h-[25%] text-2xl p-2 bg-white text-black  select-text"
            >
                <CalculatorNormalDisplay
                    calculatorMainDisplay={calculatorMainDisplay} calculatorTopDisplay={calculatorTopDisplay}
                    calculatorBottomDisplay={calculatorBottomDisplay}
                />
            </main>
            <footer className="h-full text-2xl text-black border-t-4 border-gray-500">
                <CalculatorNormalKeypad
                    calculatorMainDisplay={calculatorMainDisplay}
                    setCalculatorMainDisplay={setCalculatorMainDisplay}
                    setCalculatorTopDisplay={setCalculatorTopDisplay}
                    setCalculatorBottomDisplay={setCalculatorBottomDisplay}
                    setCalculatorHistory={setCalculatorHistory}
                />
            </footer>
        </section>
    )
}

export default CalulatorNormalBody