import ColorCustomizer from "@components/color-customizer"
import { useState } from "react"
import { Link, Outlet } from "react-router-dom"
import { calculatorsRoutes, convertersRoutes } from "src/router/dynamic-routes";

const AppLayout = () => {
    const [isCustomizationVisible, setIsCustomizationVisible] = useState<boolean>(false);
    const [categoryOfDropDown, setCategoryOfDropDown] = useState<"calculators" | "converters" | null>(null);
    return (
        <article className="h-dvh grid grid-rows-[auto_1fr_auto]">
            <header className="h-fit text-xl bg-primary">
                <nav className="h-full flex items-center justify-between p-1">
                    <div>
                        <Link to={"/"} reloadDocument>
                            All Calcis
                        </Link>
                    </div>

                    <ul className="relative flex items-center gap-2">
                        <li onMouseLeave={() => setCategoryOfDropDown(null)}
                        >
                            <p className="rounded-sm p-1 hover:bg-white/30 select-none"
                                onMouseOver={() => setCategoryOfDropDown("calculators")}
                            >
                                Calculators
                            </p>
                            <div className="min-w-28 w-fit absolute top-full z-10">
                                {
                                    categoryOfDropDown === "calculators"
                                    &&
                                    <div className="flex flex-col gap-1 text-center p-1 mt-2 bg-gray-700"
                                    >
                                        {
                                            calculatorsRoutes.map(item => (
                                                <Link
                                                    key={item.path}
                                                    to={item.path}
                                                    className="w-full px-1 rounded-sm hover:bg-background hover:text-text-primary"
                                                >
                                                    {item.shortName}
                                                </Link>
                                            ))
                                        }
                                    </div>
                                }
                            </div>
                        </li>
                        <li onMouseLeave={() => setCategoryOfDropDown(null)}
                        >
                            <p className="rounded-sm p-1 hover:bg-white/30 select-none"
                                onMouseOver={() => setCategoryOfDropDown("converters")}
                            >
                                Converters
                            </p>
                            <div className="min-w-28 w-fit absolute top-full z-10">
                                {
                                    categoryOfDropDown === "converters"
                                    &&
                                    <div className="flex flex-col gap-1 text-center p-1 mt-2 bg-gray-700"
                                    >
                                        {
                                            convertersRoutes.map(item => (
                                                <Link
                                                    key={item.path}
                                                    to={item.path}
                                                    className="w-full px-1 rounded-sm hover:bg-background hover:text-text-primary"
                                                >
                                                    {item.shortName}
                                                </Link>
                                            ))
                                        }
                                    </div>
                                }
                            </div>
                        </li>
                        <li>
                            <Link to={"#"}
                                className="border-white border-[2px] px-1 rounded-sm transition-[background-color] duration-300 hover:bg-white hover:text-black"
                                onClick={() => setIsCustomizationVisible((prev) => !prev)}
                            >
                                Customize
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <main className="relative flex flex-col">
                <Outlet />
                {
                    isCustomizationVisible
                    &&
                    <div className="absolute bottom-0">
                        <ColorCustomizer />
                    </div>}
            </main>
            <footer className="h-10 flex items-center justify-center text-xl bg-gray-900">
                <span>
                    @Copyright All Calcis
                </span>
            </footer>
        </article>
    )
}

export default AppLayout