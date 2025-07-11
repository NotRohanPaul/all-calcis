import { useRef } from "react"
import { Outlet } from "react-router-dom"

const CalculatorPageLayout = () => {
    const pageRef = useRef<HTMLDivElement | null>(null)

    return (
        <section className="w-full h-full flex flex-col">
            <h1 className="text-2xl p-2"
            >Calculator Page</h1>
            <div className="w-full h-full relative grid place-items-center overflow-hidden"
                ref={pageRef}
            >
                <Outlet context={pageRef} />
            </div>
        </section>
    )
}

export default CalculatorPageLayout