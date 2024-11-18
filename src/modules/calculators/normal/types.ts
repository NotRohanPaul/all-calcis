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