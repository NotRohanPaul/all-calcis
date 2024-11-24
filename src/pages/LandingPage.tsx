import { MouseEvent, useRef } from "react"
import { Link } from "react-router-dom"

const LandingPage = () => {
    const allRoutes = [
        {
            path: "/normal",
            fullName: "Normal Calcualtor",
            shortName: "Normal"
        },
        {
            path: "/age",
            fullName: "Age Calcualtor",
            shortName: "Age"
        },
        {
            path: "/bmi",
            fullName: "BMI Calcualtor",
            shortName: "BMI"
        },
        {
            path: "#",
            fullName: "Other",
            shortName: "Other"
        },
        {
            path: "#",
            fullName: "Other Calcualtor",
            shortName: "Other"
        },
        {
            path: "#",
            fullName: "Other Calcualtor",
            shortName: "Other"
        },
        {
            path: "#",
            fullName: "Other Calcualtor",
            shortName: "Other"
        },
        {
            path: "#",
            fullName: "Other",
            shortName: "Other"
        },
        {
            path: "#",
            fullName: "Other Calcualtor",
            shortName: "Other"
        },
        {
            path: "#",
            fullName: "Other Calcualtor",
            shortName: "Other"
        },
        {
            path: "#",
            fullName: "Other Calcualtor",
            shortName: "Other"
        },
        {
            path: "#",
            fullName: "Other Calcualtor",
            shortName: "Other"
        },
    ]

    const containerRef = useRef<HTMLDivElement>(null)
    const bgLightRef = useRef<HTMLDivElement>(null)

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current || !bgLightRef.current) return;
        const containerRect = containerRef.current.getBoundingClientRect();
        const bgLightRect = containerRef.current.getBoundingClientRect();

        bgLightRef.current.style.left = `${e.clientX - containerRect.left - (bgLightRect.width / 2)}px`;
        bgLightRef.current.style.top = `${e.clientY - containerRect.top - (bgLightRect.height / 2)}px`;

    }

    return (
        <section className="h-full flex flex-col items-center justify-center gap-10">
            <h1 className="text-4xl text-center">
                All Calculators are present here.
            </h1>

            <div className="group/container relative w-fit h-fit grid grid-cols-[repeat(4,200px)] auto-rows-[200px] gap-1 p-1 overflow-hidden "
                onMouseMove={handleMouseMove}
                ref={containerRef}
            >
                <div className="absolute w-[100%] h-[100%] bg-no-repeat opacity-0 group-hover/container:opacity-100"
                    style={{
                        backgroundImage: `radial-gradient(circle at center,#fff 0%,transparent 50%)`,
                    }}
                    ref={bgLightRef}
                ></div>
                {
                    allRoutes.map(({ path, fullName }, index) => {
                        return <Link
                            key={index} to={path}
                            className="relative z-1 flex items-center justify-center text-center bg-gray-800 hover:outline hover:outline-white"
                        >
                            {fullName}
                        </Link>
                    })
                }
            </div>


        </section >
    )
}

export default LandingPage