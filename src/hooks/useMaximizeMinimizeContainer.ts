import { RefObject, useRef } from "react"

const useMaximizeMinimizeContainer = (
    containerRef: RefObject<HTMLElement>,
    pageRef: RefObject<HTMLElement>,
) => {
    const intialWidth = useRef<number | null>(null);
    const intialHeight = useRef<number | null>(null);

    const handleClickToMaximize = () => {
        if (!pageRef.current || !containerRef.current) return;

        if (intialWidth.current === null && intialHeight.current === null) {
            intialWidth.current = containerRef.current.clientWidth
            intialHeight.current = containerRef.current.clientHeight
        }

        containerRef.current.style.left = `0`;
        containerRef.current.style.top = `0`;
        containerRef.current.style.width = `${pageRef.current.clientWidth}px`;
        containerRef.current.style.height = `${pageRef.current.clientHeight}px`;

    }
    const handleClickToMinimize = () => {
        if (!containerRef.current) return;
        containerRef.current.style.left = `auto`;
        containerRef.current.style.top = `auto`;

        if (intialWidth.current !== null && intialHeight.current !== null) {
            containerRef.current.style.width = `${intialWidth.current}px`
            containerRef.current.style.height = `${intialHeight.current}px`
        }
    }
    return [handleClickToMaximize, handleClickToMinimize];
}

export default useMaximizeMinimizeContainer