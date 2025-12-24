import { ProfileHeader } from "@/components/profle/ProfileHeader"
import { ProfileInfoCard } from "@/components/profle/ProfileInfoCard"
import { RoleBasedStats } from "@/components/profle/RoleBasedStats"

// Mock Data
const MOCK_USER = {
  name: 'Sarah Jenkins',
  email: 'sarah.jenkins@logistics.co',
  role: 'SENDER' as const,
  status: 'Verified' as const,
  provider: 'Email Authentication',
  avatarUrl:
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80',
  stats: {
    totalParcels: 142,
    cancelledParcels: 3,
    accountCreated: 'Jan 12, 2023',
    lastUpdated: '2 days ago',
    parcelsReceived: 0,
    deliveryHistory: 0,
  },
}
export default function ProfileDashboard() {
  return (
    <div className="min-h-screen w-full bg-muted/30 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header Section */}
        <ProfileHeader
          name={MOCK_USER.name}
          role={MOCK_USER.role}
          status={MOCK_USER.status}
          avatarUrl={MOCK_USER.avatarUrl}
        />

        {/* Stats Grid */}
        <RoleBasedStats role={MOCK_USER.role} stats={MOCK_USER.stats} />

        {/* Main Info Card */}
        <ProfileInfoCard user={MOCK_USER} />
      </div>
    </div>
  )
}
