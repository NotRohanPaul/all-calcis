import { useMemo } from "react"
import { unitsDetailsList } from "../../constants/units-converter-constants"
import { useUnitConverterStateContext } from "../../context/consumer"
import { currentGroupColorDetailsType, GroupType } from "../../types"
import { getCurrentGroupColorDetails, getInputGroupUnitsDetails } from "../../utils/converter-utils"

export const CategoryButtons = ({
    currentCategory,
}: {
    currentCategory: string
}) => {
    return (
        <>
            {
                unitsDetailsList.map(item => (
                    <button
                        key={item.category}
                        className={`h-full font-semibold  ${item.category === currentCategory ? "bg-white text-orange-500 outline outline-orange-500" : "bg-orange-500  cursor-pointer"}`}
                        value={item.category}
                    >
                        {item.category}
                    </button>
                ))
            }
        </>
    )
}


export const CurrentGroupButtons = ({
    groupType
}: {
    groupType: GroupType
}) => {
    const converterState = useUnitConverterStateContext()
    const currentGroupColorDetails: currentGroupColorDetailsType[] =
        useMemo(
            () => getCurrentGroupColorDetails(converterState, groupType),
            [converterState, groupType]
        );

    return (
        <>
            {
                currentGroupColorDetails.map(({ groupId, groupColor, selectedGroupId }) => (
                    <button
                        key={groupId}
                        className="size-3 rounded-full focus-visible:bg-blue-500"
                        value={groupId}
                        data-group-id={groupId}
                        data-group-color={groupColor}
                        data-selected-group-id={selectedGroupId}
                        style={{
                            backgroundColor: groupColor,
                            outline: groupId === selectedGroupId ? "2px solid white" : "",
                        }}
                        aria-label={groupColor}
                    />
                ))
            }
        </>
    )
}

export const MetrictSystemButtons = ({
    currentCategory,
    currentMetricSystem,
    groupType,
}: {
    currentCategory: string,
    currentMetricSystem: string,
    groupType: GroupType,
}) => {
    const filteredCategory =
        useMemo(
            () => unitsDetailsList.find(item => item.category === currentCategory),
            [currentCategory]
        );

    if (!filteredCategory) return null;

    return (
        <>
            {
                filteredCategory.metricSystemList.map(metrics => (
                    <button
                        key={`${filteredCategory.category}-${metrics.metricSystemName}-${groupType}`}
                        className={`basis-full p-1  ${currentMetricSystem === metrics.metricSystemName ? "bg-blue-500" : "bg-gray-700"}`}
                        value={metrics.metricSystemName}
                    >
                        {metrics.metricSystemName}
                    </button>
                ))}

        </>
    )
}


export const UnitNameButtons = ({
    currentCategory,
    currentMetricSystem,
    currentUnitShortForm,
    groupType,
}: {
    currentCategory: string,
    currentMetricSystem: string,
    currentUnitShortForm: string,
    groupType: GroupType,
}) => {
    const converterState = useUnitConverterStateContext()
    const unitShortFormList = useMemo(() => getInputGroupUnitsDetails(converterState, "unitShortForm"), [converterState]);

    const filteredUnits = useMemo(() => {
        const category = unitsDetailsList.find(item => item.category === currentCategory);
        if (!category) return [];
        const metricSystem = category.metricSystemList.find(m => m.metricSystemName === currentMetricSystem);
        return metricSystem ? metricSystem.unitsList : [];
    }, [currentCategory, currentMetricSystem]);

    return (
        <>
            {
                filteredUnits.map(units => (
                    <button
                        key={`${currentCategory}-${currentMetricSystem}-${units.unitName}-${groupType}`}
                        className={`w-full h-full text-left p-2 disabled:bg-gray-500  disabled:cursor-not-allowed ` +
                            `${currentUnitShortForm === units.shortForm ? "bg-teal-300 disabled:bg-teal-300" : "bg-gray-300"}`}
                        value={`${units.unitName}:${units.shortForm}`}
                        data-unit-name={units.unitName}
                        data-unit-short-form={units.shortForm}
                        data-unit-multiplier={units.multiplier}
                        disabled={unitShortFormList.includes(units.shortForm)}
                        children={`${units.unitName} (${units.shortForm})`}
                    />
                ))
            }
        </>
    )
}