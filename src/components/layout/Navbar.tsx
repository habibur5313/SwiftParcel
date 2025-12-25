import { useEffect, useState } from "react";
import { Package, Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router";
import {
  authApi,
  useLogoutMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hook";
import { role } from "@/constants";
import { ModeToggle } from "../mode.toggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: "/", label: "Home", role: "PUBLIC" },
  { href: "/parcels", label: "parcels", role: "PUBLIC" },
  { href: "/about", label: "About", role: "PUBLIC" },
  { href: "/contact", label: "Contact", role: "PUBLIC" },
  { href: "/faq", label: "FAQ", role: "PUBLIC" },
  { href: "/admin", label: "Dashboard", role: role.Admin },
  { href: "/sender", label: "Dashboard", role: role.Sender },
  { href: "/receiver", label: "Dashboard", role: role.Receiver },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { data } = useUserInfoQuery(undefined);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout(undefined);
    dispatch(authApi.util.resetApiState());
  };
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 dark:bg-slate-900 backdrop-blur-sm shadow-sm py-3"
          : "bg-transparent  py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Package className="h-6 w-6 text-white" />
            </div>
            <span
              className={`text-xl font-bold tracking-tight ${
                isScrolled
                  ? "text-slate-900 dark:text-slate-50"
                  : "text-slate-900 dark:text-slate-50"
              }`}
            >
              SwiftParcel
            </span>
          </div>

          {/* Desktop Navigation */}
          {/* Navigation menu */}
          <div className="flex gap-0 items-center max-md:hidden">
            <NavigationMenu className="">
              <NavigationMenuList className="gap-2">
                {navigationLinks.map((link, index) => (
                  <div key={index}>
                    {link.role === "PUBLIC" && (
                      <NavigationMenuItem key={index}>
                        <NavigationMenuLink
                          asChild
                          className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                        >
                          <Link to={link.href}>{link.label}</Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    )}
                  </div>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            {data?.data?.role === role.Sender && (
              <NavigationMenu className="-ml-6">
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-muted-foreground hover:text-primary py-1.5 font-medium">
                      Dashboard
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[200px] ">
                        <NavigationMenuLink
                          asChild
                          className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                        >
                          <Link to={"/sender/profile"}>
                            My Profile
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink
                          asChild
                          className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                        >
                          <Link to={"/sender/parcel-request"}>
                            parcel request
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink
                          asChild
                          className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                        >
                          <Link to={"/sender/cancel-parcel"}>
                            cancel parcel
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink
                          asChild
                          className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                        >
                          <Link to={"/sender/all-created-parcels"}>
                            created parcels
                          </Link>
                        </NavigationMenuLink>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            )}

            {data?.data?.role === role.Receiver && (
              <NavigationMenu className="-ml-6">
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-muted-foreground hover:text-primary py-1.5 font-medium">
                      Dashboard
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[200px] ">
                        <NavigationMenuLink
                          asChild
                          className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                        >
                          <Link to={"/receiver/profile"}>
                            My Profile
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink
                          asChild
                          className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                        >
                          <Link to={"/receiver/incoming-parcels"}>
                            incoming parcel
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink
                          asChild
                          className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                        >
                          <Link to={"/receiver/confirm-parcels"}>
                            confirm parcel
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink
                          asChild
                          className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                        >
                          <Link to={"/receiver/delivery-history"}>
                            delivery history
                          </Link>
                        </NavigationMenuLink>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            )}

            {data?.data?.role === role.Admin && (
              <NavigationMenu className="-ml-6">
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-muted-foreground hover:text-primary py-1.5 font-medium">
                      Dashboard
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[200px] ">
                        <NavigationMenuLink
                          asChild
                          className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                        >
                          <Link to={"/admin/analytics"}>analytics</Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink
                          asChild
                          className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                        >
                          <Link to={"/admin/profile"}>
                            My Profile
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink
                          asChild
                          className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                        >
                          <Link to={"/admin/all-users"}>users</Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink
                          asChild
                          className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                        >
                          <Link to={"/admin/parcels"}>parcels</Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink
                          asChild
                          className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                        >
                          <Link to={"/admin/update-status"}>
                            update parcel status
                          </Link>
                        </NavigationMenuLink>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            )}
          </div>

          {/* Right side */}
          <div className="items-center gap-2 hidden md:flex">
            <ModeToggle />
            {data?.data?.email && (
              <Button
                onClick={handleLogout}
                variant="outline"
                className="text-sm"
              >
                Logout
              </Button>
            )}
            {!data?.data?.email && (
              <Button asChild className="text-sm">
                <Link to="/login">Login</Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-slate-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        {/* Mobile Menu Button */}

        {/* Drawer */}
        <SheetContent
          side="right"
          className="w-[75%] sm:max-w-sm md:hidden bg-background text-foreground"
        >
          <SheetHeader>
            <SheetTitle className="text-lg font-semibold">Menu</SheetTitle>
          </SheetHeader>

          {/* Content */}
          <div className="mt-6 flex flex-col gap-5">
            {/* Public Links */}
            {navigationLinks.map(
              (link, index) =>
                link.role === "PUBLIC" && (
                  <Link
                    key={index}
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-sm font-medium hover:text-primary transition"
                  >
                    {link.label}
                  </Link>
                )
            )}

            {/* ================= Sender ================= */}
            {data?.data?.role === role.Sender && (
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Dashboard</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-2 p-4 w-[220px]">
                        <Link to="/sender/profile">My Profile</Link>
                        <Link to="/sender/parcel-request">Parcel Request</Link>
                        <Link to="/sender/cancel-parcel">Cancel Parcel</Link>
                        <Link to="/sender/all-created-parcels">
                          Created Parcels
                        </Link>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            )}

            {/* ================= Receiver ================= */}
            {data?.data?.role === role.Receiver && (
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Dashboard</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-2 p-4 w-[220px]">
                        <Link to="/receiver/profile">
                          My Profile
                        </Link>
                        <Link to="/receiver/incoming-parcels">
                          Incoming Parcels
                        </Link>
                        <Link to="/receiver/confirm-parcels">
                          Confirm Parcel
                        </Link>
                        <Link to="/receiver/delivery-history">
                          Delivery History
                        </Link>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            )}

            {/* ================= Admin ================= */}
            {data?.data?.role === role.Admin && (
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Dashboard</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-2 p-4 w-[220px]">
                        <Link to="/admin/analytics">Analytics</Link>
                        <Link to="/admin/profile">My Profile</Link>
                        <Link to="/admin/all-users">Users</Link>
                        <Link to="/admin/parcels">Parcels</Link>
                        <Link to="/admin/update-status">
                          Update Parcel Status
                        </Link>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            )}
          </div>

          {/* Footer */}
          <div className="mt-auto pt-6 border-t flex gap-3">
            <ModeToggle />
            {data?.data?.email ? (
              <Button
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                variant="outline"
                className="w-full"
              >
                Logout
              </Button>
            ) : (
              <Button asChild className="w-full">
                <Link to="/login">Login</Link>
              </Button>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
