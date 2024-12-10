import { useState, } from "react"
import { unitsDetailsList } from "../../constants/units-converter-constants"
import { useUnitConverterDispatchContext, useUnitConverterStateContext } from "../../context/consumer"
import { getCurrentGroupColorDetails, getInputGroupUnitsDetails } from "../../utils/converter-utils";
import { currentGroupColorDetailsType, GroupType } from "../../types";
import { CurrentGroupButtons, MetrictSystemButtons, UnitNameButtons } from "./footer-button-components";


export const FooterUnitsTable = ({
    groupType,
    currentCategory,
}: {
    groupType: GroupType,
    currentCategory: string,
}) => {
    const converterState = useUnitConverterStateContext();
    const converterDispatch = useUnitConverterDispatchContext();

    const [currentMetricSystem, setCurrentMetricSystem] =
        useState<string>(unitsDetailsList[0].metricSystemList[0].metricSystemName);
    const [currentUnitShortForm, setCurrentUnitShortForm] =
        useState<string>(unitsDetailsList[0].metricSystemList[0].unitsList[0].shortForm);

    const unitShortFormList = getInputGroupUnitsDetails(converterState, "unitShortForm");
    const currentGroupColorDetails: currentGroupColorDetailsType[] = getCurrentGroupColorDetails(converterState, groupType);

    const handleGroupClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLButtonElement;
        if (target.tagName !== "BUTTON") return;
        const { groupId, selectedGroupId } = target.dataset;
        if (!groupId || groupId === selectedGroupId) return;
        converterDispatch({
            type: "SET_SELECTED_GROUP_ID",
            payload: { groupType, groupId },
        });
    };

    const handleMetricSystemClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLButtonElement;
        if (target.tagName === "BUTTON") {
            setCurrentMetricSystem(target.value);
        }
    };

    const handleUnitClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLButtonElement;
        if (target.tagName === "BUTTON") {
            const [unitName, unitShortForm] = target.value.split(":");
            setCurrentUnitShortForm(unitShortForm);
            converterDispatch({
                type: "SET_INPUT_UNIT_DETAILS",
                payload: {
                    groupType,
                    inputGroupCategory: currentCategory,
                    metricSystemName: currentMetricSystem,
                    unitName,
                    unitShortForm,
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
                    onClick={handleGroupClick}
                    children={<CurrentGroupButtons currentGroupColorDetails={currentGroupColorDetails} />}
                />
                <div
                    className="w-full h-[40%] flex flex-nowrap gap-1 p-1 grow-0 shrink-0 bg-black text-white overflow-auto"
                    onClick={handleMetricSystemClick}
                    children={<MetrictSystemButtons
                        currentCategory={currentCategory}
                        currentMetricSystem={currentMetricSystem}
                        groupType={groupType} />}
                />

            </header>

            <main className="h-full flex gap-1 bg-orange-400 p-1 overflow-hidden">
                <div
                    className="w-full h-full flex flex-col gap-1 overflow-auto"
                    onClick={handleUnitClick}
                    children={<UnitNameButtons
                        currentCategory={currentCategory}
                        currentMetricSystem={currentMetricSystem}
                        currentUnitShortForm={currentUnitShortForm}
                        unitShortFormList={unitShortFormList}
                        groupType={groupType} />}
                />
            </main>

        </section >

    )
}
