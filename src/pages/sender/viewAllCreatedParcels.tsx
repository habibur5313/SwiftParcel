import { ParcelCard } from "@/components/modules/Parcel/ParcelCard";
import { ParcelsPageSkeleton } from "@/components/modules/skeleton/ParcelsPageSkeleton";
import { useGetParcelsQuery } from "@/redux/features/Parcel/parcel.api";
import { useEffect } from "react";

export default function ViewAllCreatedParcels  ()  {
    useEffect(() => {
        document.title = "Dashboard | SwiftParcel ";
      }, []);
  const { data: parcels, isLoading, error } = useGetParcelsQuery();

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
  if (error) return <div>Error loading parcels</div>;
  return (
    <div>
      <h1 className="text-2xl font-semibold">View All Created Parcels</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {parcels?.length ? (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        parcels.map((parcel: any) => (
          <ParcelCard key={parcel._id} parcel={parcel}></ParcelCard>
        ))
      ) : (
        <div>No parcels found</div>
      )}
      </div>
    </div>
  );
};
