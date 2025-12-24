import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const Analytics = lazy(() => import("@/pages/admin/Analytics"));
const ProfileDashboard = lazy(() => import("@/pages/common/Profile"));
const ManageAllUsers = lazy(() => import("@/pages/admin/ManageAllUsers"));
const UpdateStatus = lazy(() => import("@/pages/admin/UpdateStatus"));
const Parcels = lazy(() => import("@/pages/admin/Parcels"));

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        component: Analytics,
      },
      {
        title: "My Profile",
        url: "/admin/profile",
        component: ProfileDashboard,
      },
      {
        title: "Parcels",
        url: "/admin/parcels",
        component: Parcels,
      },
      {
        title: "manage all users",
        url: "/admin/all-users",
        component: ManageAllUsers,
      },
      {
        title: " update parcel status",
        url: "/admin/update-status",
        component: UpdateStatus,
      },
    ],
  },
];