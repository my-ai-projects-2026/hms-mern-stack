import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  signinServerAction,
  signInSchema,
  type SignInSchema,
} from "#/features/auth/actions/signin.action";
import { useTransition } from "react";
import { toast } from "sonner";
import ButtonLoading from "#/components/shared/buttons/button-loading";
import InputField from "#/components/shared/inputs/input-field";

export const Route = createFileRoute("/(auth)/sign-in/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [pending, startTransition] = useTransition();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data: SignInSchema) => {
    startTransition(async () => {
      try {
        await signinServerAction({ data });
        toast.success("Sign in successful");
        navigate({ to: "/" });
      } catch (error: any) {
        toast.error(error.message);
      }
    });
  };

  return (
    <>
      <Card className="rise-in z-10 w-full max-w-md border border-white/5 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] bg-[#161a22]/80 backdrop-blur-xl rounded-[24px] mx-4">
        <CardHeader className="flex flex-col items-center space-y-4 pb-6 pt-8">
          <div className="w-14 h-14 bg-[#0066FF] p-1.5 rounded-2xl flex items-center justify-center shadow-[0_0_15px_rgba(0,102,255,0.4)] text-white relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
            </svg>
          </div>
          <div className="text-center space-y-1">
            <CardTitle className="text-3xl font-bold tracking-tight text-white">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-slate-400 font-medium max-w-[250px] mx-auto text-sm">
              Sign in to access your hospital dashboard.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-5"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <InputField
              label="Email Address"
              type="email"
              placeholder="doctor@hospital.com"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              }
              name="email"
              control={form.control}
            />

            <InputField
              label="Password"
              type="password"
              placeholder="••••••••"
              labelRight={
                <a
                  href="#"
                  className="text-xs font-semibold text-[#0066FF] hover:text-[#3385ff] transition-colors"
                >
                  Forgot password?
                </a>
              }
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              }
              name="password"
              control={form.control}
            />
            <ButtonLoading
              isLoading={pending}
              type="submit"
              text="Sign In"
              textLoading="Signing In..."
              className="w-full h-11 mt-2 bg-[#0066FF] hover:bg-[#0052cc] text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 shadow-[0_4px_14px_0_rgba(0,102,255,0.39)]"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              }
            />
          </form>
        </CardContent>

        <CardFooter className="flex justify-center pb-8 pt-2">
          <div className="text-sm text-slate-400">
            Don't have an account?{" "}
            <a
              href="#"
              className="font-semibold text-[#0066FF] hover:text-[#3385ff] transition-colors"
            >
              Contact Administrator
            </a>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
