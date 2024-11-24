import ColorCustomizer from "@components/color-customizer"
import { useState } from "react"
import { Link, Outlet } from "react-router-dom"

const AppLayout = () => {
    const [isCustomizationVisible, setIsCustomizationVisible] = useState(false);

    return (
        <article className="h-dvh grid grid-rows-[auto_1fr_auto]">
            <header className="h-10 text-xl bg-primary">
                <nav className="h-full flex items-center p-2">
                    <div>
                        <Link to={"/"} reloadDocument>
                            All Calcis
                        </Link>
                    </div>

                    <ul className="flex gap-2 ml-auto">
                        <li >
                            <Link to={"/normal"}
                                className="border-border border-[2px] px-1 rounded-lg transition-[background-color] duration-300 hover:bg-background hover:text-text-primary"
                            >
                                Normal
                            </Link>
                        </li>
                        <li>
                            <Link to={"/age"}
                                className="border-white border-[2px] px-1 rounded-lg transition-[background-color] duration-300 hover:bg-white hover:text-black"
                            >
                                Age
                            </Link>
                        </li>
                        <li>
                            <Link to={"/bmi"}
                                className="border-white border-[2px] px-1 rounded-lg transition-[background-color] duration-300 hover:bg-white hover:text-black"
                            >
                                BMI
                            </Link>
                        </li>
                        <li>
                            <Link to={"#"}
                                className="border-white border-[2px] px-1 rounded-lg transition-[background-color] duration-300 hover:bg-white hover:text-black"
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