// import { ProfileHeader } from "@/components/profle/ProfileHeader"
// import { ProfileInfoCard } from "@/components/profle/ProfileInfoCard"
// import { RoleBasedStats } from "@/components/profle/RoleBasedStats"
// import {  useUserInfoQuery } from "@/redux/features/auth/auth.api"
// import { useGetDeliveredParcelsQuery, useGetIncomingParcelsQuery, useGetParcelsQuery } from "@/redux/features/Parcel/parcel.api"

// export default function ProfileDashboard() {

//   const {data} = useUserInfoQuery(undefined)
//     const { data: parcels} = useGetParcelsQuery();
//     const { data: deliveredParcels } = useGetDeliveredParcelsQuery();
//     const {data: incomingParcels} = useGetIncomingParcelsQuery()


//   if(!data && !parcels) return null
//   const user = data?.data
// console.log(incomingParcels)
//   return (
//     <div className="min-h-screen w-full bg-muted/30 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="mx-auto max-w-4xl space-y-6">
//         {/* Header Section */}
//         <ProfileHeader
//           name={user.name}
//           role={user.role}
//           isActive={user.isActive}
//           isVerified={user.isVerified}
//           // status={user.status}
//           avatarUrl={user.avatarUrl}
//         />

//         {/* Stats Grid */}
//         {/* <RoleBasedStats role={user.role} stats={user.stats} /> */}
// <RoleBasedStats
//   role={user.role}
//   stats={{
//     createdAt: user.createdAt,
//     updatedAt: user.updatedAt,
//     totalParcels: parcels?.length,
//     cancelledParcels: parcels?.filter(p => p.status === 'CANCELLED').length,
//     parcelsReceived: deliveredParcels?.length,
//     incomingParcels: incomingParcels?.length,
//   }}
// />

//         {/* Main Info Card */}
//         {/* <ProfileInfoCard user={user} /> */}
//       </div>
//     </div>
//   )
// }

import { ProfileHeader } from "@/components/profle/ProfileHeader"
import { ProfileInfoCard } from "@/components/profle/ProfileInfoCard"
import { RoleBasedStats } from "@/components/profle/RoleBasedStats"

import { useUserInfoQuery } from "@/redux/features/auth/auth.api"
import {
  useGetParcelsQuery,
  useGetDeliveredParcelsQuery,
  useGetIncomingParcelsQuery,
} from "@/redux/features/Parcel/parcel.api"

export default function ProfileDashboard() {
  const { data: userRes, isLoading: userLoading } =
    useUserInfoQuery(undefined)

  const user = userRes?.data

  // 🟢 Sender parcels
  const { data: senderParcels } = useGetParcelsQuery(undefined, {
    skip: user?.role !== "SENDER",
  })

  // 🟢 Receiver parcels
  const { data: deliveredParcels } = useGetDeliveredParcelsQuery(undefined, {
    skip: user?.role !== "RECEIVER",
  })

  const { data: incomingParcels } = useGetIncomingParcelsQuery(undefined, {
    skip: user?.role !== "RECEIVER",
  })

  if (userLoading || !user) return null

  return (
    <div className="min-h-screen w-full bg-muted/30 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header */}
        <ProfileHeader
          name={user.name}
          role={user.role}
          isActive={user.isActive}
          isVerified={user.isVerified}
          avatarUrl={user.avatarUrl}
        />

        {/* Stats */}
        <RoleBasedStats
          role={user.role}
          stats={{
            // ADMIN
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,

            // SENDER
            totalParcels: senderParcels?.length,
            cancelledParcels: senderParcels?.filter(
              (p) => p.status === "CANCELLED"
            ).length,

            // RECEIVER
            parcelsReceived: deliveredParcels?.length,
            incomingParcels: incomingParcels?.length,
          }}
        />

        {/* Profile info */}
        <ProfileInfoCard user={user} />
      </div>
    </div>
  )
}
