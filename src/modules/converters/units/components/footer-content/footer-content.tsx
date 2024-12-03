import UnitsTable from "./units-table"

const FooterContent = () => {

    return (
        <div className="w-full h-full flex gap-2 p-1 pr-2 overflow-auto">
            <UnitsTable inputType="From" />
            <UnitsTable inputType="To" />
        </div>
    )
}

export default FooterContent