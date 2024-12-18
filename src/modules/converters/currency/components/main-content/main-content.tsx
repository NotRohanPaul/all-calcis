import NumericInputBox from "@components/numeric-input-box";
import { Plus } from "lucide-react";

const MainContent = () => {
    return (
        <section
            className={`w-fit h-fit relative flex flex-col gap-2 p-2 `}
        >
            <span className="size-4 absolute top-[2.7rem] left-1 z-10 -translate-y-1/2 rounded-full group-hover/container:bg-gray-400"
                children={"id"}
            />

            <button className="absolute top-[2.7rem] right-1 z-10 -translate-y-1/2 bg-gray-800 cursor-pointer"
                title="Add Input Group"
                aria-label="Add Input Group"
                children={<Plus size={15} />}
            />
            <div className="w-fit relative z-10 flex gap-1 mx-10 pl-2 pr-1 bg-gray-500 group-hover/container:bg-gray-400">
                <label className="text-nowrap">
                    id Currency:
                </label>
                <NumericInputBox
                    maxLength={8}
                    placeholder={"000"}
                    className="w-40 text-right p-2"
                />
                <span> shortform </span>
            </div>
            <div className="w-fit relative z-10 flex gap-1 mx-10 pl-2 pr-1 bg-gray-500 group-hover/container:bg-gray-400">
                <label className="text-nowrap">
                    id Currency:
                </label>
                <NumericInputBox
                    maxLength={8}
                    placeholder={"000"}
                    className="w-40 text-right p-2"
                />
                <span> shortform </span>
            </div>

            <div className="w-full h-full absolute left-0 top-0 flex flex-col py-6 px-3">
                <div
                    className="w-full h-full border border-white"
                />
            </div>
        </section >
    );
};

export default MainContent;