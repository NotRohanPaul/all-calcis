import { ChangeEvent, useId } from "react"
import {
    useUnitConverterDispatchContext,
    useUnitConverterStateContext
} from "../../context/consumer"
import NumericInputBox from "@components/numeric-input-box"
import { GroupType, InputUnitDetailsType, } from "../../types"
import { InputGroupType, } from "../../types"
import { Plus } from "lucide-react"
import { MAX_TO_GROUP_LIMIT } from "../../constants/units-converter-constants"

export const UnitInput = ({
    groupType,
    value,
    unitDetails
}: {
    groupType: GroupType,
    value: string | null,
    unitDetails: InputUnitDetailsType,
}
) => {
    const inputId = useId()
    const converterDispatch = useUnitConverterDispatchContext();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        let inputValue = (e.target as HTMLInputElement).value;
        if (inputValue.at(-1) === "." && inputValue.slice(0, inputValue.length - 1).includes(".")) {
            inputValue = inputValue.slice(0, inputValue.length - 1);
        };
        inputValue = inputValue.replace(/[^0-9.]/g, "");
      
        converterDispatch({
            type: "SET_GROUP_INPUT_VALUES",
            payload: {
                groupType,
                inputValue,
            }
        })
    }

    return (
        <div className="w-fit relative z-10 flex gap-1 mx-10 pl-2 pr-1 bg-gray-500 group-hover/container:bg-gray-400">
            <label className="text-nowrap" htmlFor={"from-input-box" + inputId}>
                {`${groupType === "inputGroup" ? "From" : "To"} ${unitDetails.unitName !== null ? ` (${unitDetails.unitName}):` : ":"}`}
            </label>
            <NumericInputBox
                id={"from-input-box" + inputId}
                maxLength={8}
                placeholder={"000"}
                className="min-w-fit max-w-28 text-right p-2"
                value={value ?? ""}
                onChange={handleChange}
                disabled={groupType === "toGroup" || unitDetails.unitName === null}
            />
            <span> {`${unitDetails.unitShortForm !== null ? ` (${unitDetails.unitShortForm})` : ""}`}</span>
        </div>
    )
}


export const InputBoxes = ({
    inputGroup
}: {
    inputGroup: InputGroupType,
}) => {
    return (
        <div className="w-full h-full absolute left-0 top-0 flex flex-col py-6 px-3">
            {
                inputGroup.toGroupList.map((toGroup, index) => (
                    <div
                        key={toGroup.toGroupId}
                        className="w-full h-full border border-white"
                        style={{
                            borderTop: index === 0 ? "" : "0",
                        }}
                    />
                ))
            }
        </div>)
}


export const ToInputGroup = ({
    inputGroup
}: {
    inputGroup: InputGroupType
}) => {
    const converterState = useUnitConverterStateContext()
    const converterDispatch = useUnitConverterDispatchContext()

    return (<div className="w-full flex flex-col gap-2">
        {inputGroup.toGroupList.map((toGroup) => (
            <div
                key={toGroup.toGroupId}
                className="relative"
                onClick={() => {
                    if (inputGroup.inputGroupId !== converterState.selectedInputGroupId) return;
                    converterDispatch({
                        type: "SET_SELECTED_GROUP_ID",
                        payload: {
                            groupType: "toGroup",
                            groupId: toGroup.toGroupId,
                        }
                    })
                }}
            >
                <button className="absolute bottom-[.55rem] left-[-.2rem] z-10 bg-gray-800 cursor-pointer"
                    title="Add Input To"
                    aria-label="Add Input To"
                    onClick={() => converterDispatch({
                        type: "INSERT_GROUP", payload: {
                            groupType: "toGroup",
                            groupId: toGroup.toGroupId,
                        }
                    })}
                    hidden={inputGroup.toGroupList.length >= MAX_TO_GROUP_LIMIT ||
                        inputGroup.inputGroupId !== converterState.selectedInputGroupId ||
                        toGroup.toGroupId !== inputGroup.selectedToGroupId
                    }
                    aria-hidden={inputGroup.toGroupList.length >= MAX_TO_GROUP_LIMIT ||
                        inputGroup.inputGroupId !== converterState.selectedInputGroupId ||
                        toGroup.toGroupId !== inputGroup.selectedToGroupId
                    }
                    children={<Plus size={15} />}
                />
                <button className="size-3 absolute top-[.6rem] left-8 z-20 rounded-full group-hover/container:bg-gray-400"
                    style={{
                        backgroundColor: toGroup.toGroupColor,
                        outline: inputGroup.selectedToGroupId === toGroup.toGroupId && inputGroup.inputGroupId === converterState.selectedInputGroupId ? "2px solid white" : "",
                    }}
                    tabIndex={inputGroup.selectedToGroupId === toGroup.toGroupId || inputGroup.inputGroupId !== converterState.selectedInputGroupId ? -1 : 0}
                    aria-label={toGroup.toGroupColor}
                />
                <UnitInput
                    groupType="toGroup"
                    value={toGroup.toValue}
                    unitDetails={toGroup.toUnitsDetails}
                />
            </div>
        ))}
    </div>)
}

