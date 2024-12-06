import { useUnitConverterDispatchContext, useUnitConverterStateContext } from "../../context/consumer"
import { Plus } from "lucide-react"
import { InputGroupType, } from "../../types"
import UnitInput from "./unit-input"

export const InputGroup = ({
    value,
}: {
    value: InputGroupType,
}) => {
    const converterState = useUnitConverterStateContext()
    const converterDispatch = useUnitConverterDispatchContext()

    return (
        <section className="w-fit h-fit relative group/container flex flex-col gap-2 p-2 hover:bg-gray-400"
            onClick={() => converterDispatch({
                type: "SET_CURRENT_INPUT_GROUP",
                payload: {
                    id: value.id
                }
            })}
        >
            <span className="text-sm absolute top-[2.7rem] -left-1 z-10 -translate-y-1/2 flex items-center justify-center bg-gray-500 group-hover/container:bg-gray-400"
                children={value.id.slice(0, 3)}
            />

            <button className="absolute top-[2.7rem] right-1 z-10 -translate-y-1/2 bg-gray-800 cursor-pointer"
                title="Add Input Group"
                aria-label="Add Input Group"
                onClick={() => converterDispatch({ type: "ADD_INPUT_GROUP" })}
                hidden={converterState.inputGroupList.length >= 5 || value.id !== converterState.currentInputGroupId}
                aria-hidden={converterState.inputGroupList.length >= 5 || value.id !== converterState.currentInputGroupId}
                children={<Plus size={15} />}
            />

            <UnitInput
                inputType="From"
                value={value.fromValue}
                unitDetails={value.fromUnitsDetails} />

            <div
                className="w-full flex flex-col gap-2"
            >
                {value.toInfoList.map((toInfo) => (
                    <div
                        key={toInfo.id}
                        className="relative"
                        onClick={() => converterDispatch({
                            type: "SET_CURRENT_TO_INFO",
                            payload: {
                                id: toInfo.id
                            }
                        })}
                    >
                        <button className="absolute bottom-[.5rem] left-0 z-10 bg-gray-800 cursor-pointer"
                            title="Add Input To"
                            aria-label="Add Input To"
                            onClick={() => converterDispatch({ type: "ADD_TO_INFO" })}
                            hidden={value.toInfoList.length >= 5 || value.id !== converterState.currentInputGroupId}
                            aria-hidden={false}
                            children={<Plus size={15} />}
                        />
                        <span className="text-sm absolute top-[.6rem] left-[1rem]  z-10 flex items-center justify-center bg-gray-500 group-hover/container:bg-gray-400"
                            children={toInfo.id.slice(0, 3)}
                        />
                        <UnitInput
                            inputType="To"
                            value={toInfo.toValue}
                            unitDetails={toInfo.toUnitsDetails}
                        />
                    </div>
                ))}
            </div>

            <div className="w-full h-full absolute left-0 top-0 flex flex-col py-6 px-3">
                {
                    value.toInfoList.map((toInfo, index) => (
                        <div
                            key={toInfo.id}
                            className="w-full h-full border border-white"
                            style={{
                                borderTop: index === 0 ? "" : "0",
                            }}
                        />
                    ))
                }
            </div>

        </section >
    )
}

