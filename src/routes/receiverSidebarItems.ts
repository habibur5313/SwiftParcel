import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const ProfileDashboard = lazy(() => import("@/pages/common/Profile"));
const confirmParcelDelivery = lazy(() => import("@/pages/receiver/confirmParcelDelivery"));
const viewDeliveryHistory = lazy(() => import("@/pages/receiver/viewDeliveryHistory"));
const viewIncomingParcels = lazy(() => import("@/pages/receiver/viewIncomingParcels"));

export const receiverSidebarItems: ISidebarItem[] = [
  {
    title: "History",
    items: [
      {
        title: "My Profile",
        url: "/receiver/profile",
        component: ProfileDashboard,
      },
      {
        title: "View incoming parcels",
        url: "/receiver/incoming-parcels",
        component: viewIncomingParcels,
      },
      {
        title: "Confirm parcel delivery",
        url: "/receiver/confirm-parcels",
        component: confirmParcelDelivery,
      },
      {
        title: "View delivery history",
        url: "/receiver/delivery-history",
        component: viewDeliveryHistory,
      },
      
    ],
  },
];