import CalculatorAgeMain from "@modules/calculators/age/main";
import CalculatorBmiMain from "@modules/calculators/bmi/main";
import CalculatorNormalMain from "@modules/calculators/normal/main";

import UnitsConverterMain from "@modules/converters/units/main";

export type IndividualRouteType = {
    path: string;
    fullName: string;
    shortName: string;
    component?: () => JSX.Element;
}

export const calculatorsRoutes: IndividualRouteType[] = [
    {
        path: "/normal",
        fullName: "Normal Calculator",
        shortName: "Normal",
        component: CalculatorNormalMain,
    },
    {
        path: "/age",
        fullName: "Age Calculator",
        shortName: "Age",
        component: CalculatorAgeMain,
    },
    {
        path: "/bmi",
        fullName: "BMI Calculator",
        shortName: "BMI",
        component: CalculatorBmiMain,
    },
]

export const convertersRoutes: IndividualRouteType[] = [
    {
        path: "/units",
        fullName: "Units Converter",
        shortName: "Units",
        component: UnitsConverterMain,
    },
]


export const otherRoutes: IndividualRouteType[] = [
    {
        path: "#",
        fullName: "Other Calcualtor",
        shortName: "Other"
    },
    {
        path: "#",
        fullName: "Other Calcualtor",
        shortName: "Other"
    },
    {
        path: "#",
        fullName: "Other Calcualtor",
        shortName: "Other"
    },
    {
        path: "#",
        fullName: "Other",
        shortName: "Other"
    },
    {
        path: "#",
        fullName: "Other Calcualtor",
        shortName: "Other"
    },
    {
        path: "#",
        fullName: "Other Calcualtor",
        shortName: "Other"
    },
    {
        path: "#",
        fullName: "Other Calcualtor",
        shortName: "Other"
    },
    {
        path: "#",
        fullName: "Other Calcualtor",
        shortName: "Other"
    },
]


export const allRoutes: IndividualRouteType[] = [
    ...calculatorsRoutes,
    ...convertersRoutes,
    ...otherRoutes

]