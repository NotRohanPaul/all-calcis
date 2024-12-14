import {
    ChangeEvent,
    MouseEventHandler,
    RefObject,
    TouchEventHandler,
    useRef,
    useState,
} from "react";
import { useOutletContext } from "react-router-dom";

import ResizableContainer from "@containers/resizable-container/main";

import useContainerDrag from "@hooks/useContainerDrag";
import useResetOnWindowResize from "@hooks/useResetOnWindowResize";
import NumericInputBox from "@components/numeric-input-box";
import useMaximizeMinimizeContainer from "@hooks/useMaximizeMinimizeContainer";
import { Maximize, Minimize } from "lucide-react";


const CalculatorBmiMain = () => {
    const calculatorRef = useRef<HTMLDivElement>(null)
    const pageRef: RefObject<HTMLDivElement> = useOutletContext();

    useResetOnWindowResize(calculatorRef);
    const startDragging = useContainerDrag(calculatorRef, pageRef);
    const [handleMaximize, handleMinimize] = useMaximizeMinimizeContainer(calculatorRef, pageRef)

    const [enteredHeight, setEnteredHeight] = useState<number>(0);
    const [enteredWeight, setEnteredWeight] = useState<number>(0);

    const [calculatedBmi, setCalculatedBmi] = useState<number>(0);

    const handleChange = (e: ChangeEvent, type: "height" | "weight") => {
        const target = e.target as HTMLInputElement;
        const value = target.value.replace(/[^0-9]/g, "");

        setCalculatedBmi(0);

        if (type === "height") {
            if (value.length > 3) return;

            setEnteredHeight(+value);
            return;
        }

        if (type === "weight") {
            if (value.length > 3) return;

            setEnteredWeight(+value)
            return;
        }
    }

    const handleClick = () => {
        if ((enteredHeight < 50 || enteredHeight > 300)) return;
        if ((enteredWeight < 25 || enteredWeight > 150)) return;

        const bmi = +(enteredWeight / (enteredHeight / 100) ** 2).toFixed(1)
        setCalculatedBmi(bmi);
    }

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
            className={`absolute w-[400px] h-[500px] bg-gray-500 border-white border-2 flex`}
            ref={calculatorRef}
        >
            <section className="min-w-[200px] w-full h-full flex flex-col select-none overflow-hidden">
                <header className="flex h-10 p-2 bg-indigo-950 ">
                    <div className="w-full hover:cursor-move"
                        onMouseDown={startDragging as MouseEventHandler}
                        onTouchStart={startDragging as TouchEventHandler}
                    >
                        <p>BMI Calci</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="cursor-pointer"
                            onClick={handleMinimize}
                        >
                            <Minimize size={20} />
                        </button>
                        <button
                            className="cursor-pointer"
                            onClick={handleMaximize}
                        >
                            <Maximize size={20} />
                        </button>
                    </div>
                </header>
                <main className="w-full h-[30%] flex flex-col gap-2 text-2xl p-2  select-text">
                    <div className="flex">
                        <label className="mr-2">
                            Height in cm:
                        </label>
                        <NumericInputBox
                            className="w-14"
                            value={enteredHeight || ""}
                            onChange={(e) => handleChange(e, "height")}
                            placeholder="000"
                            maxLength={3}
                        />
                    </div>
                    <div className="flex">
                        <label className="mr-2">
                            Weight in kg:
                        </label>
                        <NumericInputBox
                            className="w-14"
                            value={enteredWeight || ""}
                            onChange={(e) => handleChange(e, "weight")}
                            placeholder="00"
                            maxLength={3}
                        />
                    </div>
                    <div className="w-full flex items-center">
                        <button className="bg-orange-200 text-black px-2 py-1 select-none hover:bg-orange-300 active:bg-orange-500"
                            onClick={handleClick}
                        >
                            Calculate
                        </button>
                    </div>
                </main>
                <footer className="w-full h-full p-2 bg-orange-200 text-black">
                    {
                        calculatedBmi !== 0
                        &&
                        <p className="font-semibold text-2xl">{calculatedBmi}</p>
                    }
                </footer>
            </section >
        </ResizableContainer >
    )
}

export default CalculatorBmiMain