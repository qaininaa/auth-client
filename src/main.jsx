import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import RequireAuth from "./components/RequireAuth.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

  //public
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },

  //

  {
    element: <RequireAuth allowedRoles={["USER", "ADMIN"]} />,
    children: [{ index: true, path: "/home", Component: HomePage }],
  },
  {
    element: <RequireAuth allowedRoles={["ADMIN"]} />,
    children: [{ index: true, path: "/admin", Component: AdminPage }],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
