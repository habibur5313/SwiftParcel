import React, { useState } from 'react'
import { Lock, User, Mail, Shield, Activity, BadgeCheck } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

interface ProfileInfoCardProps {
  user: {
    name: string
    email: string
    role: 'ADMIN' | 'SENDER' | 'RECEIVER'
    isActive: 'ACTIVE' | 'INACTIVE'
    isVerified: boolean
    auths: {
      provider: string
    }[]
  }
}

export function ProfileInfoCard({ user }: ProfileInfoCardProps) {
  const [name, setName] = useState(user.name)
  const [isDirty, setIsDirty] = useState(false)

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
    setIsDirty(e.target.value.trim() !== user.name)
  }

  const provider = user.auths?.[0]?.provider ?? 'credentials'

  return (
    <Card className="w-full rounded-2xl shadow-sm border-border/50">
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>
          View and update your personal information.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                value={name}
                onChange={handleNameChange}
                className="pl-9"
                placeholder="Enter your name"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                value={user.email}
                disabled
                className="pl-9 bg-muted/50"
              />
            </div>
          </div>

          {/* Role */}
          <div className="space-y-2">
            <Label htmlFor="role">Account Role</Label>
            <div className="relative">
              <Shield className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="role"
                value={user.role}
                disabled
                className="pl-9 bg-muted/50 capitalize"
              />
            </div>
          </div>

          {/* Active Status */}
          <div className="space-y-2">
            <Label htmlFor="status">Account Status</Label>
            <div className="relative">
              <Activity className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="status"
                value={user.isActive === 'ACTIVE' ? 'Active' : 'Inactive'}
                disabled
                className="pl-9 bg-muted/50"
              />
            </div>
          </div>

          {/* Verified */}
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="verified">Verification</Label>
            <div className="relative">
              <BadgeCheck className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="verified"
                value={user.isVerified ? 'Verified' : 'Not Verified'}
                disabled
                className="pl-9 bg-muted/50"
              />
            </div>
          </div>

          {/* Auth Provider */}
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="provider">Authentication Provider</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="provider"
                value={provider}
                disabled
                className="pl-9 bg-muted/50 capitalize"
              />
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col sm:flex-row gap-3 justify-between border-t bg-muted/10 p-6">
        <Button variant="outline" className="w-full sm:w-auto">
          Change Password
        </Button>

        <Button className="w-full sm:w-auto" disabled={!isDirty}>
          Update Profile
        </Button>
      </CardFooter>
    </Card>
  )
}
