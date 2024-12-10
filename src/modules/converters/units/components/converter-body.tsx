import {
    MouseEventHandler,
    RefObject,
    TouchEventHandler,
    useRef
} from "react";
import { useOutletContext } from "react-router-dom";
import useContainerDrag from "@hooks/useContainerDrag";
import useResetOnWindowResize from "@hooks/useResetOnWindowResize";
import useMaximizeContainer from "@hooks/useMaximizeMinimizeContainer";
import ResizableContainer from "@containers/resizable-container/main"
import MainContent from "./main-content/main-content";
import FooterContent from "./footer-content/footer-content";
import { Maximize, Minimize } from "lucide-react";

const UnitsConverterBody = () => {
    const converterRef = useRef<HTMLDivElement>(null)
    const pageRef: RefObject<HTMLDivElement> = useOutletContext();

    const handleDrag = useContainerDrag(converterRef, pageRef);
    const [handleMaximize, handleMinimize] = useMaximizeContainer(converterRef, pageRef)

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

                <header className="flex items-center h-10 p-3 bg-indigo-950 ">
                    <div className="w-full hover:cursor-move"
                        onMouseDown={handleDrag as MouseEventHandler}
                        onTouchStart={handleDrag as TouchEventHandler}
                    >
                        <p>Units Converter</p>
                    </div>
                    <div className="flex gap-2">
                        <Minimize
                            className="cursor-pointer"
                            size={20}
                            onClick={handleMinimize}
                        />
                        <Maximize
                            className="cursor-pointer"
                            size={20}
                            onClick={handleMaximize}
                        />
                    </div>
                </header>

                <main className="w-full h-[70%] flex gap-5 text-xl px-3 py-3  overflow-auto select-none">
                    <MainContent />
                </main>

                <footer className="w-full min-h-[60%] max-h-[60%] flex gap-2 p-2 bg-orange-200 text-black">
                    <FooterContent />
                </footer>

            </section>
        </ResizableContainer >
    )
}

export default UnitsConverterBody