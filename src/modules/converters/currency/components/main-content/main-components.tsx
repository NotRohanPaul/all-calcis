import { InputFieldType, InputGroupType } from "../../types";
import NumericInputBox from "@components/numeric-input-box";
import { Plus } from "lucide-react";
import { useCurrencyConverterDispatchContext, useCurrencyConverterStateContext } from "../../context/consumer";
import { ChangeEvent, KeyboardEvent, MouseEvent, } from "react";

export const InputGroup = ({
    inputGroupObj,
}: {
    inputGroupObj: InputGroupType,
}) => {
    const converterState = useCurrencyConverterStateContext();
    const converterDispatch = useCurrencyConverterDispatchContext();
    const isSelectedGroup = inputGroupObj.inputGroupId === converterState.selectedInputGroupId;

    const handleClick = (e: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>) => {
        if (e.type !== "click" && (e as KeyboardEvent).key !== "Enter" && (e as KeyboardEvent).key !== " ") return;
        converterDispatch({
            type: "SET_SELECTED_INPUT_GROUP_OR_FIELD_ID",
            payload: {
                groupId: inputGroupObj.inputGroupId,
                inputType: "inputGroup"
            }
        });
    };

    return (
        <section
            id={`input-group-${inputGroupObj.inputGroupId}`}
            className={`w-fit h-fit relative flex flex-col p-2 ${isSelectedGroup ? "" : " group/container hover:bg-gray-400"}`}
            tabIndex={isSelectedGroup ? -1 : 0}
            onClick={handleClick}
            onKeyDown={handleClick}
            role={isSelectedGroup ? undefined : "button"}
        >
            <span className={`size-4 absolute top-[2.7rem] left-1 z-10 -translate-y-1/2 rounded-full ${isSelectedGroup ? "outline outline-2 outline-white" : ""}`}
                style={{
                    backgroundColor: inputGroupObj.inputGroupColor,
                }}
            />

            <button className="absolute top-[2.7rem] right-1 z-10 -translate-y-1/2 bg-gray-800"
                title="Add Input Group"
                aria-label="Add Input Group"
                onClick={() => converterDispatch({
                    type: "INSERT_INPUT_GROUP_OR_FIELD",
                    payload: {
                        groupId: inputGroupObj.inputGroupId,
                        inputType: "inputGroup"
                    }
                })}
                disabled={!isSelectedGroup}
                hidden={!isSelectedGroup}
                aria-hidden={!isSelectedGroup}
                children={<Plus size={15} />}
            />
            <div className="flex flex-col gap-4">
                {
                    inputGroupObj.inputFieldList.map((inputFieldObj) => {
                        return <InputField key={inputFieldObj.inputFieldId} inputFieldObj={inputFieldObj} inputGroupObj={inputGroupObj} />;
                    })
                }
            </div>
            <div className="w-full h-full absolute left-0 top-0 flex flex-col py-6 px-3">
                {inputGroupObj.inputFieldList.map((inputFieldObj, i, arr) => (
                    i !== 0
                    &&
                    <div
                        key={`${inputFieldObj.inputFieldId}`}
                        className={`w-full h-full border border-white ${i !== arr.length - 1 && "border-b-0"}`}
                    />
                ))}
            </div>
        </section >
    );
};


const InputField = ({
    inputGroupObj,
    inputFieldObj,
}: {
    inputGroupObj: InputGroupType,
    inputFieldObj: InputFieldType,
}) => {
    const converterState = useCurrencyConverterStateContext();
    const converterDispatch = useCurrencyConverterDispatchContext();
    const isCurrentGroup = inputGroupObj.inputGroupId === converterState.selectedInputGroupId;
    const isDisabled = inputFieldObj.inputFieldId !== inputGroupObj.selectedInputFieldId || !isCurrentGroup;
    const isCurrecySelected = inputFieldObj.inputFieldCurrencyDetails.currencyName !== null;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        let inputValue = (e.target as HTMLInputElement).value;
        if (inputValue.at(-1) === "." && inputValue.slice(0, inputValue.length - 1).includes(".")) {
            inputValue = inputValue.slice(0, inputValue.length - 1);
        };
        inputValue = inputValue.replace(/[^0-9.]/g, "");

        converterDispatch({
            type: "SET_INPUT_GROUP_OR_FIELD_INPUT_VALUES",
            payload: {
                inputValue
            }
        });
    };

    return (
        <div className="relative flex whitespace-nowrap px-12"
            onClick={() => converterDispatch({
                type: "SET_SELECTED_INPUT_GROUP_OR_FIELD_ID",
                payload: {
                    groupId: inputFieldObj.inputFieldId,
                    inputType: "inputField"
                }
            })}
            role={isDisabled ? "button" : undefined}
        >
            <button className={`absolute bottom-[.5rem] left-[2.1rem] z-20 bg-gray-800`}
                title="Add Input Field"
                aria-label="Add Input Field"
                onClick={() => converterDispatch({
                    type: "INSERT_INPUT_GROUP_OR_FIELD",
                    payload: {
                        groupId: inputFieldObj.inputFieldId,
                        inputType: "inputField"
                    }
                })}
                disabled={isDisabled}
                hidden={isDisabled}
                aria-hidden={isDisabled}
                children={<Plus size={15} />}
            />
            <div className={`w-fit flex items-center gap-1 px-2 z-10 bg-gray-500 group-hover/container:bg-gray-400`}>
                <span className={`size-4 rounded-full ${!isDisabled
                    ? "border-2 border-white" : ""}`}
                    style={{
                        backgroundColor: inputFieldObj.inputFieldColor,
                    }}
                />
                <label className="self-start">
                    {`${inputFieldObj.inputFieldCurrencyDetails.subCategory ? inputFieldObj.inputFieldCurrencyDetails.subCategory : ""}
                    ${inputFieldObj.inputFieldCurrencyDetails.currencyName ? inputFieldObj.inputFieldCurrencyDetails.currencyName + ":" : ""}`}
                </label>
                <NumericInputBox
                    maxLength={8}
                    value={inputFieldObj.inputFieldValue ?? ''}
                    onChange={handleChange}
                    placeholder={"000"}
                    className={`w-40 text-right p-2
                    ${!isCurrentGroup || !isCurrecySelected ? "pointer-events-none" : ""}
                    `}
                    disabled={!isCurrentGroup || !isCurrecySelected}
                    tabIndex={!isCurrentGroup || !isCurrecySelected ? -1 : 0}
                />
                <span className="self-start">
                    {`${inputFieldObj.inputFieldCurrencyDetails.currencyShortForm
                        ?
                        inputFieldObj.inputFieldCurrencyDetails.currencyShortForm
                        :
                        ""
                        } ${inputFieldObj.inputFieldCurrencyDetails.currencySymbol
                            ?
                            inputFieldObj.inputFieldCurrencyDetails.currencySymbol
                            :
                            ""
                        }`}
                </span>
            </div>
        </div>

    );
};