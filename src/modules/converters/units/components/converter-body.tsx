import {
    MouseEventHandler,
    RefObject,
    TouchEventHandler,
    useRef
} from "react";
import { useOutletContext } from "react-router-dom";

import useContainerDrag from "@hooks/useContainerDrag";
import useResetOnWindowResize from "@hooks/useResetOnWindowResize";

import ResizableContainer from "@containers/resizable-container/main"

import MainContent from "./main-content/main-content";
import FooterContent from "./footer-content/footer-content";

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
            className={`absolute w-[700px] h-[600px] bg-gray-500 border-white border-2 flex`}
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

                <main className="w-full h-[40%] flex gap-5 text-xl px-3 py-3  overflow-auto select-none">
                    <MainContent />
                </main>

                <footer className="w-full h-full flex gap-2 p-2 bg-orange-200 text-black">
                    <FooterContent />
                </footer>

            </section>
        </ResizableContainer >
    )
}

export default UnitsConverterBody