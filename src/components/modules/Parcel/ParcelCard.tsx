
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { Copy } from "lucide-react"; // 👈 icon import

type Parcel = {
  _id: string;
  name: string;
  trackingId: string;
  status: string;
  senderInfo: {
    division: string;
    city: string;
    zip: number;
    street: string;
  };
  deliveryLocation: {
    division: string;
    city: string;
    zip: number;
    street: string;
  };
  weight: number;
  cost: number;
  pickUpDate: string;
  estimatedDeliveryDate: string;
};

interface ParcelCardProps {
  parcel: Parcel;
  onCancel?: (id: string, status: string) => void;
  onConfirm?: (id: string, status: string) => void;
}

export const ParcelCard: React.FC<ParcelCardProps> = ({
  parcel,
  onCancel = () => {},
  onConfirm = () => {},
}) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(parcel.trackingId);
      Swal.fire("Copied!", "Tracking ID copied to clipboard", "success");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      Swal.fire("Error", "Failed to copy tracking ID", "error");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto my-4 shadow-md hover:shadow-lg transition">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg font-semibold">{parcel.name}</CardTitle>
            <CardDescription className="text-sm text-gray-500 flex items-center gap-2">
              Tracking ID: {parcel.trackingId}
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCopy}
                className="h-6 w-6 p-0"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </CardDescription>
          </div>
          <Badge
            variant={parcel.status === "REQUESTED" ? "outline" : "default"}
            className="uppercase"
          >
            {parcel.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 text-sm">
        <div>
          <strong>Sender:</strong> {parcel.senderInfo.division}, {parcel.senderInfo.city},{" "}
          {parcel.senderInfo.street} - {parcel.senderInfo.zip}
        </div>
        <div>
          <strong>Delivery:</strong> {parcel.deliveryLocation.division}, {parcel.deliveryLocation.city},{" "}
          {parcel.deliveryLocation.street} - {parcel.deliveryLocation.zip}
        </div>
        <div className="flex justify-between">
          <span>
            <strong>Weight:</strong> {parcel.weight} kg
          </span>
          <span>
            <strong>Cost:</strong> ${parcel.cost}
          </span>
        </div>
        <div>
          <strong>Pick Up:</strong> {new Date(parcel.pickUpDate).toLocaleString()}
        </div>
        <div>
          <strong>Estimated Delivery:</strong>{" "}
          {new Date(parcel.estimatedDeliveryDate).toLocaleString()}
        </div>
      </CardContent>

      <CardFooter className="flex justify-end gap-2">
        <Button className="cursor-pointer" variant="outline" onClick={() => navigate(`/parcels/${parcel._id}`)}>
          View Details
        </Button>

        {pathname === "/sender/cancel-parcel" && (
          <Button
            variant="destructive"
            onClick={() => {
              Swal.fire({
                title: "Do you want to cancel parcel?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Yes",
                denyButtonText: `No`,
              }).then((result) => {
                if (result.isConfirmed) {
                  onCancel(parcel._id, parcel.status);
                } else if (result.isDenied) {
                  Swal.fire("Parcel not canceled", "", "info");
                }
              });
            }}
          >
            Cancel Parcel
          </Button>
        )}

        {pathname === "/receiver/confirm-parcels" && (
          <Button
            variant="destructive"
            onClick={() => {
              Swal.fire({
                title: "Do you want to confirm parcel?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Yes",
                denyButtonText: `No`,
              }).then((result) => {
                if (result.isConfirmed) {
                  onConfirm(parcel._id, parcel.status);
                } else if (result.isDenied) {
                  Swal.fire("Parcel not confirmed", "", "info");
                }
              });
            }}
          >
            I have Received It
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};