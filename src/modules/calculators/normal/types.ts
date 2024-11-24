export type ButtonProps = {
    name: string;
    symbol: string;
    type: "operand" | "operator" | "special";
};


export interface CalculatorHistoryType {
    id: number
    expression: string,
    result: string,
    timestamp: string
}

export type CalculatorAction =
    | {
        type: "ADD_OPERAND",
        payload: {
            inputSymbol: string;
        }

    }
    | {
        type: "ADD_OPERATOR",
        payload: {
            inputSymbol: string;
        }
    }
    | { type: "ADD_DECIMAL" }
    | { type: "ADD_PERCENTAGE" }
    | { type: "CHANGE_TYPE" }
    | { type: "CLEAR_ALL" }
    | { type: "CLEAR_ENTRY" }
    | { type: "EVALUATE" }
    | { type: "TOGGLE_CALC_MENU" }
    | { type: "TOGGLE_HISTORY_PANE" }
    | {
        type: "SET_HISTORY_PANE_POSITION",
        payload: {
            position: "left" | "right"
        }
    }


export type CalculatorState = {
    mainDisplay: string;
    topDisplay: string;
    bottomDisplay: string;
    enteredInfo: {
        operands: string[];
        operators: string[];
        operandsCurrentIndex: number;
    };
    isCalculatorMenuVisible: boolean,
    history: CalculatorHistoryType[];
    isHistoryPaneVisible: boolean,
    historyPanePosition: "left" | "right"
};