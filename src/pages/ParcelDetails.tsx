/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useLocation } from "react-router";
import { useGetParcelByIdQuery } from "@/redux/features/Parcel/parcel.api";
import ParcelDetailsPageSkeleton from "@/components/modules/skeleton/ParcelsDetailsPageSkeleton";

export default function ParcelDetailsPage() {
  const { pathname } = useLocation();

  const { data } = useGetParcelByIdQuery<any>(pathname.split("/").pop()!);

  const parcel = data?.data;


  if (!parcel) {
    return <ParcelDetailsPageSkeleton />;
  }


  return (
    <div className="container mx-auto px-4 py-20 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">📦 Parcel Details</h1>
          <p className="text-sm text-muted-foreground">
            Tracking ID:{" "}
            <span className="font-medium">{parcel.trackingId}</span>
          </p>
        </div>

        <Badge
          variant={parcel.status === "DELIVERED" ? "default" : "secondary"}
          className="text-sm px-4 py-1"
        >
          {parcel.status}
        </Badge>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Receiver</CardTitle>
          </CardHeader>
          <CardContent className="font-medium">{parcel.name}</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weight</CardTitle>
          </CardHeader>
          <CardContent>{parcel.weight} kg</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cost</CardTitle>
          </CardHeader>
          <CardContent>${parcel.cost}</CardContent>
        </Card>
      </div>

      {/* Address Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sender */}
        <Card>
          <CardHeader>
            <CardTitle>📤 Sender Address</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm">
            <p>
              <b>Division:</b> {parcel.senderInfo.division}
            </p>
            <p>
              <b>City:</b> {parcel.senderInfo.city}
            </p>
            <p>
              <b>Street:</b> {parcel.senderInfo.street}
            </p>
            <p>
              <b>ZIP:</b> {parcel.senderInfo.zip}
            </p>
          </CardContent>
        </Card>

        {/* Receiver */}
        <Card>
          <CardHeader>
            <CardTitle>📥 Delivery Address</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm">
            <p>
              <b>Division:</b> {parcel.deliveryLocation.division}
            </p>
            <p>
              <b>City:</b> {parcel.deliveryLocation.city}
            </p>
            <p>
              <b>Street:</b> {parcel.deliveryLocation.street}
            </p>
            <p>
              <b>ZIP:</b> {parcel.deliveryLocation.zip}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>🕒 Parcel Timeline</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span>Created At</span>
            <span>{new Date(parcel.createdAt).toLocaleString()}</span>
          </div>
          <Separator />
          <div className="flex justify-between">
            <span>Pickup Date</span>
            <span>{new Date(parcel.pickUpDate).toLocaleString()}</span>
          </div>
          <Separator />
          <div className="flex justify-between">
            <span>Estimated Delivery</span>
            <span>
              {new Date(parcel.estimatedDeliveryDate).toLocaleString()}
            </span>
          </div>
          <Separator />
          <div className="flex justify-between">
            <span>Final Delivery</span>
            <span>{new Date(parcel.deliveryDate).toLocaleString()}</span>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-wrap gap-4">
        <Button variant="outline">Track Parcel</Button>
        {parcel.isBlocked && <Badge variant="destructive">Blocked</Badge>}
      </div>
    </div>
  );
}
