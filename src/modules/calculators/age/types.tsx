export type DataType = {
    day: number,
    month: number,
    year: number,
}

export type AgeCalculatorState = {
    dobInputs: DataType,
    ageOnInputs: DataType,
    calculatedAge: number
};
export type AgeCalculatorAction =
    | {
        type: "SET_DATE_INPUTS",
        payload: {
            type: "dob" | "ageOn",
            prop: keyof DataType,
            value: string,
        }
    }
    | {
        type: "CALCULATE_AGE",
    }