import { useOutsideClick } from "src/hooks/useOutsideClick"
import { useCalculatorDispatch, } from "../context/consumer"

const CalculatorNormalMenu = () => {
    const CalculatorDispatch = useCalculatorDispatch()
    const menuRef = useOutsideClick<HTMLUListElement>(() => CalculatorDispatch({ type: "TOGGLE_CALC_MENU" }))
    return (
        <ul className="absolute top-11 right-1 z-10  bg-gray-500" onClick={() => CalculatorDispatch({ type: "TOGGLE_CALC_MENU" })}
            ref={menuRef}
        >
            <li className="p-2 cursor-pointer hover:bg-gray-700"
                onClick={() => CalculatorDispatch({ type: "TOGGLE_HISTORY_PANE" })}
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

export default CalculatorNormalMenu