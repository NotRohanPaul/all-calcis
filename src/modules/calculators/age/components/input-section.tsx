import NumericInputBox from "@components/input-box";
import { useCalculatorDispatch, useCalculatorState } from "../context/consumer";

const InputSection = () => {
    const ageCalculatorState = useCalculatorState()
    const dispatchAgeCalculator = useCalculatorDispatch()

    return (
        <>
            <div className="flex">
                <label className="mr-2">
                    Age on:
                </label>
                <div className="flex gap-2">
                    <NumericInputBox
                        name="age-on-day"
                        value={ageCalculatorState.ageOnInputs.day || ""}
                        onChange={e => dispatchAgeCalculator({
                            type: "SET_DATE_INPUTS",
                            payload: {
                                type: "ageOn",
                                prop: "day",
                                value: e.target.value,
                            }
                        })}
                    />
                    /
                    <NumericInputBox
                        name="age-on-month"
                        value={ageCalculatorState.ageOnInputs.month || ""}
                        onChange={e => dispatchAgeCalculator({
                            type: "SET_DATE_INPUTS",
                            payload: {
                                type: "ageOn",
                                prop: "month",
                                value: e.target.value,
                            }
                        })}
                    />
                    /
                    <NumericInputBox
                        className="w-16"
                        name="age-on-year"
                        value={ageCalculatorState.ageOnInputs.year || ""}
                        onChange={e => dispatchAgeCalculator({
                            type: "SET_DATE_INPUTS",
                            payload: {
                                type: "ageOn",
                                prop: "year",
                                value: e.target.value,
                            }
                        })}
                        placeholder="0000"
                        maxLength={4}
                    />
                </div>
            </div>
            <div className="flex">
                <label className="mr-2">
                    Date of Birth:
                </label>
                <div className="flex gap-2">
                    <NumericInputBox
                        name="date-of-birth-day"
                        value={ageCalculatorState.dobInputs.day || ""}
                        onChange={e => dispatchAgeCalculator({
                            type: "SET_DATE_INPUTS",
                            payload: {
                                type: "dob",
                                prop: "day",
                                value: e.target.value,
                            }
                        })}
                    />
                    /
                    <NumericInputBox
                        name="date-of-birth-month"
                        value={ageCalculatorState.dobInputs.month || ""}
                        onChange={e => dispatchAgeCalculator({
                            type: "SET_DATE_INPUTS",
                            payload: {
                                type: "dob",
                                prop: "month",
                                value: e.target.value,
                            }
                        })}
                    />
                    /
                    <NumericInputBox
                        className="w-16"
                        name="date-of-birth-year"
                        value={ageCalculatorState.dobInputs.year || ""}
                        onChange={e => dispatchAgeCalculator({
                            type: "SET_DATE_INPUTS",
                            payload: {
                                type: "dob",
                                prop: "year",
                                value: e.target.value,
                            }
                        })}
                        placeholder="0000"
                        maxLength={4}
                    />
                </div>
            </div>
            <div className="w-full flex items-center">
                <button className="bg-orange-200 text-black px-2 py-1 select-none hover:bg-orange-300 active:bg-orange-500"
                    onClick={() => dispatchAgeCalculator({ type: "CALCULATE_AGE" })}
                >
                    Calculate
                </button>
            </div>
        </>
    )
}

export default InputSection