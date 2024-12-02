

// project imports
import MainLayout from "../layout/MainLayout";
import Loadable from "../ui-component/Loadable";
import BalanceComponent from "../pages/balancePage/BalanceComponent";
import LeaderBoardComponent from "../pages/leaderboardPage/LeaderBoardComponent";
import GameLaunch from "../pages/GameLaunch";

import MyrewardsComponent from "../pages/rewardsPage/MyrewardsComponent";
import Appointment from "../pages/Appointment";
import LoginForm from "../pages/bayers/loginpage/Loginpage";
import DashBoardComponent from "../pages/bayers/dashboardPage/DashBoardComponent";


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
  // path: "/",
  element: <MainLayout />,
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
          element: <LoginForm />,
        },
    
        {
          path: "rewards",
          element: <MyrewardsComponent />,
        },
        {
          path: "lederboard",
          element: (
            <div>
              <LeaderBoardComponent />
            </div>
          ),
        },
        {
          path: "marketplace",
          element: <h1>Coming Soon...</h1>,
        },
        {
          path: "P2P-Social",
          element: <h1>Coming Soon...</h1>,
        },
      ],
    },

  
  ],
  // path: "/main",
  // element: <div style={{ color: "red" }}> hfjdfhjfdh</div>,
};

export default MainRoutes;
