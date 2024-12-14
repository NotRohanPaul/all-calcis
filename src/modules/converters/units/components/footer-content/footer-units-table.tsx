import { useState, } from "react"
import { unitsDetailsList } from "../../constants/units-converter-constants"
import {
    useUnitConverterDispatchContext,
} from "../../context/consumer"
import {
    GroupType
} from "../../types";
import {
    CurrentGroupButtons,
    MetrictSystemButtons,
    UnitNameButtons
} from "./footer-button-components";


export const FooterUnitsTable = ({
    groupType,
    currentCategory,
}: {
    groupType: GroupType,
    currentCategory: string,
}) => {
    const converterDispatch = useUnitConverterDispatchContext();

    const [currentMetricSystem, setCurrentMetricSystem] =
        useState<string>(unitsDetailsList[0].metricSystemList[0].metricSystemName);
    const [currentUnitShortForm, setCurrentUnitShortForm] =
        useState<string>(unitsDetailsList[0].metricSystemList[0].unitsList[0].shortForm);

    const handleClick = (
        e: React.MouseEvent<HTMLDivElement>,
        buttonType: "Group" | "MetricSystem" | "Unit"
    ) => {
        const target = e.target as HTMLButtonElement;
        if (target.tagName !== "BUTTON" && !("value" in target)) return;

        if (buttonType === "Group") {
            const { groupId, selectedGroupId } = target.dataset;
            if (!groupId || groupId === selectedGroupId) return;
            converterDispatch({
                type: "SET_SELECTED_GROUP_ID",
                payload: { groupType, groupId },
            });
        }

        if (buttonType === "MetricSystem") {
            setCurrentMetricSystem(target.value);
        }


        if (buttonType === "Unit") {
            if (target.dataset.unitName === undefined ||
                target.dataset.unitShortForm === undefined ||
                target.dataset.unitMultiplier === undefined)
                return;


            const { unitName, unitShortForm, unitMultiplier } = target.dataset;
            setCurrentUnitShortForm(unitShortForm);
            converterDispatch({
                type: "SET_GROUP_UNIT_DETAILS",
                payload: {
                    groupType,
                    inputGroupCategory: currentCategory,
                    metricSystemName: currentMetricSystem,
                    unitName,
                    unitShortForm,
                    unitMultiplier: +unitMultiplier
                }
            })
        }
    };

    return (
        <section className="w-1/2 flex flex-col gap-2">
            <header className="h-[40%] flex flex-col gap-2">
                <p className="self-center text-xl font-bold">
                    {groupType === "inputGroup" ? "From" : "To"}
                </p>

                <div
                    className="self-center flex gap-4 bg-orange-400 p-2 rounded-full"
                    onClick={(e) => handleClick(e, "Group")}
                    children={<CurrentGroupButtons groupType={groupType} />}
                />
                <div
                    className="w-full h-[40%] flex flex-nowrap gap-1 p-1 grow-0 shrink-0 bg-black text-white overflow-auto"
                    onClick={(e) => handleClick(e, "MetricSystem")}
                    children={<MetrictSystemButtons
                        currentCategory={currentCategory}
                        currentMetricSystem={currentMetricSystem}
                        groupType={groupType} />}
                />

            </header>

            <main className="h-full flex gap-1 bg-orange-400 p-1 overflow-hidden">
                <div
                    className="w-full h-full flex flex-col gap-1 overflow-auto"
                    onClick={(e) => handleClick(e, "Unit")}
                    children={<UnitNameButtons
                        currentCategory={currentCategory}
                        currentMetricSystem={currentMetricSystem}
                        currentUnitShortForm={currentUnitShortForm}
                        groupType={groupType} />}
                />
            </main>

        </section >

    )
}
