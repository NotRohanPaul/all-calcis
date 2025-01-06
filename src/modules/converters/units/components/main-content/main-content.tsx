import { Plus } from "lucide-react";
import { useUnitConverterDispatchContext, useUnitConverterStateContext } from "../../context/consumer";
import { InputBoxes, ToInputGroup, UnitInput } from "./main-input-components";
import { MAX_INPUT_GROUP_LIMIT } from "../../constants/units-converter-constants";
import { InputGroupType } from "../../types";
import { KeyboardEvent, MouseEvent } from "react";

const MainContent = () => {
    const converterState = useUnitConverterStateContext();
    const converterDispatch = useUnitConverterDispatchContext();

    const handleInputGroupSelection = (e: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>, inputGroup: InputGroupType) => {

        if (e.type !== "click" && (e.type === "keydown" && (e as KeyboardEvent).key !== "Enter")) return;

        if (inputGroup.inputGroupId === converterState.selectedInputGroupId) return;

        converterDispatch({
            type: "SET_SELECTED_GROUP_ID",
            payload: {
                groupType: "inputGroup",
                groupId: inputGroup.inputGroupId,
            }
        });
    };


    return (
        <>
            {converterState.inputGroupList.map((inputGroup) => {
                return (
                    <section
                        key={inputGroup.inputGroupId}
                        id={`input-group-${inputGroup.inputGroupId}`}
                        className={`w-fit h-fit relative flex flex-col gap-2 p-2 ${inputGroup.inputGroupId !== converterState.selectedInputGroupId ? "group/container hover:bg-gray-400 cursor-pointer [&>*]:pointer-events-none" : "outline outline-1 outline-white"}`}
                        tabIndex={inputGroup.inputGroupId === converterState.selectedInputGroupId ? -1 : 0}
                        onKeyDown={(e) => handleInputGroupSelection(e, inputGroup)}
                        onClick={(e) => handleInputGroupSelection(e, inputGroup)}
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
                            groupType="inputGroup"
                            value={inputGroup.fromValue}
                            unitDetails={inputGroup.fromUnitsDetails} />

                        <ToInputGroup inputGroup={inputGroup} />
                        <InputBoxes inputGroup={inputGroup} />
                    </section >
                );
            })}
        </>
    );
};

export default MainContent;