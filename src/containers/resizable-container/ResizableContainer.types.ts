import { ReactNode, RefObject } from "react";

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


export interface ResizableContainerProps {
    parentRef: RefObject<HTMLElement>;
    activeHandles: Partial<ResizingState>;
    className?: string;
    children: ReactNode;
}
