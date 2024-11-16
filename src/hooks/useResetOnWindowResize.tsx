import { RefObject, useEffect, useRef } from "react";

const useResetOnWindowResize = (
    containerRef: RefObject<HTMLElement | null>

) => {
    const intialWidth = useRef<number>()
    const intialHeight = useRef<number>()

    useEffect(() => {
        if (!containerRef.current) return;

        intialWidth.current = containerRef.current?.clientWidth;
        intialHeight.current = containerRef.current?.clientHeight;

        const handleResize = () => {
            if (!containerRef.current) return;

            containerRef.current.style.width = `${intialWidth.current}px`
            containerRef.current.style.height = `${intialHeight.current}px`

            containerRef.current.style.left = `auto`;
            containerRef.current.style.top = `auto`;
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [containerRef]);
}

export default useResetOnWindowResize;