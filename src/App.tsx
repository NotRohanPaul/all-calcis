import { createBrowserRouter, RouterProvider, } from "react-router-dom"
import { Suspense } from "react"

import { Router } from "@remix-run/router"

import AppLayout from "./layouts/AppLayout"
import CalculatorPage from "src/pages/CalculatorPage"
import LandingPage from "src/pages/LandingPage"
import CalculatorNormal from "src/components/calculators/normal/CalculatorNormal"

function App() {

  const allRoutes: Router = createBrowserRouter([
    {
      element: <AppLayout />,
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
              <CalculatorPage />
            </Suspense>
          ),
          children: [
            {
              path: '/normal-calci',
              element: (
                <Suspense fallback={<>Loading</>}>
                  <CalculatorNormal />
                </Suspense>
              )
            },
            {
              path: '/scientific-calci',
              element: (
                <Suspense fallback={<>Loading</>}>
                  <CalculatorNormal />
                </Suspense>
              )
            },
            {
              path: '/other-calci',
              element: (
                <Suspense fallback={<>Loading</>}>
                  <CalculatorNormal />
                </Suspense>
              )
            },
          ]
        },
        {
          path: '*',
          element: <><h1>404. Page not found</h1></>
        },
      ]
    }
  ], {
    future: {
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
      v7_relativeSplatPath: true
    }
  })

  return (
    <RouterProvider router={allRoutes} future={{
      v7_startTransition: true,
    }} />
  )
}

export default App
