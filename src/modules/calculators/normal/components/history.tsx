import { MouseEventHandler, RefObject, TouchEventHandler, useRef } from "react"
import { EllipsisVertical } from "lucide-react"

import usePaneSlider from "@hooks/usePaneSlider"
import { useCalculatorState } from "../context/consumer"

const CalculatorNormalHistory = ({
    calculatorRef,
    startDragging,
}: {
    calculatorRef: RefObject<HTMLElement>,
    startDragging: MouseEventHandler<HTMLElement> | TouchEventHandler<HTMLElement>
}) => {
    const CalculatorState = useCalculatorState()
    const historyRef = useRef<HTMLDivElement>(null)
    const startHistoryPaneSliding = usePaneSlider(historyRef, calculatorRef)

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
                className="min-w-[100px] h-full flex flex-col select-none overflow-hidden"
                ref={historyRef}
            >
                <header className="h-10 p-2 bg-slate-600 hover:cursor-move"
                    onMouseDown={startDragging as MouseEventHandler}
                    onTouchStart={startDragging as TouchEventHandler}
                >
                    <p>History</p>
                </header>
                <main className="w-full h-full relative flex flex-col gap-1 p-1 bg-white text-black select-text overflow-auto"
                >
                    {CalculatorState.history?.map(({ id, expression, result, timestamp }) => {
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