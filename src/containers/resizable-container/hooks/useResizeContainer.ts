import { MouseEvent, MutableRefObject, RefObject, TouchEvent } from "react";
import { ResizingState } from "../types";
import { clamp } from "@utils/clamp";
import { getCursorStyle } from "../helper";

const useResizeContainer = (
    containerRef: RefObject<HTMLElement>,
    parentRef: RefObject<HTMLElement>,
    initialMinWidth: MutableRefObject<number | undefined>,
    initialMinHeight: MutableRefObject<number | undefined>,
    isResizing: MutableRefObject<ResizingState>
) => {

    const handleMove = (e: globalThis.MouseEvent | globalThis.TouchEvent) => {
        if (!containerRef.current || !parentRef.current || !initialMinWidth.current || !initialMinHeight.current || !isResizing.current) return;
        const resizingDirection = Object.keys(isResizing.current)
            .find(
                key => isResizing.current![key as keyof ResizingState]
            ) as keyof ResizingState;

        if (!resizingDirection) return;

        document.body.style.cursor = getCursorStyle(resizingDirection);


        const containerRect = containerRef.current.getBoundingClientRect();
        const parentRect = parentRef.current.getBoundingClientRect();
        let newWidth = containerRect.width;
        let newHeight = containerRect.height;
        let newLeft = containerRect.left - parentRect.left;
        let newTop = containerRect.top - parentRect.top;
        const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
        const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

        if (isResizing.current.topLeftCorner) {
            newWidth = clamp(
                initialMinWidth.current,
                containerRect.right - clientX,
                containerRect.width + containerRect.left - parentRect.left
            );

            newHeight = clamp(
                initialMinHeight.current,
                containerRect.bottom - clientY,
                containerRect.height + containerRect.top - parentRect.top
            );

            newTop = (containerRect.top - parentRect.top) + (containerRect.height - newHeight);
            newLeft = (containerRect.left - parentRect.left) + (containerRect.width - newWidth);
        }
        if (isResizing.current.topBorder) {
            newHeight = clamp(initialMinHeight.current,
                containerRect.bottom - clientY,
                containerRect.height + containerRect.top - parentRect.top
            );
            newTop = (containerRect.top - parentRect.top) + (containerRect.height - newHeight);
        }
        if (isResizing.current.topRightCorner) {
            newWidth = clamp(
                initialMinWidth.current,
                clientX - containerRect.left,
                parentRect.right - containerRect.right + containerRect.width
            );
            newHeight = clamp(
                initialMinHeight.current,
                containerRect.bottom - clientY,
                containerRect.height + containerRect.top - parentRect.top
            );
            newTop = (containerRect.top - parentRect.top) + (containerRect.height - newHeight);
        }
        if (isResizing.current.rightBorder) {
            newWidth = clamp(
                initialMinWidth.current,
                clientX - containerRect.left,
                parentRect.right - containerRect.right + containerRect.width
            );
        }
        if (isResizing.current.bottomRightCorner) {
            newWidth = clamp(
                initialMinWidth.current,
                clientX - containerRect.left,
                parentRect.right - containerRect.right + containerRect.width
            );
            newHeight = clamp(
                initialMinHeight.current,
                clientY - containerRect.top,
                parentRect.bottom - containerRect.bottom + containerRect.height
            );
        }
        if (isResizing.current.bottomBorder) {
            newHeight = clamp(
                initialMinHeight.current,
                clientY - containerRect.top,
                parentRect.bottom - containerRect.bottom + containerRect.height
            );
        }
        if (isResizing.current.bottomLeftCorner) {
            newWidth = clamp(
                initialMinWidth.current,
                containerRect.right - clientX,
                containerRect.width + containerRect.left - parentRect.left
            );
            newHeight = clamp(
                initialMinHeight.current,
                clientY - containerRect.top,
                parentRect.bottom - containerRect.bottom + containerRect.height
            );
            newLeft = (containerRect.left - parentRect.left) + (containerRect.width - newWidth);
        }
        if (isResizing.current.leftBorder) {
            newWidth = clamp(initialMinWidth.current,
                containerRect.right - clientX,
                containerRect.width + containerRect.left - parentRect.left
            );
            newLeft = (containerRect.left - parentRect.left) + (containerRect.width - newWidth);
        }

        containerRef.current.style.width = `${newWidth}px`;
        containerRef.current.style.height = `${newHeight}px`;
        containerRef.current.style.top = `${newTop}px`;
        containerRef.current.style.left = `${newLeft}px`;
    };


    const handleStart = (e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.type === "mousedown" && (e as MouseEvent).button !== 0) return;
        const target = e.target as HTMLElement;
        if (!target.dataset.handleDirection || !isResizing.current) return;

        const direction = target.dataset.handleDirection as keyof ResizingState;
        isResizing.current[direction] = true;

        document.addEventListener('mousemove', handleMove);
        document.addEventListener('touchmove', handleMove);
        document.addEventListener('mouseup', handleStop);
        document.addEventListener('touchend', handleStop);
    };

    const handleStop = () => {
        if (!isResizing.current) return;

        document.body.style.cursor = 'auto';
        document.removeEventListener('mousemove', handleMove);
        document.removeEventListener('touchmove', handleMove);
        document.removeEventListener('mouseup', handleStop);
        document.removeEventListener('touchend', handleStop);

        Object.keys(isResizing.current).forEach(key => {
            isResizing.current![key as keyof ResizingState] = false;
        });
    };

    return handleStart;
}

export default useResizeContainer