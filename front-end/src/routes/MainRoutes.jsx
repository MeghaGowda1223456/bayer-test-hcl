

// project imports
import MainLayout from "../layout/MainLayout";





import LoginForm from "../pages/bayers/loginpage/Loginpage";
import DashBoardComponent from "../pages/bayers/dashboardPage/DashBoardComponent";
import Apointments from "../pages/Appointment";
import ProtectedRoute from "./PrivateRouts";


// dashboard routing
// const DashboardDefault = Loadable(lazy(() => import("../views/dashboard")));

// utilities routing
// const UtilsTypography = Loadable(
//   lazy(() => import("../views/utilities/Typography"))
// );
// const UtilsColor = Loadable(lazy(() => import("../views/utilities/Color")));
// const UtilsShadow = Loadable(lazy(() => import("../views/utilities/Shadow")));
// const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
// const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
// const SamplePage = Loadable(lazy(() => import("../views/sample-page")));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: "/",
  element: <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>,
  children: [
    {
      path: "/",
      element: <DashBoardComponent />,
    },
    {
      path: "dashboard",
      children: [
        {
          path: "default",
          element: <DashBoardComponent />,
        },
        {
          path: "login",
          element: <LoginForm />,
        },
        {
          path: "patient-list",
          element: <>Coming Soon...</>,
        },
    
      
     
        {
          path: "apointments",
          element: <Apointments/>,
        },
        {
          path: "messeges",
          element: <h1>Coming Soon...</h1>,
        },
      ],
    },

  
  ],
  // path: "/main",
  // element: <div style={{ color: "red" }}> hfjdfhjfdh</div>,
};

export default MainRoutes;
