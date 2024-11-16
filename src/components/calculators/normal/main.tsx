import {
    RefObject,
    useRef,
    useState
} from "react";

import { useOutletContext } from "react-router-dom";
import useContainerDrag from "@hooks/useContainerDrag";

import ResizableContainer from "@containers/resizable-container/ResizableContainer";

import CalculatorNormalHistory from "./history";
import { CalculatorHistoryType } from "./types";
import CalulatorNormalBody from "./calulator";



const CalculatorNormalMain = () => {
    const [calculatorHistory, setCalculatorHistory] = useState<CalculatorHistoryType[]>([]);
    const [isCalulatorMenuVisible, setIsCalulatorMenuVisible] = useState<boolean>(false)
    const [isHistoryPaneVisible, setIsHistoryPaneVisible] = useState<boolean>(false)

    const calculatorRef = useRef<HTMLDivElement>(null)
    const pageRef: RefObject<HTMLDivElement> = useOutletContext();

    const startDragging = useContainerDrag(calculatorRef, pageRef);

    return (
        <ResizableContainer
            parentRef={pageRef}
            activeHandles={{
                leftBorder: true,
                rightBorder: true,
                topBorder: true,
                bottomBorder: true,
                topLeftCorner: true,
                topRightCorner: true,
                bottomRightCorner: true,
                bottomLeftCorner: true,
            }}
            className="absolute w-[400px] h-[500px] bg-gray-500 border-white border-2 flex"
            ref={calculatorRef}
        >

            <CalulatorNormalBody
                calculatorRef={calculatorRef}
                setCalculatorHistory={setCalculatorHistory}
                isCalulatorMenuVisible={isCalulatorMenuVisible}
                setIsCalulatorMenuVisible={setIsCalulatorMenuVisible}
                isHistoryPaneVisible={isHistoryPaneVisible}
                setIsHistoryPaneVisible={setIsHistoryPaneVisible}
                startDragging={startDragging}
            />

            {isHistoryPaneVisible
                &&
                <CalculatorNormalHistory
                    calculatorRef={calculatorRef}
                    calculatorHistory={calculatorHistory}
                    startDragging={startDragging}
                />}

        </ResizableContainer >
    )
}

export default CalculatorNormalMain