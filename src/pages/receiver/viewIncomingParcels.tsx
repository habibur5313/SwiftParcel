import { ParcelCard } from "@/components/modules/Parcel/ParcelCard";
import { ParcelsPageSkeleton } from "@/components/modules/skeleton/ParcelsPageSkeleton";
import { useGetIncomingParcelsQuery } from "@/redux/features/Parcel/parcel.api";

const ViewIncomingParcels = () => {
  const {data: incomingParcels,isLoading} = useGetIncomingParcelsQuery()
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
      <h1 className="text-2xl font-semibold">Incoming Parcels</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {incomingParcels?.length ? (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        incomingParcels.map((parcel: any) => (
          <ParcelCard key={parcel._id} parcel={parcel}></ParcelCard>
        ))
      ) : (
        <div>No parcels found</div>
      )}
      </div>
    </div>
  )
}

export default ViewIncomingParcels;