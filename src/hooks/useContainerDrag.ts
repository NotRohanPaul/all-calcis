import {
    MouseEvent,
    MouseEventHandler,
    RefObject,
    TouchEvent,
    TouchEventHandler,
    useRef
} from "react";

import { clamp } from "@utils/clamp";


const useContainerDrag = (
    containerRef: RefObject<HTMLElement | null>,
    parentRef: RefObject<HTMLElement | null>
): MouseEventHandler<HTMLElement> | TouchEventHandler<HTMLElement> => {
    const offset = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

    const handleMove = (e: globalThis.MouseEvent | globalThis.TouchEvent) => {
        const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
        const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

        if (!containerRef.current || !parentRef.current) return;
        document.body.style.cursor = 'move';

        const pageRect = parentRef.current.getBoundingClientRect();
        const calculatorRect = containerRef.current.getBoundingClientRect();

        const newLeft = clamp(0, clientX - offset.current.x - pageRect.left, pageRect.width - calculatorRect.width)

        const newTop = clamp(0, clientY - offset.current.y - pageRect.top, pageRect.height - calculatorRect.height);

        containerRef.current.style.left = `${newLeft}px`;
        containerRef.current.style.top = `${newTop}px`;
    };

    const stopDragging = () => {
        document.body.style.cursor = 'auto';

        document.removeEventListener("mousemove", handleMove);
        document.removeEventListener("mouseup", stopDragging);
        document.removeEventListener("touchmove", handleMove);
        document.removeEventListener("touchend", stopDragging);
    };

    const startDragging: MouseEventHandler<HTMLElement> | TouchEventHandler<HTMLElement> = (e: MouseEvent<HTMLElement> | TouchEvent<HTMLElement>) => {
        if (e.type === "mousedown" && (e as MouseEvent).button !== 0) return;
        if (!containerRef.current) return;

        const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
        const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

        containerRef.current.style.position = "absolute"
        const rect = containerRef.current.getBoundingClientRect();
        offset.current = {
            x: clientX - rect.left,
            y: clientY - rect.top,
        };

        document.addEventListener("mousemove", handleMove);
        document.addEventListener("touchmove", handleMove);
        document.addEventListener("mouseup", stopDragging);
        document.addEventListener("touchend", stopDragging);
    };




    return startDragging;
}

export default useContainerDrag;




