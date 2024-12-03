import { UnitsDetailsType } from "../types";

export const unitsDetailsList: UnitsDetailsType = [
    {
        category: "Length",
        metricSystemList: [
            {
                metricSystemName: "Metric",
                unitsList: [
                    { unitName: "meter", shortForm: "m" },
                    { unitName: "kilometer", shortForm: "km" },
                    { unitName: "centimeter", shortForm: "cm" }
                ]
            },
            {
                metricSystemName: "US",
                unitsList: [
                    { unitName: "inch", shortForm: "in" },
                    { unitName: "foot", shortForm: "ft" },
                    { unitName: "yard", shortForm: "yd" }
                ]
            }
        ]
    },
    {
        category: "Weight",
        metricSystemList: [
            {
                metricSystemName: "Metric",
                unitsList: [
                    { unitName: "gram", shortForm: "g" },
                    { unitName: "kilogram", shortForm: "kg" },
                    { unitName: "milligram", shortForm: "mg" }
                ]
            },
            {
                metricSystemName: "US",
                unitsList: [
                    { unitName: "ounce", shortForm: "oz" },
                    { unitName: "pound", shortForm: "lb" },
                    { unitName: "stone", shortForm: "st" }
                ]
            }
        ]
    },
    {
        category: "Area",
        metricSystemList: [
            {
                metricSystemName: "Metric",
                unitsList: [
                    { unitName: "square meter", shortForm: "m²" },
                    { unitName: "hectare", shortForm: "ha" },
                    { unitName: "square kilometer", shortForm: "km²" }
                ]
            },
            {
                metricSystemName: "US",
                unitsList: [
                    { unitName: "square inch", shortForm: "in²" },
                    { unitName: "square foot", shortForm: "ft²" },
                    { unitName: "acre", shortForm: "ac" }
                ]
            }
        ]
    },
    {
        category: "Volume",
        metricSystemList: [
            {
                metricSystemName: "Metric",
                unitsList: [
                    { unitName: "liter", shortForm: "L" },
                    { unitName: "milliliter", shortForm: "mL" },
                    { unitName: "cubic meter", shortForm: "m³" }
                ]
            },
            {
                metricSystemName: "US",
                unitsList: [
                    { unitName: "fluid ounce", shortForm: "fl oz" },
                    { unitName: "gallon", shortForm: "gal" },
                    { unitName: "cubic inch", shortForm: "in³" }
                ]
            }
        ]
    }
];
