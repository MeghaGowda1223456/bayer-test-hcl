import { lazy } from "react";

// project imports
import MainLayout from "../layout/MainLayout";
import Loadable from "../ui-component/Loadable";
import BalanceComponent from "../pages/balancePage/BalanceComponent";
import LeaderBoardComponent from "../pages/leaderboardPage/LeaderBoardComponent";
import GameLaunch from "../pages/GameLaunch";
import DashBoardComponent from "../pages/dashboardPage/DashBoardComponent";
import MyrewardsComponent from "../pages/rewardsPage/MyrewardsComponent";
import Appointment from "../pages/Appointment";
import WelcomePage from "../pages/WelcomePage";

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
          path: "games",
          element: <GameLaunch />,
        },
        {
          path: "balance",
          element: (
            <div>
              <BalanceComponent />
            </div>
          ),
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
    // {
    //   path: "utils",
    //   children: [
    //     {
    //       path: "util-typography",
    //       element: <UtilsTypography />,
    //     },
    //   ],
    // },
    // {
    //   path: "utils",
    //   children: [
    //     {
    //       path: "util-color",
    //       element: <UtilsColor />,
    //     },
    //   ],
    // },
    // {
    //   path: "utils",
    //   children: [
    //     {
    //       path: "util-shadow",
    //       element: <UtilsShadow />,
    //     },
    //   ],
    // },
    // {
    //   path: 'icons',
    //   children: [
    //     {
    //       path: 'tabler-icons',
    //       element: <UtilsTablerIcons />
    //     }
    //   ]
    // },
    // {
    //   path: 'icons',
    //   children: [
    //     {
    //       path: 'material-icons',
    //       element: <UtilsMaterialIcons />
    //     }
    //   ]
    // },
    {
      path: "sample-page",
      element: <>hhhhhhhhhhhhhhhhsssssss</>,
    },
    {
      path: "appointment",
      element: <Appointment />
    },
    {
      path: "welcome",
      element: <WelcomePage />
    }
  ],
  // path: "/main",
  // element: <div style={{ color: "red" }}> hfjdfhjfdh</div>,
};

export default MainRoutes;
