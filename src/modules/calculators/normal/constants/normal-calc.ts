import { ButtonProps } from "../types";


export const operandButtons: ButtonProps[] = [
    { name: 'seven', symbol: '7', type: 'operand' },
    { name: 'eight', symbol: '8', type: 'operand' },
    { name: 'nine', symbol: '9', type: 'operand' },
    { name: 'four', symbol: '4', type: 'operand' },
    { name: 'five', symbol: '5', type: 'operand' },
    { name: 'six', symbol: '6', type: 'operand' },
    { name: 'one', symbol: '1', type: 'operand' },
    { name: 'two', symbol: '2', type: 'operand' },
    { name: 'three', symbol: '3', type: 'operand' },
    { name: 'zero', symbol: '0', type: 'operand' }
]

export const operatorButtons: ButtonProps[] = [
    { name: 'divide', symbol: '/', type: 'operator' },
    { name: 'multiply', symbol: 'x', type: 'operator' },
    { name: 'minus', symbol: '-', type: 'operator' },
    { name: 'plus', symbol: '+', type: 'operator' }
]

export const specialButtons: ButtonProps[] = [
    { name: 'clear', symbol: 'C', type: 'special' },
    { name: 'clear entry', symbol: 'CE', type: 'special' },
    { name: 'percentage', symbol: '%', type: 'special' },
    { name: 'change sign', symbol: '+/-', type: 'special' },
    { name: 'point', symbol: '.', type: 'special' },
    { name: 'equal', symbol: '=', type: 'special' }
]

export const buttonLayout: string[] = [
    'C', 'CE', '%', '/',
    '7', '8', '9', 'x',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    '+/-', '0', '.', '='
]

export const allButtons = [...operandButtons, ...operatorButtons, ...specialButtons];

export const orderedButtons: ButtonProps[] = buttonLayout.map(symbol =>
    allButtons.find(button => button.symbol === symbol)!
);