import { Dispatch, SetStateAction } from "react"

const CalculatorMenu = ({
    isHistoryPaneVisible,
    setIsHistoryPaneVisible
}: {
    isHistoryPaneVisible: boolean
    setIsHistoryPaneVisible: Dispatch<SetStateAction<boolean>>
}) => {

    return (
        <ul className="absolute top-10 right-0 z-10  bg-gray-500 transition-[width] duration-1000">
            <li className="p-2 cursor-pointer hover:bg-gray-700"
                onClick={() => setIsHistoryPaneVisible(!isHistoryPaneVisible)}
            >
                Toogle History Pane
            </li>
            <li
                className="p-2 cursor-pointer hover:bg-gray-700"
            >
                Settings
            </li>
        </ul>
    )
}

export default CalculatorMenu