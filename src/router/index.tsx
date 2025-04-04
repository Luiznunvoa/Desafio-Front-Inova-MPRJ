import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Header } from "components/ui/header";
import { Home } from "components/home";
import { List } from "components/list";
import { Dashboard } from "components/dashboard";
import { SecureData } from "./middlewares";

export function BrowserRouter() {
  const router = createBrowserRouter([
    {
      element: (
        <>
          <Header />
          <main className="flex flex-col items-center justify-center w-full">
            <Outlet />
          </main>
        </>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
      ],
    },
    {
      element: (
        <SecureData>
          <Header />
          <main className="flex flex-col items-center justify-center w-full">
            <Outlet />
          </main>
        </SecureData>
      ),
      children: [
        {
          path: "/dashboard",
          element: <List />,
        },
        {
          path: "/dashboard/:city",
          element: <Dashboard />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
