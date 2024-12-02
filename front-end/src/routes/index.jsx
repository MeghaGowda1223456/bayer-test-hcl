import { createBrowserRouter } from "react-router-dom";

// routes
import MainRoutes from "./MainRoutes";
import NotFoundPage from "../pages/NotFoundPage";
import LoginForm from "../pages/bayers/loginpage/Loginpage";

// ==============================|| MAIN ROUTING ||============================== //

// Add the NotFoundRoute separately
const NotFoundRoute = {
  path: "*",
  element: <NotFoundPage />, // Display the custom 404 page outside the layout
};
const loginpage = {
  path: "/login",
  element: <LoginForm />, // Display the custom 404 page outside the layout
};
// Combine MainRoutes with NotFoundRoute
const routes = [MainRoutes, NotFoundRoute, loginpage];

// Create the router with all routes
const router = createBrowserRouter(routes, {
  basename: import.meta.env.VITE_APP_BASE_NAME,
});

export default router;
