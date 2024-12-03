import { MouseEvent, useState } from "react"
import { unitsDetailsList } from "../../constants/units-converter"


const UnitsTable = ({
    inputType,
}: {
    inputType: "From" | "To",
}) => {
    const [activeCategory, setActiveCategory] = useState<string>(unitsDetailsList[0].category);
    const handleIntialMetricSystem = () => {
        let intialValue = "";
        unitsDetailsList.forEach(items => {
            if (items.category === activeCategory) {
                intialValue = items.metricSystemList[0].metricSystemName;
            }
        })
        return intialValue
    }

    const handleIntialUnit = () => {
        let intialValue = "";
        unitsDetailsList.forEach(items => {
            if (items.category === activeCategory) {
                intialValue = items.metricSystemList[0].unitsList[0].unitName;
            }
        })
        return intialValue
    }
    const [activeMetricSystem, setActiveMetricSystem] =
        useState<string>(handleIntialMetricSystem)
    const [activeUnitName, setActiveUnitName] =
        useState<string>(handleIntialUnit)

    const handleCateogryClick = (e: MouseEvent<HTMLElement>) => {
        const target = e.target as HTMLElement
        if (target.tagName === "BUTTON")
            setActiveCategory((target as HTMLButtonElement).innerText)
    }

    const handleMetricClick = (metricSystemName: string) => {
        setActiveMetricSystem(metricSystemName)
    }

    const handleUnitClick = (unitName: string) => {
        setActiveUnitName(unitName)
    }

    return (
        <section className="w-1/2 flex flex-col gap-2">
            <header className="w-full flex flex-col">
                <p className="self-center text-xl font-bold p-2">
                    {inputType}
                </p>

                <div className="w-full flex flex-nowrap gap-1 p-1 grow-0 shrink-0 bg-black text-white overflow-auto">
                    {unitsDetailsList.map(item => {
                        if (item.category === activeCategory) {
                            return item.metricSystemList.map(metrics =>
                                <button
                                    key={`${item.category + metrics.metricSystemName}`}
                                    className={`basis-full p-1  ${activeMetricSystem === metrics.metricSystemName ? "bg-blue-500" : "bg-gray-700"}`}
                                    value={metrics.metricSystemName}
                                    onClick={() => handleMetricClick(metrics.metricSystemName)}
                                >
                                    {metrics.metricSystemName}
                                </button>
                            )
                        }
                    })}
                </div>
            </header>

            <main className="w-full h-full flex gap-1 bg-orange-400 p-1">
                <div className="w-[30%] flex flex-col justify-between gap-2 text-white overflow-auto"
                    onClick={handleCateogryClick}
                >
                    {
                        unitsDetailsList.map(item => (
                            <button
                                key={item.category}
                                className={`p-2 bg-red-500 cursor-pointer ${item.category === activeCategory && "bg-white text-black"}`}
                                value={item.category}
                            >
                                {item.category}
                            </button>
                        ))
                    }
                </div>

                <div className="w-[70%] bg-gray-300">
                    {unitsDetailsList.map(item => {
                        if (item.category === activeCategory) {

                            return item.metricSystemList.map(metrics => {

                                if (metrics.metricSystemName === activeMetricSystem) {
                                    return metrics.unitsList.map((units) => {

                                        return <button
                                            key={`${item.category + + metrics.metricSystemName + units.unitName}`}
                                            className={`w-full text-left p-2 ${activeUnitName === units.unitName ? "bg-teal-300" : ""}`}
                                            onClick={() => handleUnitClick(units.unitName)}
                                        >
                                            {units.unitName} ({units.shortForm})
                                        </button>
                                    })
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