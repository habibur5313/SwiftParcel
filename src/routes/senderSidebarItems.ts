import type { ISidebarItem } from "@/types";
import { lazy } from "react";

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
