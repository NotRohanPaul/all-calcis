import { MouseEvent, useRef } from "react"
import { Link } from "react-router-dom"
import { allRoutes } from "src/router/dynamic-routes"

const LandingPage = () => {

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

            <div className="group/container relative w-fit h-fit grid grid-cols-[repeat(4,150px)] auto-rows-[150px] gap-1 p-1 overflow-hidden "
                onMouseMove={handleMouseMove}
                ref={containerRef}
            >
                <div className="absolute w-[100%] h-[100%] bg-no-repeat opacity-0 group-hover/container:opacity-100"
                    style={{
                        backgroundImage: `radial-gradient(circle at center,#fff 0%,transparent 50%)`,
                    }}
                    ref={bgLightRef}
                >
                </div>
                {
                    allRoutes.map(({ path, fullName }, index) => {
                        return <Link
                            key={index} to={path}
                            className={
                                "relative z-1 flex items-center justify-center text-center text-xl font-serif p-2 bg-indigo-950 duration-300 hover:bg-blue-500  hover:shadow-[inset_0px_0px_0px_5px_rgba(255,255,255,1)]"
                            }
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