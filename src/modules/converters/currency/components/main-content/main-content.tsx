import { Plus } from "lucide-react";

const MainContent = () => {
    return (<section
        className={`w-fit h-fit relative flex flex-col gap-2 p-2 `}
    >
        <span className="size-4 absolute top-[2.7rem] left-1 z-10 -translate-y-1/2 rounded-full group-hover/container:bg-gray-400"
        />

        <button className="absolute top-[2.7rem] right-1 z-10 -translate-y-1/2 bg-gray-800 cursor-pointer"
            title="Add Input Group"
            aria-label="Add Input Group"
            children={<Plus size={15} />}
        />

    </section >)
};

export default MainContent;