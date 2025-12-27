import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import {
  Calendar,
  Package,
  History,
  AlertCircle,
  CheckCircle,
} from 'lucide-react'

interface RoleBasedStatsProps {
  role: 'ADMIN' | 'SENDER' | 'RECEIVER'
  stats: {
    createdAt?: string
    updatedAt?: string
    totalParcels?: number
    cancelledParcels?: number
    parcelsReceived?: number
    incomingParcels?: number
  }
}

export function RoleBasedStats({ role, stats }: RoleBasedStatsProps) {
  const renderStatCard = (
    title: string,
    value: string | number,
    icon: React.ReactNode,
  ) => (
    <Card className="rounded-xl border-border/50 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
      </CardContent>
    </Card>
  )

  const formatDate = (date?: string) =>
    date ? new Date(date).toLocaleDateString() : '-'

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* ADMIN */}
      {role === 'ADMIN' && (
        <>
          {renderStatCard(
            'Account Created',
            formatDate(stats.createdAt),
            <Calendar className="h-4 w-4" />,
          )}
          {renderStatCard(
            'Last Updated',
            formatDate(stats.updatedAt),
            <History className="h-4 w-4" />,
          )}
        </>
      )}

      {/* SENDER */}
      {role === 'SENDER' && (
        <>
          {renderStatCard(
            'Total Parcels',
            stats.totalParcels ?? 0,
            <Package className="h-4 w-4" />,
          )}
          {renderStatCard(
            'Cancelled Parcels',
            stats.cancelledParcels ?? 0,
            <AlertCircle className="h-4 w-4 text-red-500" />,
          )}
        </>
      )}

      {/* RECEIVER */}
      {role === 'RECEIVER' && (
        <>
          {renderStatCard(
            'Parcels Received',
            stats.parcelsReceived ?? 0,
            <CheckCircle className="h-4 w-4 text-green-500" />,
          )}
          {renderStatCard(
            'Incoming Parcels',
            stats.incomingParcels ?? 0,
            <History className="h-4 w-4" />,
          )}
        </>
      )}
    </div>
  )
}
