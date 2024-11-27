import { MouseEventHandler, RefObject, TouchEventHandler, useRef } from "react";
import { useOutletContext } from "react-router-dom";

import useContainerDrag from "@hooks/useContainerDrag";
import useResetOnWindowResize from "@hooks/useResetOnWindowResize";

import ResizableContainer from "@containers/resizable-container/main"
import NumericInputBox from "@components/numeric-input-box";

const UnitsConverterBody = () => {
    const converterRef = useRef<HTMLDivElement>(null)
    const pageRef: RefObject<HTMLDivElement> = useOutletContext();

    const startDragging = useContainerDrag(converterRef, pageRef);
    useResetOnWindowResize(converterRef);

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
            className={`absolute w-[600px] h-[500px] bg-gray-500 border-white border-2 flex`}
            ref={converterRef}
        >
            <section className="min-w-[200px] w-full h-full flex flex-col select-none overflow-hidden">
                <header className="flex h-10 p-2 bg-indigo-950 ">
                    <div className="w-full hover:cursor-move"
                        onMouseDown={startDragging as MouseEventHandler}
                        onTouchStart={startDragging as TouchEventHandler}
                    >
                        <p>Units Converter</p>
                    </div>
                </header>
                <main className="w-full h-[30%] flex flex-col gap-2 text-2xl p-2  select-text">
                    <div>
                        <label htmlFor="">From: </label>
                        <NumericInputBox />
                    </div>
                    <div>
                        <label htmlFor="">To: </label>
                        <NumericInputBox />
                    </div>
                </main>
                <footer className="w-full h-full flex gap-2 p-2 bg-orange-200 text-black">
                    <aside className="w-[5rem] h-full flex flex-col gap-2 text-white justify-center [&_>*]:p-2 [&_>*]:bg-red-500">
                        <button>Length</button>
                        <button>Weight</button>
                        <button>Area</button>
                        <button>Volume</button>
                    </aside>

                    <section className="w-full flex gap-2 overflow-hidden">
                        <div className="w-[50%] h-full flex flex-col bg-white">
                            <p className="self-center p-2">From: </p>
                            <section className="w-full h-full flex flex-col bg-red-500">
                                <header className="w-full flex justify-center">
                                    <div className="w-fit flex gap-1 p-1 bg-black overflow-auto [&>*]:px-2 [&>*]:bg-gray-600 [&>*]:text-white">
                                        <button>Meterix</button>
                                        <button>US</button>
                                        <button>Meterix</button>
                                        <button>US</button>
                                        <button>Meterix</button>
                                        <button>US</button>
                                        <button>Meterix</button>
                                        <button>US</button>
                                        <button>Meterix</button>
                                        <button>US</button>
                                    </div>
                                </header>
                                <main className="w-full h-full bg-orange-400">

                                </main>
                            </section>
                        </div>

                        <div className="w-[50%] h-full flex flex-col bg-white">
                            <p className="self-center p-2">To: </p>
                            <section className="w-full h-full flex flex-col bg-red-500">
                                <header className="w-full flex justify-center">
                                    <div className="w-fit flex gap-1 p-1 bg-black overflow-auto [&>*]:px-2 [&>*]:bg-gray-600 [&>*]:text-white">
                                        <button>Meterix</button>
                                        <button>US</button>
                                        <button>Meterix</button>
                                        <button>US</button>
                                        <button>Meterix</button>
                                        <button>US</button>
                                        <button>Meterix</button>
                                        <button>US</button>
                                        <button>Meterix</button>
                                        <button>US</button>
                                    </div>
                                </header>
                                <main className="w-full h-full bg-orange-400">

                                </main>
                            </section>
                        </div>
                    </section>
                </footer>
            </section >
        </ResizableContainer >
    )
}

export default UnitsConverterBody