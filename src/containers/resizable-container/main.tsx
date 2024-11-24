import {
    useRef,
    useEffect,
    forwardRef,
    useImperativeHandle,
} from "react";

import { ResizableContainerProps, ResizingState } from "./types";
import { resizeHandleClassName } from "./helper";
import useResizeContainer from "./hooks/useResizeContainer";


const ResizableContainer = forwardRef<HTMLDivElement, ResizableContainerProps>(
    ({
        parentRef,
        activeHandles,
        className,
        children,
        ...props
    }, ref) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const isResizing = useRef<ResizingState>({});
        const initialMinWidth = useRef<number>();
        const initialMinHeight = useRef<number>();


        useImperativeHandle(ref, () => containerRef.current!)

        useEffect(() => {
            if (containerRef.current) {
                initialMinWidth.current = containerRef.current.clientWidth;
                initialMinHeight.current = containerRef.current.clientHeight;
            }
        }, [containerRef]);


        const handleResizeStart = useResizeContainer(containerRef, parentRef, initialMinWidth, initialMinHeight, isResizing)

        return (
            <div
                className={className + " overflow-hidden"}
                ref={containerRef}
                {...props}
            >
                {children}
                <div
                    onMouseDown={handleResizeStart}
                    onTouchStart={handleResizeStart}
                >
                    {Object.entries(activeHandles).map(([direction, isActive]) => (
                        isActive
                        &&
                        <div
                            key={direction}
                            className={resizeHandleClassName(direction as keyof ResizingState)}
                            data-handle-direction={direction}
                        />
                    ))}
                </div>
            </div>
        );
    });


export default ResizableContainer;
