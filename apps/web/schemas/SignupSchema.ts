import * as z from "zod";

export const SignupSchema = z.object({
  fullName: z
    .string()
    .min(1, { message: "FullName must be at least of 1 characters" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter valid email" }),
  password: z
    .string()
    .min(1, { message: "Password is requried" })
    .min(6, { message: "Password should be minimum of 6 characters" }),
});
