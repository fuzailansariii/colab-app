"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SignupSchema } from "../../../schemas/SignupSchema";
import Input from "../../../components/Input";
import EmailIcon from "../../../icons/EmailIcon";
import KeyIcon from "../../../icons/KeyIcon";
import Link from "next/link";
import UserIcon from "../../../icons/UserIcon";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof SignupSchema>) => {
    try {
      const response = await axios.post("/api/auth/signup", {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      });
      if (response.data.success) {
        // Handle success (e.g., show a notification or redirect to another page)
        toast.success("User created successfully", {
          description: "You will be redirected to the login page.",
        });
        reset();
        router.push("/login");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || "An error occurred";
        toast.error(errorMessage, {
          description: "Please try again later.",
        });
      } else {
        toast.error("An unexpected error occurred", {
          description: "Please try again later.",
        });
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg mx-auto shadow-sm rounded-lg shadow-gray-400 md:p-10 p-5"
      >
        <div className="flex flex-col gap-4 w-full max-w-sm mx-auto">
          <h1 className="text-4xl font-bold text-center mb-10 font-quicksand">
            Sign Up
          </h1>

          <Input
            type="text"
            error={errors.fullName}
            register={register("fullName")}
            placeholder="Full Name"
            InputIcon={<UserIcon size="sm" />}
          />
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
            {isSubmitting ? "Signing in..." : "Sign Up"}
          </button>
          <p className="text-sm text-center text-gray-500">
            Already a member?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
