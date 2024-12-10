import { MouseEvent, RefObject, TouchEvent } from "react";
import { clamp } from "@utils/common-utils";

const usePaneSlider = (
    paneRef: RefObject<HTMLElement>,
    parentRef: RefObject<HTMLElement>,
    panePosition: "left" | "right"
) => {

    let target: HTMLElement;
    const slidingMove = (e: globalThis.MouseEvent | globalThis.TouchEvent) => {
        if (!parentRef.current || !paneRef.current) return

        document.body.style.cursor = 'ew-resize';

        const parentRect = parentRef.current.getBoundingClientRect();
        const paneRect = paneRef.current.getBoundingClientRect();
        const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;

        let cursorRelativeOffset = (clientX - paneRect.right + target.clientWidth);

        if (panePosition === "left") {
            cursorRelativeOffset = -1 * cursorRelativeOffset;
        }

        const newWidth = clamp(
            200,
            paneRect.width - cursorRelativeOffset,
            parentRect.width
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

    const slidingStart = (e: MouseEvent<HTMLElement> | TouchEvent<HTMLElement>) => {
        if (e.type === "mousedown" && (e as MouseEvent).button !== 0) return;
        if (!parentRef.current || !paneRef.current) return

        target = e.target as HTMLElement;

        document.addEventListener("mousemove", slidingMove);
        document.addEventListener("touchmove", slidingMove);
        document.addEventListener("mouseup", slidingStop);
        document.addEventListener("touchend", slidingStop);
    }

    return slidingStart;
}

export default usePaneSlider