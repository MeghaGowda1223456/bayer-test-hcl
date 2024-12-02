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
      title: "Patient List",
      type: "item",
      url: "/dashboard/patient-list",
      icon: icons.IconHome,
      breadcrumbs: false,
    },
    {
      id: "balance",
      title: "Apointments",
      type: "item",
      url: "/dashboard/apointments",
      icon: icons.IconWallet,
      breadcrumbs: false,
    },
    {
      id: "Messegs",
      title: "Messegs",
      type: "item",
      url: "/dashboard/messeges",
      icon: icons.IconGift,
      breadcrumbs: false,
    },
    {
      id: "login",
      title: "login",
      type: "item",
      url: "/dashboard/login",
      icon: icons.IconTrophy,
      breadcrumbs: false,
    },
    {
      id: "logout",
      title: "Logout",
      type: "item",
      url: "/",
      icon: icons.IconTrophy,
      breadcrumbs: false,
    },
  ],
};
const dashboard2p = {
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
      title: "Profile",
      type: "item",
      url: "/dashboard/games",
      icon: icons.IconHome,
      breadcrumbs: false,
    },
    {
      id: "balance",
      title: "Apointments",
      type: "item",
      url: "/dashboard/balance",
      icon: icons.IconWallet,
      breadcrumbs: false,
    },
    {
      id: "rewards",
      title: "helth records",
      type: "item",
      url: "/dashboard/rewards",
      icon: icons.IconGift,
      breadcrumbs: false,
    },
    {
      id: "lederboard",
      title: "Messages",
      type: "item",
      url: "/dashboard/lederboard",
      icon: icons.IconTrophy,
      breadcrumbs: false,
    },
    {
      id: "marketplace",
      title: "Logout",
      type: "item",
      url: "/dashboard/marketplace",
      icon: icons.IconShoppingCart,
      breadcrumbs: false,
    },
  ],
};
export default dashboard;
