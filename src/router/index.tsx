import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Header } from "components/ui/header";
import { Footer } from "components/ui/footer"
import { Home } from "components/home";
import { Dashboard } from "components/dashboard";

export function BrowserRouter() {
  const router = createBrowserRouter([
    {
      element: (
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
