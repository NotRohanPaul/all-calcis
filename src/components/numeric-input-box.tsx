import { InputHTMLAttributes } from "react";

const NumericInputBox = (props: InputHTMLAttributes<HTMLInputElement>) => {

    return (
        <input
            type="text"
            maxLength={2}
            placeholder="00"
            onFocus={(e) => e.target.setSelectionRange(e.target.value.length, e.target.value.length)}
            inputMode="numeric"
            {...props}
            className={"w-10 h-8 text-center bg-black " + (props.className || "")}
        />
    )
}

export default NumericInputBox