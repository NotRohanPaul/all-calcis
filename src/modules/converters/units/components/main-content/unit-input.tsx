import { useId } from "react"
import { UnitDetails } from "../../types"
import NumericInputBox from "@components/numeric-input-box"

const UnitInput = ({
    inputType,
    value,
    unitDetails
}: {
    inputType: "From" | "To",
    value: number | null,
    unitDetails: UnitDetails,
}
) => {
    const inputId = useId()

    return (
        <div className="w-fit relative z-10 flex gap-1 mx-10 bg-gray-500 group-hover/container:bg-gray-400">
            <label className="text-nowrap" htmlFor={"from-input-box" + inputId}>
                {`${inputType} ${unitDetails.unitName !== null ? ` (${unitDetails.unitName}):` : ":"}`}
            </label>
            <NumericInputBox
                id={"from-input-box" + inputId}
                maxLength={3}
                placeholder={"000"}
                className="w-12 text-right p-2"
                value={value ?? ""}
                onChange={() => { }}
            />
            <span> {`${unitDetails.unitShortForm !== null ? ` (${unitDetails.unitShortForm})` : ""}`}</span>
        </div>
    )
}

export default UnitInput