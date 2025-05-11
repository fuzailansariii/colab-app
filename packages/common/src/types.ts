import { z } from "zod";

export const SignupSchema = z.object({
  fullName: z.string().min(1, "Full name is required").trim(),
  email: z
    .string()
    .email("Invalid email")
    .transform((val) => val.trim().toLowerCase()),
  password: z.string().min(6, "Password must be at least 6 characters").trim(),
});
export const CreateRoomSchema = z.object({
  roomTitle: z.string().min(1, { message: "Room Title is required" }).trim(),
});

export const JoinRoomSchema = z.object({
  roomId: z.string().min(1, { message: "Joining ID is required" }).trim(),
});
