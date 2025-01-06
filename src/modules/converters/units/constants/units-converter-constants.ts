import { UnitsDetailsType } from "../types";

export const MAX_INPUT_GROUP_LIMIT = 5;
export const MAX_TO_GROUP_LIMIT = 5;
export const DEFAULT_COLORS = {
    inputGroup: ["teal", "tomato", "royalblue", "gold", "deeppink"],
    toGroup: ["lime", "aqua", "darkviolet", "khaki", "lightpink"],
} as const;

export const unitsDetailsList: UnitsDetailsType = [
    {
        category: "Length",
        multiplierBaseUnit: "meter",
        metricSystemList: [
            {
                metricSystemName: "Metric/SI",
                unitsList: [
                    { unitName: "meter", shortForm: "m", multiplier: 1 },
                    { unitName: "kilometer", shortForm: "km", multiplier: 1000 },
                    { unitName: "centimeter", shortForm: "cm", multiplier: 0.01 },
                    { unitName: "millimeter", shortForm: "mm", multiplier: 0.001 },
                    { unitName: "micrometer", shortForm: "µm", multiplier: 1e-6 },
                    { unitName: "nanometer", shortForm: "nm", multiplier: 1e-9 }
                ]
            },
            {
                metricSystemName: "Imperial/U.S.",
                unitsList: [
                    { unitName: "inch", shortForm: "in", multiplier: 0.0254 },
                    { unitName: "foot", shortForm: "ft", multiplier: 0.3048 },
                    { unitName: "yard", shortForm: "yd", multiplier: 0.9144 },
                    { unitName: "mile", shortForm: "mi", multiplier: 1609.34 },
                    { unitName: "nautical mile", shortForm: "NM", multiplier: 1852 },
                    { unitName: "mil", shortForm: "mil", multiplier: 0.0000254 }
                ]
            }
        ]
    },
    {
        category: "Weight",
        multiplierBaseUnit: "gram",
        metricSystemList: [
            {
                metricSystemName: "Metric/SI",
                unitsList: [
                    { unitName: "gram", shortForm: "g", multiplier: 1 },
                    { unitName: "kilogram", shortForm: "kg", multiplier: 1000 },
                    { unitName: "milligram", shortForm: "mg", multiplier: 0.001 },
                    { unitName: "microgram", shortForm: "µg", multiplier: 1e-6 },
                    { unitName: "tonne", shortForm: "t", multiplier: 1e6 }
                ]
            },
            {
                metricSystemName: "Imperial/U.S.",
                unitsList: [
                    { unitName: "ounce", shortForm: "oz", multiplier: 28.3495 },
                    { unitName: "pound", shortForm: "lb", multiplier: 453.592 },
                    { unitName: "stone", shortForm: "st", multiplier: 6350.29 },
                    { unitName: "short ton", shortForm: "ton (US)", multiplier: 907184.74 },
                    { unitName: "long ton", shortForm: "ton (UK)", multiplier: 1016046.91 }
                ]
            }
        ]
    },
    {
        category: "Area",
        multiplierBaseUnit: "square meter",
        metricSystemList: [
            {
                metricSystemName: "Metric/SI",
                unitsList: [
                    { unitName: "square meter", shortForm: "m²", multiplier: 1 },
                    { unitName: "hectare", shortForm: "ha", multiplier: 10000 },
                    { unitName: "square kilometer", shortForm: "km²", multiplier: 1e6 },
                    { unitName: "square centimeter", shortForm: "cm²", multiplier: 0.0001 },
                    { unitName: "square millimeter", shortForm: "mm²", multiplier: 1e-6 }
                ]
            },
            {
                metricSystemName: "Imperial/U.S.",
                unitsList: [
                    { unitName: "square inch", shortForm: "in²", multiplier: 0.00064516 },
                    { unitName: "square foot", shortForm: "ft²", multiplier: 0.092903 },
                    { unitName: "square yard", shortForm: "yd²", multiplier: 0.836127 },
                    { unitName: "acre", shortForm: "ac", multiplier: 4046.86 },
                    { unitName: "square mile", shortForm: "mi²", multiplier: 2.59e6 }
                ]
            }
        ]
    },
    {
        category: "Volume",
        multiplierBaseUnit: "liter",
        metricSystemList: [
            {
                metricSystemName: "Metric/SI",
                unitsList: [
                    { unitName: "liter", shortForm: "L", multiplier: 1 },
                    { unitName: "milliliter", shortForm: "mL", multiplier: 0.001 },
                    { unitName: "cubic meter", shortForm: "m³", multiplier: 1000 },
                    { unitName: "cubic centimeter", shortForm: "cm³", multiplier: 0.001 },
                    { unitName: "microliter", shortForm: "µL", multiplier: 1e-6 }
                ]
            },
            {
                metricSystemName: "Imperial/U.S.",
                unitsList: [
                    { unitName: "fluid ounce", shortForm: "fl oz", multiplier: 0.0295735 },
                    { unitName: "cup", shortForm: "cup", multiplier: 0.236588 },
                    { unitName: "pint", shortForm: "pt", multiplier: 0.473176 },
                    { unitName: "quart", shortForm: "qt", multiplier: 0.946353 },
                    { unitName: "gallon", shortForm: "gal", multiplier: 3.78541 }
                ]
            }
        ]
    },
    {
        category: "Computer",
        multiplierBaseUnit: "byte",
        metricSystemList: [
            {
                metricSystemName: "Binary",
                unitsList: [
                    { unitName: "bit", shortForm: "b", multiplier: 1 / 8 },
                    { unitName: "byte", shortForm: "B", multiplier: 1 },
                    { unitName: "kibibyte", shortForm: "KiB", multiplier: 1024 },
                    { unitName: "mebibyte", shortForm: "MiB", multiplier: 1024 ** 2 },
                    { unitName: "gibibyte", shortForm: "GiB", multiplier: 1024 ** 3 },
                    { unitName: "tebibyte", shortForm: "TiB", multiplier: 1024 ** 4 },
                    { unitName: "pebibyte", shortForm: "PiB", multiplier: 1024 ** 5 }
                ]
            },
            {
                metricSystemName: "Decimal",
                unitsList: [
                    { unitName: "kilobyte", shortForm: "kB", multiplier: 1000 },
                    { unitName: "megabyte", shortForm: "MB", multiplier: 1e6 },
                    { unitName: "gigabyte", shortForm: "GB", multiplier: 1e9 },
                    { unitName: "terabyte", shortForm: "TB", multiplier: 1e12 },
                    { unitName: "petabyte", shortForm: "PB", multiplier: 1e15 }
                ]
            }
        ]
    }

];

