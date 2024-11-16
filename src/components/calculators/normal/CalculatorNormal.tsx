import {
    MouseEvent,
    MouseEventHandler,
    RefObject,
    TouchEvent,
    TouchEventHandler,
    useEffect,
    useRef,
    useState
} from "react";
import { useOutletContext } from "react-router-dom";
import { useResetOnWindowResize } from "src/hooks/useResetOnWindowResize";
import { useContainerDrag } from "src/hooks/useContainerDrag";

import Keypad from "./Keypad";
import Display from "./Display";
import ResizableContainer from "src/containers/resizable-container/ResizableContainer";

import { EllipsisVertical, Logs } from "lucide-react";

import { clamp } from "src/utils/clamp";
import { CalculatorHistory } from "./CalculatorNormal.types";



const CalculatorNormal = () => {
    const [calculatorMainDisplay, setCalculatorMainDisplay] = useState<string>("");
    const [calculatorTopDisplay, setCalculatorTopDisplay] = useState<string>("");
    const [calculatorBottomDisplay, setCalculatorBottomDisplay] = useState<string>("");
    const [calculatorHistory, setCalculatorHistory] = useState<CalculatorHistory[]>([]);

    const calculatorRef = useRef<HTMLDivElement>(null)
    const pageRef: RefObject<HTMLDivElement> = useOutletContext();
    const historyRef = useRef<HTMLDivElement>(null)

    const startDragging = useContainerDrag(calculatorRef, pageRef);


    useResetOnWindowResize(calculatorRef);
    useEffect(() => {
        setCalculatorBottomDisplay("")
    }, [calculatorMainDisplay])

    const handleMove = (e: globalThis.MouseEvent | globalThis.TouchEvent) => {
        if (!calculatorRef.current || !historyRef.current) return

        document.body.style.cursor = 'ew-resize';
        const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
        const calculatorRect = calculatorRef.current?.getBoundingClientRect();
        const historyRect = historyRef.current?.getBoundingClientRect();
        historyRef.current.style.width = `${clamp(
            300,
            historyRect.width - (clientX - historyRect.right),
            calculatorRect.width
        )}px`;
    }

    const stopDragging = () => {
        document.body.style.cursor = 'auto';


        document.removeEventListener("mousemove", handleMove);
        document.removeEventListener("touchmove", handleMove);
        document.removeEventListener("mouseup", stopDragging);
        document.removeEventListener("touchend", stopDragging);
    }
    const handleSlider = (e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) => {
        if (e.type === "mousedown" && (e as MouseEvent).button !== 0) return;
        if (!calculatorRef.current || !historyRef.current) return


        document.addEventListener("mousemove", handleMove);
        document.addEventListener("touchmove", handleMove);
        document.addEventListener("mouseup", stopDragging);
        document.addEventListener("touchend", stopDragging);


    }

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
            className="absolute w-[500px] h-[400px] bg-gray-500 border-white border-2 flex"
            ref={calculatorRef}
        >
            <section className="w-full h-full flex flex-col select-none overflow-hidden"
            >
                <header className="flex justify-between h-10 p-2 bg-indigo-950 hover:cursor-move"
                    onMouseDown={startDragging as MouseEventHandler}
                    onTouchStart={startDragging as TouchEventHandler}
                >
                    <p>Normal Calci</p>
                    <Logs className="cursor-pointer" />
                </header>
                <main className="relative w-full h-[25%] text-2xl p-2 bg-white text-black  select-text"
                >
                    <Display
                        calculatorMainDisplay={calculatorMainDisplay} calculatorTopDisplay={calculatorTopDisplay}
                        calculatorBottomDisplay={calculatorBottomDisplay}
                    />
                </main>
                <footer className="h-full text-2xl text-black border-t-4 border-gray-500">
                    <Keypad
                        calculatorMainDisplay={calculatorMainDisplay}
                        setCalculatorMainDisplay={setCalculatorMainDisplay}
                        setCalculatorTopDisplay={setCalculatorTopDisplay}
                        setCalculatorBottomDisplay={setCalculatorBottomDisplay}
                        setCalculatorHistory={setCalculatorHistory}
                    />
                </footer>

            </section>

            <div className="w-2 h-full bg-gray-700 flex flex-col justify-center items-center cursor-ew-resize select-none"
                onMouseDown={handleSlider}
                onTouchStart={handleSlider}
            >
                <EllipsisVertical />
            </div>

            <section
                className="w-full h-full flex flex-col select-none overflow-hidden"
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
        </ResizableContainer >
    )
}

export default CalculatorNormal