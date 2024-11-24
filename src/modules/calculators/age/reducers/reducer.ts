import { AgeCalculatorState, AgeCalculatorAction } from "../types";

const now = new Date;
export const ageCalculatorInitialState: AgeCalculatorState = {
    dobInputs: {
        day: 0,
        month: 0,
        year: 0,
    },
    ageOnInputs: {
        day: now.getDate(),
        month: now.getMonth() + 1,
        year: now.getFullYear(),
    },
    calculatedAge: 0
};

export function ageCalculatorReducer(
    state: AgeCalculatorState,
    action: AgeCalculatorAction
): AgeCalculatorState {
    console.log("Reducer action")
    switch (action.type) {

        case "SET_DATE_INPUTS": {
            const value = action.payload.value.replace(/[^0-9]/g, '');
            if (action.payload.prop === "day") {
                if (value && (parseInt(value) < 1 || parseInt(value) > 31)) {
                    return state;
                }
            } else if (action.payload.prop === "month") {
                if (value && (parseInt(value) < 1 || parseInt(value) > 12)) {
                    return state;
                }
            } else if (action.payload.prop === "year") {
                if (value.length === 4 && (parseInt(value) < 1900 || parseInt(value) > 2100)) {
                    return state;
                }
            }
            console.log(value)


            if (action.payload.type === "dob") {
                return {
                    ...state,
                    dobInputs: {
                        ...state.dobInputs,
                        [action.payload.prop]: +(value || 0)
                    },
                    calculatedAge: 0
                };
            } else if (action.payload.type === "ageOn") {
                return {
                    ...state,
                    ageOnInputs: {
                        ...state.ageOnInputs,
                        [action.payload.prop]: +(value || 0)
                    },
                    calculatedAge: 0
                };
            }

            return state;
        }

        case "CALCULATE_AGE": {
            const dob = state.dobInputs;
            const ageOn = state.ageOnInputs;
            if (dob.day === 0 || dob.month === 0 || dob.year === 0 || dob.year < 1900 || dob.year > 2100 ||
                ageOn.day === 0 || ageOn.month === 0 || ageOn.year === 0 || ageOn.year < 1900 || ageOn.year > 2100
            ) {
                return state;
            }

            const dateDob = new Date(dob.year, dob.month - 1, dob.day);
            const dateAgeOn = new Date(ageOn.year, ageOn.month - 1, ageOn.day);
            { console.log(dateDob, dateAgeOn) }
            let age = dateAgeOn.getFullYear() - dateDob.getFullYear();
            const monthDifference = dateAgeOn.getMonth() - dateDob.getMonth();

            if (
                monthDifference < 0 ||
                (monthDifference === 0 && dateAgeOn.getDate() < dateDob.getDate())
            ) {
                age--;
            }

            if (age <= 0) return state;

            return {
                ...state,
                calculatedAge: age,
            }
        }

        default:
            return state;
    }

}



