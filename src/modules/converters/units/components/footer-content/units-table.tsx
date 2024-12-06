import { MouseEvent, } from "react"
import { unitsDetailsList } from "../../constants/units-converter"
import { useUnitConverterDispatchContext, useUnitConverterStateContext } from "../../context/consumer"
import { UnitDetails } from "../../types";
import { initialFromUnitDetails, initialToUnitDetails } from "../../reducers/reducer";


const UnitsTable = ({
    inputType,
}: {
    inputType: "From" | "To",
}) => {
    const converterState = useUnitConverterStateContext();
    const converterDispatch = useUnitConverterDispatchContext();

    const currentFromUnitDetails: UnitDetails = (() => {
        for (const inputGroup of converterState.inputGroupList) {
            if (inputGroup.id === converterState.currentInputGroupId) {
                return inputGroup.fromUnitsDetails;
            }
        }
        return initialFromUnitDetails;
    })();

    const currentToUnitDetails: UnitDetails = (() => {
        for (const inputGroup of converterState.inputGroupList) {
            if (inputGroup.id === converterState.currentInputGroupId) {
                for (const toInfo of inputGroup.toInfoList) {
                    if (toInfo.id === inputGroup.currentToInfoId) {
                        return toInfo.toUnitsDetails

                    }
                }
            }
        }

        return initialToUnitDetails;
    })();

    const currentUnitDetails = inputType === "From" ? currentFromUnitDetails : currentToUnitDetails;

    const checkIsUnitSame = (unitName: string) => {
        if (inputType === "From" && currentToUnitDetails.unitName === unitName)
            return true;

        if (inputType === "To" && currentFromUnitDetails.unitName === unitName)
            return true;

        return false;
    }

    const handleButtonClick = (e: MouseEvent, buttonType: "category" | "metricSystemName" | "unit") => {
        const target = e.target as HTMLButtonElement
        if (target.tagName !== "BUTTON") return;
        const value = target.value;

        if (inputType === "From") {
            converterDispatch({
                type: "SET_FROM_UNIT_DETAILS",
                payload: {
                    buttonType,
                    value: value
                }
            })
        }

        if (inputType === "To") {
            converterDispatch({
                type: "SET_TO_UNIT_DETAILS",
                payload: {
                    buttonType,
                    value: value
                }
            })

        }
    }

    return (
        <section className="w-1/2 flex flex-col gap-2">
            <header className="h-[30%] flex flex-col">
                <p className="h-[50%] self-center text-xl font-bold p-2">
                    {inputType}
                </p>

                <div className="w-full h-[50%] flex flex-nowrap gap-1 p-1 grow-0 shrink-0 bg-black text-white overflow-auto"
                    onClick={(e) => handleButtonClick(e, "metricSystemName")}

                >
                    {unitsDetailsList.map(item => {
                        if (item.category === currentUnitDetails.category || currentUnitDetails.category === null) {
                            return item.metricSystemList.map(metrics =>
                                <button
                                    key={item.category + metrics.metricSystemName + inputType}
                                    className={`basis-full p-1  ${currentUnitDetails.metricSystemName === metrics.metricSystemName ? "bg-blue-500" : "bg-gray-700"}`}
                                    value={metrics.metricSystemName}
                                >
                                    {metrics.metricSystemName}
                                </button>
                            )
                        }
                    })}
                </div>
            </header>

            <main className="h-[70%] flex gap-1 bg-orange-400 p-1">
                <div className="w-[30%] flex flex-col justify-between gap-2 text-white overflow-auto"
                    onClick={(e) => handleButtonClick(e, "category")}
                >
                    {
                        unitsDetailsList.map(item => (
                            <button
                                key={item.category + inputType}
                                className={`h-full p-2 bg-red-500 cursor-pointer ${item.category === currentUnitDetails.category && "bg-white text-black"}`}
                                value={item.category}
                            >
                                {item.category}
                            </button>
                        ))
                    }
                </div>

                <div className="w-[70%] flex flex-col bg-gray-300"
                    onClick={(e) => handleButtonClick(e, "unit")}
                >
                    {unitsDetailsList.map(item => {
                        if (item.category === currentUnitDetails.category) {

                            return item.metricSystemList.map(metrics => {
                                if (metrics.metricSystemName === currentUnitDetails.metricSystemName) {
                                    return metrics.unitsList.map((units) => (
                                        <button
                                            key={item.category + metrics.metricSystemName + units.unitName}
                                            className={`w-full text-left p-2 disabled:bg-black disabled:bg-opacity-30 disabled:cursor-not-allowed ${currentUnitDetails.unitName === units.unitName && currentUnitDetails.unitShortForm === units.shortForm ? "bg-teal-300" : ""}`}
                                            value={`${units.unitName}:${units.shortForm}`}
                                            disabled={checkIsUnitSame(units.unitName)}
                                            children={`${units.unitName} (${units.shortForm})`}
                                        />
                                    ))
                                }
                            }

                            )
                        }
                    })}
                </div>
            </main>

        </section >

    )
}

export default UnitsTable