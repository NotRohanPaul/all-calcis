import { Link, Outlet } from "react-router-dom"

const AppLayout = () => {
    return (
        <article className="h-dvh grid grid-rows-[auto_1fr_auto]">
            <header className="h-16 text-2xl bg-gray-900">
                <nav className="h-full flex items-center p-2">
                    <div>
                        <Link to={"/"} reloadDocument>
                            All Calcis
                        </Link>
                    </div>

                    <ul className="flex gap-2 ml-auto">
                        <li>
                            <Link to={"/normal-calci"}>
                                Normal Caci
                            </Link>
                        </li>
                        <li>
                            <Link to={"/scientific-calci"}>
                                Scientific Caci
                            </Link>
                        </li>
                        <li>
                            <Link to={"/other-calci"}>
                                Other Caci
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <main className="flex flex-col">
                <Outlet />
            </main>
            <footer className="h-16 flex items-center justify-center text-xl bg-gray-900">
                <span>
                    @Copyright All Calcis
                </span>
            </footer>
        </article>
    )
}

export default AppLayout