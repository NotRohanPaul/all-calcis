import { ResizingState } from "./ResizableContainer.types"

export const getCursorStyle = (direction: keyof ResizingState): string => {
    switch (direction) {
        case 'topLeftCorner': return 'nw-resize';
        case 'topRightCorner': return 'ne-resize';
        case 'bottomRightCorner': return 'se-resize';
        case 'bottomLeftCorner': return 'sw-resize';
        case 'leftBorder': case 'rightBorder': return 'ew-resize';
        case 'topBorder': case 'bottomBorder': return 'ns-resize';
        default: return 'auto';
    }
};

export const getResizeHandleStyling = (direction: keyof ResizingState): string => {
    switch (direction) {
        case 'topLeftCorner': return `cursor-nw-resize -top-1 -left-1 w-4 h-4 rounded-full`;
        case 'topRightCorner': return 'cursor-ne-resize -top-1 -right-1 w-4 h-4 rounded-full';
        case 'bottomRightCorner': return 'cursor-se-resize -bottom-1 -right-1 w-4 h-4 rounded-full';
        case 'bottomLeftCorner': return 'cursor-sw-resize -bottom-1 -left-1 w-4 h-4 rounded-full';
        case 'leftBorder': return 'cursor-ew-resize top-0 left-0 w-1 h-full';
        case 'rightBorder': return 'cursor-ew-resize top-0 right-0 w-1 h-full';
        case 'topBorder': return 'cursor-ns-resize top-0 left-0 w-full h-1'
        case 'bottomBorder': return 'cursor-ns-resize bottom-0 left-0 w-full h-1';
    }
}



export const resizeHandleClassName = (direction: keyof ResizingState) => {
    return `absolute ${getResizeHandleStyling(direction)} `
}



export const moveContainer = ()=>{
    
}