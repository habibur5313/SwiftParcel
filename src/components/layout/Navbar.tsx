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
                  {link.role === data?.data?.role && (
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

          <NavigationMenu className="-ml-6">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-muted-foreground hover:text-primary py-1.5 font-medium">Dashboard</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink
                    asChild
                    className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                  >
                    <Link to={"/"}>parcel create</Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    asChild
                    className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                  >
                    <Link to={"/"}>parcel create</Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    asChild
                    className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                  >
                    <Link to={"/"}>parcel create</Link>
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
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
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-100 shadow-lg p-4 flex flex-col gap-4 animate-in slide-in-from-top-5">
          {navigationLinks.map((link, index) => (
            <div key={index}>
              {link.role === "PUBLIC" && (
                <Link
                  to={link.href}
                  className="text-slate-900 text-sm font-medium hover:text-blue-600 transition-colors"
                >
                  {link.label}
                </Link>
              )}
              {link.role === data?.data?.role && (
                <Link
                  to={link.href}
                  className="text-slate-900 text-sm font-medium hover:text-blue-600 transition-colors"
                >
                  {link.label}
                </Link>
              )}
            </div>
          ))}
          <div className="flex items-center gap-2">
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
        </div>
      )}
    </header>
  );
}
