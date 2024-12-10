import { unitsDetailsList } from "../../constants/units-converter-constants"
import { currentGroupColorDetailsType, GroupType } from "../../types"

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
    currentGroupColorDetails
}: {
    currentGroupColorDetails: currentGroupColorDetailsType[]
}) => {
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
    return (
        <>
            {unitsDetailsList.map(item => {
                if (item.category === currentCategory) {
                    return item.metricSystemList.map(metrics =>
                        <button
                            key={item.category + metrics.metricSystemName + groupType}
                            className={`basis-full p-1  ${currentMetricSystem === metrics.metricSystemName ? "bg-blue-500" : "bg-gray-700"}`}
                            value={metrics.metricSystemName}
                        >
                            {metrics.metricSystemName}
                        </button>
                    )
                }
            })}
        </>
    )
}


export const UnitNameButtons = ({
    currentCategory,
    currentMetricSystem,
    currentUnitShortForm,
    unitShortFormList,
    groupType,
}: {
    currentCategory: string,
    currentMetricSystem: string,
    currentUnitShortForm: string,
    unitShortFormList: (string | null)[],
    groupType: GroupType,
}) => {
    return (
        <>
            {unitsDetailsList.map(item => {
                if (item.category === currentCategory) {

                    return item.metricSystemList.map(metrics => {
                        if (metrics.metricSystemName === currentMetricSystem) {
                            return metrics.unitsList.map((units) => (
                                <button
                                    key={item.category + metrics.metricSystemName + units.unitName + units.shortForm + groupType}
                                    className={`w-full h-full text-left p-2 disabled:bg-gray-500  disabled:cursor-not-allowed ${currentUnitShortForm === units.shortForm ? "bg-teal-300 disabled:bg-teal-300" : "bg-gray-300"}`}
                                    value={`${units.unitName}:${units.shortForm}`}
                                    disabled={unitShortFormList.includes(units.shortForm)}
                                    children={`${units.unitName} (${units.shortForm})`}
                                />
                            ))
                        }
                    }

                    )
                }
            })}
        </>
    )
}