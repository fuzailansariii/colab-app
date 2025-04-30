"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoginSchema } from "../../../schemas/LoginSchema";
import Input from "../../../components/Input";
import EmailIcon from "../../../icons/EmailIcon";
import KeyIcon from "../../../icons/KeyIcon";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    // console.log("Login Form Data: ", data);
    try {
      const response = await signIn("credentials", {
        email: data.email.trim(),
        password: data.password,
        redirect: false,
      });

      console.log(response);
      const { error } = response || {};
      if (error) {
        toast.error(error, {
          description: "Please check your credentials and try again.",
        });
        return;
      }
      toast.success("Login successful", {
        description: "You will be redirected to the dashboard.",
      });
      reset();
      // Redirect to the dashboard or any other page after successful login
      router.push("/dashboard");
    } catch (error) {
      console.error("Login error: ", error);
      toast.error("An error occurred while logging in", {
        description: "Please try again later.",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg mx-auto shadow-sm rounded-lg shadow-gray-400 md:p-10 p-5"
      >
        <div className="flex flex-col gap-4 w-full max-w-sm mx-auto">
          <h1 className="text-4xl font-bold text-center mb-10 font-quicksand">
            Login
          </h1>

          <Input
            type="email"
            error={errors.email}
            register={register("email")}
            placeholder="Email"
            InputIcon={<EmailIcon size="sm" />}
          />
          <Input
            type="password"
            error={errors.password}
            register={register("password")}
            placeholder="Password"
            InputIcon={<KeyIcon size="sm" />}
          />
          <button
            className="btn btn-primary w-full rounded-md"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
          <p className="text-sm text-center text-gray-500">
            Don't have an account?{" "}
            <Link href="/sign-up" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
