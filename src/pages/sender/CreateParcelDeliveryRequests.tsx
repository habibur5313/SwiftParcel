/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  useLazyGetUserByEmailQuery,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { useAddParcelMutation } from "@/redux/features/Parcel/parcel.api";
import {
  parcelFormSchema,
  type Divisions,
  type ParcelFormSchema,
} from "@/types";
// import { IErrorResponse } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect } from "react";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";

export default function CreateParcelPage() {
  useEffect(() => {
    document.title = "Dashboard | SwiftParcel ";
  }, []);
  const { data } = useUserInfoQuery(undefined);
  const [getUserByEmail] = useLazyGetUserByEmailQuery();
  const [addParcel, { isLoading }] = useAddParcelMutation();
  const navigate = useNavigate();
  const currentUserId = data?.data?._id;
  const form = useForm<ParcelFormSchema>({
    resolver: zodResolver(parcelFormSchema),
    defaultValues: {
      name: "",
      senderInfo: {
        division: "SYLHET" as Divisions,
        city: "",
        zip: "",
        street: "",
      },
      deliveryLocation: {
        division: "DHAKA" as Divisions,
        city: "",
        zip: "",
        street: "",
      },
      sameDivision: false,
      sender: data?.data?._id,
      receiver: "",
      weight: 0,
      estimatedDeliveryDate: new Date(),
      pickUpDate: new Date(),
      deliveryDate: null,
      cost: 0,
    },
  });

  const divisions = [
    "DHAKA",
    "CHITTAGONG",
    "KHULNA",
    "RAJSHAHI",
    "BARISHAL",
    "SYLHET",
    "RANGPUR",
    "MYMENSINGH",
  ];

  const handleSubmit = async (data: z.infer<typeof parcelFormSchema>) => {
    try {
      const res = await getUserByEmail(data.receiver).unwrap();

      // 2️⃣ Role check
      if (res.data === null || res.data.role !== "RECEIVER") {
        toast.error("Receiver not found!. Please provide a receiver email.");
        return;
      }

      // 3️⃣ Payload create
      const payload = {
        ...data,
        sender: currentUserId, // logged-in user
        receiver: res.data._id, // validated receiver
      };

      // 4️⃣ Parcel create API call
      const result = await addParcel(payload).unwrap();
      if (result.success) {
        toast.success("Parcel created successfully");
        navigate("/sender/all-created-parcels");
      }
    } catch (err: any) {
      toast.error(err.data.message);
    }
  };

  return (
    <div className="w-full sm:max-w-4xl mx-auto sm:px-5 mt-16">
      <Card>
        <CardHeader>
          <CardTitle>Add parcel</CardTitle>
          <CardDescription>Add a parcel to the system</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              id="add-parcel-form"
              className="space-y-5"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              {/* Parcel name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parcel Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g. Electronics Parcel" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Sender + Receiver */}
              <div className="flex gap-5">
                <FormField
                  control={form.control}
                  name="sender"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Sender Name</FormLabel>
                      <FormControl>
                        <Input {...field} value={data?.data?.name ?? ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="receiver"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Receiver email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          {...field}
                          placeholder="receiver@exaple.com"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Sender Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                <FormField
                  control={form.control}
                  name="senderInfo.division"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Division</FormLabel>
                      <Select
                        onValueChange={(value: Divisions) =>
                          field.onChange(value)
                        }
                        value={field.value || "DHAKA"} // default value
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select division" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="w-full">
                          {divisions.map((div) => (
                            <SelectItem
                              key={div}
                              value={div as Divisions}
                              className="w-full"
                            >
                              {div}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="senderInfo.city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sender City</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g. Sreemongal" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="senderInfo.zip"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sender ZIP</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          placeholder="e.g. 3210"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="senderInfo.street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sender Street</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="123 Main Street" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Delivery Location */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                <FormField
                  control={form.control}
                  name="deliveryLocation.division"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Division</FormLabel>
                      <Select
                        onValueChange={(value: Divisions) =>
                          field.onChange(value)
                        }
                        value={field.value || "DHAKA"} // default value
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select division" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="w-full">
                          {divisions.map((div) => (
                            <SelectItem
                              key={div}
                              value={div as Divisions}
                              className="w-full"
                            >
                              {div}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="deliveryLocation.city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Delivery City</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g. Motijheel" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="deliveryLocation.zip"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Delivery ZIP</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          placeholder="e.g. 1200"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="deliveryLocation.street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Delivery Street</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="House 45, Road 10" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Cost + Weight */}
              <div className="flex gap-5">
                <FormField
                  control={form.control}
                  name="cost"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Cost</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber)
                          } // 👈 converts string -> number
                          placeholder="e.g. 150"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Weight (kg)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber)
                          }
                          placeholder="e.g. 2.5"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Dates */}
              <div className="flex flex-col sm:flex-row gap-5">
                <FormField
                  control={form.control}
                  name="pickUpDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col flex-1">
                      <FormLabel>Pick-up Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(new Date(field.value), "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={
                              field.value ? new Date(field.value) : undefined
                            }
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="estimatedDeliveryDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col flex-1">
                      <FormLabel>Estimated Delivery Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(new Date(field.value), "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={
                              field.value ? new Date(field.value) : undefined
                            }
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Optional delivery date */}
              <FormField
                control={form.control}
                name="deliveryDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Delivery Date (optional)</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(new Date(field.value), "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent align="start" className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button disabled={isLoading} type="submit" form="add-parcel-form">
            {isLoading ? "Creating..." : "Create Tour"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
