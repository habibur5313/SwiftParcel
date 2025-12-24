import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router"; // ✅ React Router Link
import {
  Zap,
  Mail,
  ArrowRight,
} from "lucide-react";
import { useEffect } from "react";
import { ServiceHighlights } from "@/components/modules/Home/ServiceHighlights";
import { HowItWorks } from "@/components/modules/Home/HowItWorks";
import { Categories } from "@/components/modules/Home/Categories";

export const About = () => {
    useEffect(() => {
        document.title = "About | SwiftParcel ";
      }, []);
  const { pathname } = useLocation();


  const team = [
    {
      name: "Rahim Uddin",
      role: "Founder & CEO",
      image:
        "https://res.cloudinary.com/dcp9nk3bs/image/upload/v1756290629/sadfsadf_rokety.jpg",
      bio: "Visionary entrepreneur with a passion for building reliable delivery solutions in Bangladesh.",
    },
    {
      name: "Ayesha Khatun",
      role: "Operations Manager",
      image:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=300&h=300&fit=crop&crop=face",
      bio: "Expert in logistics and supply chain, ensuring smooth operations and on-time deliveries.",
    },
    {
      name: "Tanvir Ahmed",
      role: "Tech Lead",
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&h=300&fit=crop&crop=face",
      bio: "Full-stack developer leading the technology powering SwiftParcel’ platform.",
    },
  ];

  return (
    <div className=" bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-600/20 dark:to-purple-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-6 bg-blue-600 hover:bg-blue-700 text-lg px-6 py-2">
            <span className="pacifico-regular text-white">About Swift Parcel</span>
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Fast, Secure & Reliable
            <span className="bg-blue-500 bg-clip-text text-transparent">
              {" "}
              Parcel Delivery
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            SwiftParcel is your trusted partner for sending and receiving
            parcels with speed, reliability, and complete peace of mind. We
            bridge the gap between people and businesses through efficient
            logistics.
          </p>
        </div>
      </section>

      <ServiceHighlights />
              <HowItWorks />
              <Categories />



      {/* Team Section */}
      {pathname === "/about" && (
        <section className="py-20 bg-white dark:bg-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
            <Badge className="mb-6 bg-orange-100 text-orange-800 hover:bg-orange-200">
              Meet Our Team
            </Badge>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-blue-600 font-semibold mb-3">
                      {member.role}
                    </p>
                    <p className="text-slate-400 leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* CTA Section */}
      {pathname === "/about" && (
        <section className="py-20 bg-blue-600 text-white text-center">
          <Zap className="h-16 w-16 mx-auto mb-6 text-yellow-300" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Ship with SwiftParcel?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/parcels">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 font-semibold"
              >
                Send a Parcel
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-whit hover:bg-white text-blue-600 font-semibold"
              >
                <Mail className="mr-2 h-4 w-4" />
                Contact Us
              </Button>
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};
