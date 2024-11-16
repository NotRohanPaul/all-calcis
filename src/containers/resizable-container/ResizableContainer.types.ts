import { HTMLAttributes, ReactNode, RefObject } from "react";

export type ResizingState = {
    leftBorder?: boolean;
    rightBorder?: boolean;
    topBorder?: boolean;
    bottomBorder?: boolean;
    topLeftCorner?: boolean;
    topRightCorner?: boolean;
    bottomRightCorner?: boolean;
    bottomLeftCorner?: boolean;
};


export interface ResizableContainerProps extends HTMLAttributes<HTMLElement> {
    parentRef: RefObject<HTMLElement>;
    activeHandles: Partial<ResizingState>;
    className?: string;
    children: ReactNode;
}
