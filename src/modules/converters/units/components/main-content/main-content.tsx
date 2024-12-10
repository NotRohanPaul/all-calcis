import { Plus } from "lucide-react";
import { useUnitConverterDispatchContext, useUnitConverterStateContext } from "../../context/consumer";
import { InputBoxes, ToInputGroup, UnitInput } from "./main-input-components";
import { MAX_INPUT_GROUP_LIMIT } from "../../constants/units-converter-constants";

const MainContent = () => {
    const converterState = useUnitConverterStateContext();
    const converterDispatch = useUnitConverterDispatchContext()

    return (
        <>
            {converterState.inputGroupList.map((inputGroup) => {
                return (
                    <section key={inputGroup.inputGroupId} className={`w-fit h-fit relative flex flex-col gap-2 p-2 ${inputGroup.inputGroupId !== converterState.selectedInputGroupId ? "group/container hover:bg-gray-400 cursor-pointer" : "outline outline-1"}`}
                        onClick={() => {
                            if (inputGroup.inputGroupId === converterState.selectedInputGroupId) return;
                            converterDispatch({
                                type: "SET_SELECTED_GROUP_ID",
                                payload: {
                                    groupType: "inputGroup",
                                    groupId: inputGroup.inputGroupId,
                                }
                            })
                        }}
                    >
                        <span className="size-4 absolute top-[2.7rem] left-1 z-10 -translate-y-1/2 rounded-full group-hover/container:bg-gray-400"
                            style={{
                                backgroundColor: inputGroup.inputGroupColor,
                                outline: inputGroup.inputGroupId === converterState.selectedInputGroupId ? "2px solid white" : "2px solid black",
                            }}
                            aria-label={inputGroup.inputGroupColor}
                        />

                        <button className="absolute top-[2.7rem] right-1 z-10 -translate-y-1/2 bg-gray-800 cursor-pointer"
                            title="Add Input Group"
                            aria-label="Add Input Group"
                            onClick={() => converterDispatch({
                                type: "INSERT_GROUP", payload: {
                                    groupType: "inputGroup",
                                    groupId: inputGroup.inputGroupId,
                                }
                            })}
                            hidden={converterState.inputGroupList.length >= MAX_INPUT_GROUP_LIMIT || inputGroup.inputGroupId !== converterState.selectedInputGroupId}
                            aria-hidden={converterState.inputGroupList.length >= MAX_INPUT_GROUP_LIMIT || inputGroup.inputGroupId !== converterState.selectedInputGroupId}
                            children={<Plus size={15} />}
                        />

                        <UnitInput
                            inputType="From"
                            value={inputGroup.fromValue}
                            unitDetails={inputGroup.fromUnitsDetails} />

                        <ToInputGroup inputGroup={inputGroup} />
                        <InputBoxes inputGroup={inputGroup} />
                    </section >
                )
            })}
        </>
    )
}

export default MainContent;