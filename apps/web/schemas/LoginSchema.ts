import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email({
    message: "Please enter a valid email",
  }),
  password: z
    .string()
    .min(1, { message: "Password is requried" })
    .min(6, { message: "Password should be minimum of 6 characters" }),
});
