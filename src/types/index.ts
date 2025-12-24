/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ComponentType } from "react";
import { z } from "zod";

export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

export interface ISidebarItem {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}

export type TRole = "ADMIN" | "SENDER" | "RECEIVER";

export type Divisions =
  | "DHAKA"
  | "CHITTAGONG"
  | "KHULNA"
  | "RAJSHAHI"
  | "BARISHAL"
  | "SYLHET"
  | "RANGPUR"
  | "MYMENSINGH";

export const parcelFormSchema = z.object({
  name: z.string().min(1, "Parcel name is required"),
  senderInfo: z.object({
    division: z.string().min(1, "Sender division is required"),
    city: z.string().min(1, "Sender city is required"),
    zip: z.string().min(3, "Sender zip is required"),
    street: z.string().min(1, "Sender street is required"),
  }),

  deliveryLocation: z.object({
    division: z.enum([
      "DHAKA",
      "CHITTAGONG",
      "KHULNA",
      "RAJSHAHI",
      "BARISHAL",
      "SYLHET",
      "RANGPUR",
      "MYMENSINGH",
    ]),
    city: z.string().min(1, "Delivery city is required"),
    zip: z.string().min(3, "Delivery zip is required"),
    street: z.string().min(1, "Delivery street is required"),
  }),

  sameDivision: z.boolean(),

  sender: z.string().optional(),
  receiver: z.email("Receiver email is required"),

  weight: z
    .number({ error: "Weight must be a number" })
    .positive("Weight must be greater than 0"),

  estimatedDeliveryDate: z.date().min(1, "Estimated delivery date is required"),
  pickUpDate: z.date().min(1, "Pick up date is required"),
  deliveryDate: z.date().nullable(),

  cost: z
    .number({ error: "Cost must be a number" })
    .nonnegative("Cost cannot be negative"),
});

export type ParcelFormSchema = z.infer<typeof parcelFormSchema>;

export interface IParcel {
  _id: string;
  name: string;
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
  status: string;
  weight: number;
  cost: number;
  trackingId: string;
  estimatedDeliveryDate: string;
  pickUpDate: string;
  isBlocked: boolean;
}

export interface Parcel {
  _id: string
  name: string
  senderInfo: SenderInfo
  deliveryLocation: DeliveryLocation
  sameDivision: boolean
  sender: string
  receiver: string
  status: string
  weight: number
  estimatedDeliveryDate: string
  pickUpDate: string
  isBlocked: boolean
  cost: number
  trackingEvents: any[]
  createdAt: string
  updatedAt: string
  trackingId: string
  cancelledAt: string
}

export interface SenderInfo {
  division: string
  city: string
  zip: number
  street: string
}

export interface DeliveryLocation {
  division: string
  city: string
  zip: number
  street: string
}

export type ParcelResponse = {
  statusCode: number;
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: Parcel[];
};

export type User = {
parcels: any[]
  _id: string
  name: string
  email: string
  role: string
  isDeleted: boolean
  isActive: string
  isVerified: boolean
  auths: Auth[]
  createdAt: string
  updatedAt: string
}

export interface Auth {
  _id: string
  provider: string
  providerId: string
}


export type UserResponse = {
  statusCode: number;
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: User[];
};

export interface IParcelResponse {
  isLoading: boolean;
  isError: boolean;
  data: ParcelResponse
}

export interface IUserResponse {
  isLoading: boolean;
  data: UserResponse
}