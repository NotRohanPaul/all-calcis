import { EllipsisVertical } from "lucide-react"
import { CalculatorHistoryType } from "../types"
import { MouseEventHandler, RefObject, TouchEventHandler, useRef } from "react"
import usePaneSlider from "src/hooks/usePaneSlider"

const CalculatorNormalHistory = ({
    calculatorRef,
    calculatorHistory,
    startDragging,
}: {
    calculatorRef: RefObject<HTMLElement>,
    calculatorHistory: CalculatorHistoryType[],
    startDragging: MouseEventHandler<HTMLElement> | TouchEventHandler<HTMLElement>
}) => {

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
                className="w-[40%] h-full flex flex-col select-none overflow-hidden"
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
                    {calculatorHistory?.map(({ id, expression, result, timestamp }) => {
                        return <div key={id} className="w-full flex flex-col font-mono text-right bg-gray-300 p-2 [&>*]:break-all "
                        >
                            <p className="text-[12px] text-left">{timestamp}</p>
                            <p>{expression}</p>
                            <p> {"= " + result}</p>
                        </div>

                    })}
                </main>
            </section>
        </>
    )
}

export default CalculatorNormalHistory