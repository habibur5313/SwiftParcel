"use client";

import {
  Card,
  CardContent,
} from '../ui/card'
import { Button } from '../ui/button'
import { Pencil, CheckCircle, XCircle } from 'lucide-react'
import { Badge } from '../ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

interface ProfileHeaderProps {
  name: string
  role: 'ADMIN' | 'SENDER' | 'RECEIVER'
  isActive: 'ACTIVE' | 'INACTIVE'
  isVerified: boolean
  avatarUrl?: string
}

export function ProfileHeader({
  name,
  role,
  isActive,
  isVerified,
  avatarUrl,
}: ProfileHeaderProps) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <Card className="w-full shadow-md border-border/50 rounded-2xl">
      <CardContent className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Avatar */}
          <div className="relative">
            <Avatar className="w-24 h-24 border-4 border-background shadow-sm">
              <AvatarImage src={avatarUrl} alt={name} />
              <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">
                {initials}
              </AvatarFallback>
            </Avatar>

            {/* Mobile edit */}
            <div className="absolute bottom-0 right-0 md:hidden">
              <Button
                size="icon"
                variant="secondary"
                className="h-8 w-8 rounded-full shadow-sm"
              >
                <Pencil className="h-4 w-4" />
                <span className="sr-only">Edit profile</span>
              </Button>
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left space-y-2">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 justify-center md:justify-start">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                {name}
              </h1>

              <div className="flex gap-2 flex-wrap justify-center md:justify-start">
                {/* Role */}
                <Badge variant="secondary" className="font-semibold">
                  {role}
                </Badge>

                {/* Active status */}
                {isActive === 'ACTIVE' ? (
                  <Badge className="gap-1 bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                    <CheckCircle className="h-3.5 w-3.5" /> Active
                  </Badge>
                ) : (
                  <Badge className="gap-1 bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400">
                    <XCircle className="h-3.5 w-3.5" /> Inactive
                  </Badge>
                )}

                {/* Verified status */}
                {isVerified ? (
                  <Badge variant="outline" className="text-blue-600 border-blue-200 dark:border-blue-800 dark:text-blue-400">
                    Verified
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-muted-foreground">
                    Not Verified
                  </Badge>
                )}
              </div>
            </div>

            <p className="text-muted-foreground text-sm md:text-base">
              Manage your personal information and account security.
            </p>
          </div>

          {/* Desktop edit */}
          <div className="hidden md:block">
            <Button variant="outline" size="sm" className="gap-2">
              <Pencil className="h-4 w-4" />
              Edit Profile
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
