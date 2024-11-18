import { MouseEvent, RefObject, TouchEvent } from "react";
import { clamp } from "src/utils/clamp";

const usePaneSlider = (
    paneRef: RefObject<HTMLElement>,
    parentRef: RefObject<HTMLElement>,
) => {
    const slidingMove = (e: globalThis.MouseEvent | globalThis.TouchEvent) => {
        if (!parentRef.current || !paneRef.current) return

        document.body.style.cursor = 'ew-resize';

        const calculatorRect = parentRef.current.getBoundingClientRect();
        const historyRect = paneRef.current.getBoundingClientRect();
        const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;

        const newWidth = clamp(
            200,
            historyRect.width - (clientX - historyRect.right),
            calculatorRect.width
        );
        paneRef.current.style.width = `${newWidth}px`
    }

    const slidingStop = () => {
        document.body.style.cursor = 'auto';

        document.removeEventListener("mousemove", slidingMove);
        document.removeEventListener("touchmove", slidingMove);
        document.removeEventListener("mouseup", slidingStop);
        document.removeEventListener("touchend", slidingStop);
    }

    const slidingStart = (e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) => {
        if (e.type === "mousedown" && (e as MouseEvent).button !== 0) return;
        if (!parentRef.current || !paneRef.current) return


        document.addEventListener("mousemove", slidingMove);
        document.addEventListener("touchmove", slidingMove);
        document.addEventListener("mouseup", slidingStop);
        document.addEventListener("touchend", slidingStop);
    }

    return slidingStart;
}

export default usePaneSlider