// assets
import { TextField } from "@mui/material";
import {
  IconDashboard,
  IconSearch,
  IconHome,
  IconWallet,
  IconGift,
  IconTrophy,
  IconShoppingCart,
  IconUsers,
} from "@tabler/icons-react";

// constant
const icons = {
  IconDashboard,
  IconSearch,
  IconHome,
  IconWallet,
  IconGift,
  IconTrophy,
  IconShoppingCart,
  IconUsers,
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: "dashboard",
  // title: "Dashboard",
  type: "group",
  children: [
    {
      id: "default",
      title: "Dashboard",
      type: "item",
      url: "/dashboard/default",
      icon: icons.IconDashboard,
      breadcrumbs: false,
    },
    // {
    //   id: "search",
    //   title: "Search",
    //   type: "item",
    //   url: "/dashboard/search",
    //   icon: icons.IconSearch,
    //   breadcrumbs: false,
    // },
    {
      id: "games",
      title: "Games",
      type: "item",
      url: "/dashboard/games",
      icon: icons.IconHome,
      breadcrumbs: false,
    },
    {
      id: "balance",
      title: "Balance",
      type: "item",
      url: "/dashboard/balance",
      icon: icons.IconWallet,
      breadcrumbs: false,
    },
    {
      id: "rewards",
      title: "Rewards",
      type: "item",
      url: "/dashboard/rewards",
      icon: icons.IconGift,
      breadcrumbs: false,
    },
    {
      id: "lederboard",
      title: "Leaderboard",
      type: "item",
      url: "/dashboard/lederboard",
      icon: icons.IconTrophy,
      breadcrumbs: false,
    },
    {
      id: "marketplace",
      title: "Marketplace",
      type: "item",
      url: "/dashboard/marketplace",
      icon: icons.IconShoppingCart,
      breadcrumbs: false,
    },
    {
      id: "P2P-Social",
      title: "P2P Social",
      type: "item",
      url: "/dashboard/P2P-Social",
      icon: icons.IconUsers,
      breadcrumbs: false,
    },
  ],
};

export default dashboard;
