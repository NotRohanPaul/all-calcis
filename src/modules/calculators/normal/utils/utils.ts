import { operatorButtons } from "../constants/normal-calc";

export const isOperator = (symbol: string) => {
    return !!operatorButtons.find((button) => button.symbol === symbol)
}
