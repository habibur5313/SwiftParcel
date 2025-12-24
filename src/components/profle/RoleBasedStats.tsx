import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Calendar, Package, History, AlertCircle } from 'lucide-react'
interface RoleBasedStatsProps {
  role: 'ADMIN' | 'SENDER' | 'RECEIVER'
  stats: {
    accountCreated?: string
    lastUpdated?: string
    totalParcels?: number
    cancelledParcels?: number
    parcelsReceived?: number
    deliveryHistory?: number
  }
}
export function RoleBasedStats({ role, stats }: RoleBasedStatsProps) {
  const renderStatCard = (
    title: string,
    value: string | number,
    icon: React.ReactNode,
  ) => (
    <Card className="bg-card/50">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="text-muted-foreground h-4 w-4">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  )
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {role === 'ADMIN' && (
        <>
          {renderStatCard(
            'Account Created',
            stats.accountCreated || '-',
            <Calendar />,
          )}
          {renderStatCard(
            'Last Updated',
            stats.lastUpdated || '-',
            <History />,
          )}
        </>
      )}

      {role === 'SENDER' && (
        <>
          {renderStatCard(
            'Total Parcels',
            stats.totalParcels || 0,
            <Package />,
          )}
          {renderStatCard(
            'Cancelled',
            stats.cancelledParcels || 0,
            <AlertCircle />,
          )}
        </>
      )}

      {role === 'RECEIVER' && (
        <>
          {renderStatCard('Received', stats.parcelsReceived || 0, <Package />)}
          {renderStatCard(
            'History Count',
            stats.deliveryHistory || 0,
            <History />,
          )}
        </>
      )}
    </div>
  )
}
