import { MouseEventHandler, RefObject, TouchEventHandler, useRef } from "react"
import { EllipsisVertical, PanelLeft, PanelRight } from "lucide-react"

import usePaneSlider from "@hooks/usePaneSlider"
import { useCalculatorDispatch, useCalculatorState } from "../context/consumer"

const CalculatorNormalHistory = ({
    calculatorRef,
    startDragging,
}: {
    calculatorRef: RefObject<HTMLElement>,
    startDragging: MouseEventHandler<HTMLElement> | TouchEventHandler<HTMLElement>
}) => {
    const calculatorState = useCalculatorState()
    const calculatorDispatch = useCalculatorDispatch()

    const historyRef = useRef<HTMLDivElement>(null)
    const startHistoryPaneSliding = usePaneSlider(historyRef, calculatorRef,calculatorState.historyPanePosition)

    return (
        <>
            <div
                className="w-2 h-full bg-gray-700 flex flex-col justify-center items-center cursor-ew-resize select-none"
                onMouseDown={startHistoryPaneSliding}
                onTouchStart={startHistoryPaneSliding}
            >
                <EllipsisVertical />
            </div>

            <section
                className="min-w-[150px] h-full flex flex-col select-none overflow-hidden"
                ref={historyRef}
            >
                <header className="flex h-10 p-2 bg-slate-600"
                >
                    <div className="w-full hover:cursor-move"
                        onMouseDown={startDragging as MouseEventHandler}
                        onTouchStart={startDragging as TouchEventHandler}
                    >
                        <p>History</p>
                    </div>
                    <div className="flex gap-1">
                        <PanelLeft
                            className={`${calculatorState.historyPanePosition === "left" ? "opacity-50" : "cursor-pointer"} `}
                            onClick={() => calculatorDispatch({
                                type: "SET_HISTORY_PANE_POSITION",
                                payload: {
                                    position: "left"
                                }
                            })}
                            aria-disabled={calculatorState.historyPanePosition === "left" && "true"}
                        />
                        <PanelRight
                            className={`${calculatorState.historyPanePosition === "right" ? "opacity-50" : "cursor-pointer"} `}
                            onClick={() => calculatorDispatch({
                                type: "SET_HISTORY_PANE_POSITION",
                                payload: {
                                    position: "right"
                                }
                            })}
                            aria-disabled={calculatorState.historyPanePosition === "right" && "true"}
                        />
                    </div>
                </header>
                <main className="w-full h-full relative flex flex-col gap-1 p-1 bg-white text-black select-text overflow-auto"
                >
                    {calculatorState.history?.map(({ id, expression, result, timestamp }) => {
                        return <div key={id} className="w-full flex flex-col font-mono bg-gray-300 p-2"
                        >
                            <p className="text-[12px] text-right break-words">{timestamp}</p>
                            <p className="text-left break-all">{expression}</p>
                            <p className="break-all"> {"= " + result}</p>
                        </div>

                    })}
                </main>
            </section>
        </>
    )
}

export default CalculatorNormalHistory