import { ParcelCard } from "@/components/modules/Parcel/ParcelCard";
import { ParcelsPageSkeleton } from "@/components/modules/skeleton/ParcelsPageSkeleton";
import {
  useConfirmDeliveryMutation,
  useGetIncomingParcelsQuery,
} from "@/redux/features/Parcel/parcel.api";
import { useEffect } from "react";
import { toast } from "sonner";

const ConfirmParcelDelivery = () => {
     useEffect(() => {
          document.title = "Dashboard | SwiftParcel ";
        }, []);
  const { data: incomingParcels, isLoading } = useGetIncomingParcelsQuery();
  const [confirmDelivery] = useConfirmDeliveryMutation();

  const handleConfirm = async (id: string, status: string) => {
    if (status === "DELIVERED") {
      return toast.error("This parcel is already delivered");
    }
    try {
      const res = await confirmDelivery(id).unwrap(); // call mutation
      if (res.success) {
        toast.success("Parcel confirm successfully!");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

if (isLoading) {
    // Optionally toggle action button skeletons based on pathname
    const pathname = window.location.pathname;
    const showCancelButton = pathname === "/sender/cancel-parcel";
    const showConfirmButton = pathname === "/receiver/confirm-parcels";

    return (
      <ParcelsPageSkeleton
        showCancelButton={showCancelButton}
        showConfirmButton={showConfirmButton}
      />
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold">Confirm Parcel</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {incomingParcels?.length ? (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          incomingParcels.map((parcel: any) => (
            <ParcelCard
              key={parcel._id}
              parcel={parcel}
              onConfirm={handleConfirm}
            ></ParcelCard>
          ))
        ) : (
          <div>No parcels found</div>
        )}
      </div>
    </div>
  );
};

export default ConfirmParcelDelivery;
