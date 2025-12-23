import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter, Navigate } from "react-router";
import Unauthorized from "@/pages/Unauthorized";
import { role } from "@/constants";
import type { TRole } from "@/types";
import { withAuth } from "@/utils/withAuth";
import { About } from "@/pages/About";
import { adminSidebarItems } from "./adminSidebarItems";
import { senderSidebarItems } from "./senderSidebarItems";
import { receiverSidebarItems } from "./receiverSidebarItems";
import { Home } from "@/pages/Home";
import Error from "@/pages/Error";
import { Contact } from "@/components/modules/Home/Contact";
import { FAQ } from "@/components/modules/Home/Faq";
import LocationMap from "@/components/modules/Home/LocationMap";


export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: Home,
        path: "",
      },
      {
        Component: About,
        path: "about",
      },
      {
        Component: Contact,
        path: "contact",
      },
      {
        Component: FAQ,
        path: "faq",
      },
      {
        Component: LocationMap,
        path: "locations",
      },
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.Admin as TRole),
    path: "/admin",
    children: [
      { index: true, element: <Navigate to="/admin/analytics" /> },
      ...generateRoutes(adminSidebarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.Sender as TRole),
    path: "/sender",
    children: [
      { index: true, element: <Navigate to="/sender/parcel-request" /> },
      ...generateRoutes(senderSidebarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.Receiver as TRole),
    path: "/receiver",
    children: [
      { index: true, element: <Navigate to="/receiver/incoming-parcels" /> },
      ...generateRoutes(receiverSidebarItems),
    ],
  },
  {
    Component: Login,
    path: "/login",
  },
  {
    Component: Register,
    path: "/register",
  },
  {
    Component: Unauthorized,
    path: "/unauthorized",
  },
  {
    Component: Error,
    path: "*",
  },
]);