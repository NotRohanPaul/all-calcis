import { RefObject, useEffect } from "react";

const useResetOnWindowResize = (
    containerRef: RefObject<HTMLElement | null>

) => {

    useEffect(() => {
        if (!containerRef.current) return;

        const intialWidth = containerRef.current?.clientWidth;
        const intialHeight = containerRef.current?.clientHeight;

        const handleResize = () => {
            if (!containerRef.current) return;

            containerRef.current.style.width = `${intialWidth}px`
            containerRef.current.style.height = `${intialHeight}px`

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