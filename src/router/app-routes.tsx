import { Suspense } from "react";
import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";

import {
    calculatorsRoutes,
    convertersRoutes,
} from "./dynamic-routes";

import AppLayout from "@layouts/app-layout";
import LandingPage from "@pages/landing-page";
import CalculatorPageLayout from "@layouts/calculator-page-layout";
import ConverterPageLayout from "@layouts/converter-page-layout";
import ErrorBoundary from "@containers/error-boundary/main";

const dynamicCalculatorsRoutes = calculatorsRoutes.reduce((acc, route) => {
    if (route.path === "#") return acc;

    acc.push({
        path: route.path,
        element: (
            <Suspense fallback={<>Loading...</>}>
                {route.component && <route.component />}
            </Suspense>
        ),
    });
    return acc;

}, [] as { path: string; element: JSX.Element; }[]);


const dynamicConvertersRoutes = convertersRoutes.reduce((acc, route) => {
    if (route.path === "#") return acc;

    acc.push({
        path: route.path,
        element: (
            <Suspense fallback={<>Loading...</>}>
                {route.component && <route.component />}
            </Suspense>
        ),
    });
    return acc;

}, [] as { path: string; element: JSX.Element; }[]);


const appRouter = createBrowserRouter([
    {
        element: (
            <ErrorBoundary>
                <AppLayout />
            </ErrorBoundary>
        ),
        children: [
            {
                path: '/',
                element: (
                    <Suspense fallback={<>Loading</>}>
                        <LandingPage />
                    </Suspense>
                )
            },
            {
                element: (
                    <Suspense fallback={<>Loading</>}>
                        <CalculatorPageLayout />
                    </Suspense>
                ),
                children: [
                    ...dynamicCalculatorsRoutes
                ]
            },
            {
                element: (
                    <Suspense fallback={<>Loading</>}>
                        <ConverterPageLayout />
                    </Suspense>
                ),
                children: [
                    ...dynamicConvertersRoutes
                ]
            },
            {
                path: "*",
                element: <h1>404. Page not found</h1>,
            },
        ],
    }
], {
    future: {
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: true,
        v7_relativeSplatPath: true
    }
});


export default function AppRoutes() {
    return <RouterProvider router={appRouter} future={{
        v7_startTransition: true,
    }} />;
}
