import deliveryLogin from "@/assets/images/delivery-login.jpg"; // Replace with delivery-themed illustration
import { Link } from "react-router";
import { LoginForm } from "@/components/modules/authentication/LoginForm";
import Logo from "@/assets/icon/Logo";
import { useEffect } from "react";

export default function Login() {
    useEffect(() => {
        document.title = "Login | SwiftParcel ";
      }, []);
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* Left Side - Form */}
      <div className="flex flex-col gap-4 p-6 md:p-10">
        {/* Logo */}
        <div className="flex justify-center gap-2 md:justify-start">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <Logo />
            <span className="hidden sm:inline">SwiftParcel</span>
          </Link>
        </div>

        {/* Login Form */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm bg-card p-6 rounded-2xl shadow-md">
            <LoginForm />
          </div>
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className="relative hidden bg-muted lg:block">
        <img
          src={deliveryLogin}
          alt="SwiftParcel Login Illustration"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.8]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/20" />
        <div className="absolute bottom-10 left-10 text-white space-y-2">
          <h2 className="text-3xl font-bold">Track • Manage • Deliver</h2>
          <p className="max-w-xs text-sm text-gray-200">
            Access your SwiftParcel account to stay updated on every parcel.
          </p>
        </div>
      </div>
    </div>
  );
}
