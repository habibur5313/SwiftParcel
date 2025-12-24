import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const ProfileDashboard = lazy(() => import("@/pages/common/Profile"));
const cancelParcel = lazy(() => import("@/pages/sender/CancelParcel"));
const createParcelDeliveryRequests = lazy(
  () => import("@/pages/sender/createParcelDeliveryRequests")
);
const viewAllCreatedParcels = lazy(
  () => import("@/pages/sender/viewAllCreatedParcels")
);

export const senderSidebarItems: ISidebarItem[] = [
  {
    title: "SwiftParcel",
    items: [
      {
        title: "My Profile",
        url: "/sender/profile",
        component: ProfileDashboard,
      },
      {
        title: "Create parcel delivery request",
        url: "/sender/parcel-request",
        component: createParcelDeliveryRequests,
      },
      {
        title: "Cancel parcel",
        url: "/sender/cancel-parcel",
        component: cancelParcel,
      },
      {
        title: "View all created parcels",
        url: "/sender/all-created-parcels",
        component: viewAllCreatedParcels,
      },
    ],
  },
];
