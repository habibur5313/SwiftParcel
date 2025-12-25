/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import config from "@/config";
import { cn } from "@/lib/utils";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export function LoginForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await login(data).unwrap();

      console.log(res.data.user.role);

      if (res.success) {
        toast.success("Welcome back 🚚");

        navigate("/");
      }
    } catch (err: any) {
      console.error("Login Error:", err);
      toast.error(err.data?.message || "Login failed. Please try again.");
    }
  };

  const handleDemoAdminLogin = async () => {
    onSubmit({ email: config.admin_email, password: config.admin_pass });
  };

  const handleReceiverLogin = async () => {
    onSubmit({ email: config.receiver_email, password: config.receiver_pass });
  };

  const handleSenderLogin = async () => {
    onSubmit({ email: config.sender_email, password: config.sender_pass });
  };

  //   const loginHandler = async (data: FieldValues) => {
  //   try {
  //     const res = await login(data).unwrap();

  //     const role = res?.data?.user?.role;

  //     toast.success("Welcome back 🚚");

  //     if (role === "ADMIN") {
  //       navigate("/admin", { replace: true });
  //     } else if (role === "SENDER") {
  //       navigate("/sender/profile", { replace: true });
  //     } else if (role === "RECEIVER") {
  //       navigate("/receiver/profile", { replace: true });
  //     } else {
  //       navigate("/", { replace: true });
  //     }
  //   } catch (err: any) {
  //     console.error("Login Error:", err);
  //     toast.error(err.data?.message || "Login failed. Please try again.");
  //   }
  // };
  // const onSubmit: SubmitHandler<FieldValues> = (data) => {
  //   loginHandler(data);
  // };
  // const handleDemoAdminLogin = () => {
  //   loginHandler({
  //     email: config.admin_email,
  //     password: config.admin_pass,
  //   });
  // };
  // const handleReceiverLogin = () => {
  //   loginHandler({
  //     email: config.receiver_email,
  //     password: config.receiver_pass,
  //   });
  // };
  // const handleSenderLogin = () => {
  //   loginHandler({
  //     email: config.sender_email,
  //     password: config.sender_pass,
  //   });
  // };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {/* Heading */}
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold text-primary">
          Login to SwiftParcel
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your credentials to access your account
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button
          onClick={handleSenderLogin}
          type="submit"
          className=" bg-primary hover:bg-primary/90"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Demo Sender"}
        </Button>
        <Button
          onClick={handleReceiverLogin}
          type="submit"
          className=" bg-primary hover:bg-primary/90"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Demo Receiver"}
        </Button>
        <Button
          onClick={handleDemoAdminLogin}
          type="submit"
          className=" bg-primary hover:bg-primary/90"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Demo Admin"}
        </Button>
      </div>

      {/* Form */}
      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="you@deliveryexpress.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit */}
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Login"}
            </Button>
          </form>
        </Form>

        {/* Divider */}
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>

        {/* Google login */}
        <Button
          onClick={() => window.open(`${config.baseUrl}/auth/google`, "_self")}
          type="button"
          variant="outline"
          className="w-full"
        >
          Login with Google
        </Button>
      </div>

      {/* Footer */}
      <div className="text-center text-sm">
        Don&apos;t have an account?
        <Link
          to="/register"
          className="underline underline-offset-4 text-primary"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
