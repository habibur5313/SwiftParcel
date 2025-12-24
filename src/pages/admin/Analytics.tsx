import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Parcels from "./Parcels";
import ManageAllUsers from "./ManageAllUsers";

const parcelStats = [
  { name: "Delivered", value: 120 },
  { name: "Pending", value: 45 },
  { name: "In Transit", value: 30 },
  { name: "Cancelled", value: 10 },
];

const monthlyData = [
  { month: "Jan", parcels: 40 },
  { month: "Feb", parcels: 55 },
  { month: "Mar", parcels: 75 },
  { month: "Apr", parcels: 90 },
  { month: "May", parcels: 60 },
];

const COLORS = ["#22c55e", "#eab308", "#3b82f6", "#ef4444"];

export default function Analytics() {
  useEffect(() => {
    document.title = "Dashboard | SwiftParcel";
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Page Title */}
      <h1 className="text-xl sm:text-2xl font-bold text-center md:text-left">
        SwiftParcel Analytics
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {parcelStats.map((stat, i) => (
          <Card
            key={i}
            className="shadow-md rounded-2xl hover:shadow-lg transition-all duration-300"
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm sm:text-base">
                {stat.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg sm:text-2xl font-semibold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <Card className="shadow-md rounded-2xl">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">
              Monthly Parcels
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[250px] sm:h-[300px] md:h-[360px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <XAxis dataKey="month" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Bar dataKey="parcels" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card className="shadow-md rounded-2xl">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">
              Parcel Status Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[250px] sm:h-[300px] md:h-[360px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={parcelStats}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius="70%"
                  label
                >
                  {parcelStats.map((_entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* ✅ Table Sections */}
      <div className="space-y-6">
        <div className="overflow-x-auto rounded-xl  shadow-sm p-2">
          <Parcels />
        </div>

        <div className="overflow-x-auto rounded-xl  shadow-sm p-2">
          <ManageAllUsers />
        </div>
      </div>
    </div>
  );
}
