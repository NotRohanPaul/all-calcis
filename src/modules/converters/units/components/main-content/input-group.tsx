import { useId } from "react"
import NumericInputBox from "@components/numeric-input-box"
import { useUnitConverterDispatchContext, useUnitConverterStateContext } from "../../context/consumer"
import { Plus } from "lucide-react"
import { InputGroupType, } from "../../types"

export const InputGroup = ({
    value,
}: {
    value: InputGroupType,
}) => {
    const inputId = useId()
    const converterState = useUnitConverterStateContext()
    const converterDispatch = useUnitConverterDispatchContext()

    const formData = value.fromInfo.fromUnitsDetails;
    const firstTo = value.toInfoList[0].toUnitsDetails;

    return (
        <section className="w-fit h-fit group/container cursor-pointer hover:bg-gray-400 px-3">

            <div className="relative flex flex-col gap-2 px-3">

                <span className="text-sm absolute top-1/2 -left-1 z-10 -translate-y-1/2 flex items-center justify-center bg-gray-500 group-hover/container:bg-gray-400">
                    {value.id}
                </span>

                <button className="absolute bottom-[0.90rem] -left-[0.45rem] z-10 bg-gray-800 cursor-pointer"
                    title="Add Input To"
                    aria-label="Add Input To"
                    onClick={() => { }}
                    hidden={false}
                    aria-hidden={false}
                >
                    <Plus size={15} />
                </button>

                <div className="w-fit relative z-10 flex gap-1 p-1 bg-gray-500 group-hover/container:bg-gray-400">
                    <label className="text-nowrap" htmlFor={"from-input-box" + inputId}>
                        {`From${formData.unitName !== null ? ` (${formData.unitName}):` : ":"}`}
                    </label>
                    <NumericInputBox
                        id={"from-input-box" + inputId}
                        maxLength={8}
                        placeholder={"000"}
                        className="w-44 text-right p-2"
                    />
                </div>
                <span> {`${formData.unitShortForm !== null ? ` (${formData.unitShortForm})` : ""}`}</span>
                <div className="w-fit relative z-10 flex gap-1 p-1 bg-gray-500 group-hover/container:bg-gray-400">
                    <label className="text-nowrap" htmlFor={"to-input-box" + inputId}>
                        {`To${firstTo.unitName !== null ? ` (${firstTo.unitName}):` : ":"}`}
                    </label>
                    <NumericInputBox
                        id={"to-input-box" + inputId}
                        maxLength={8}
                        placeholder={"000"}
                        className="w-44 text-right p-2"
                        disabled
                    />
                    <span> {`${firstTo.unitShortForm !== null ? ` (${firstTo.unitShortForm})` : ""}`}</span>
                </div>

                <button className="absolute top-1/2 -right-2 z-10 -translate-y-1/2 bg-gray-800 cursor-pointer"
                    title="Add Input Group"
                    aria-label="Add Input Group"
                    onClick={() => converterDispatch({
                        type: "ADD_TO_INPUT_GROUP",
                        payload: {
                            callerId: value.id
                        }
                    })}
                    hidden={converterState.inputGroupList.length >= 5}
                    aria-hidden={converterState.inputGroupList.length >= 5}
                >
                    <Plus size={15} />
                </button>

                <div className="w-full h-[3.5rem] absolute top-[1.2rem] left-0 border border-white" />
            </div>
        </section>
    )
}

