import { z } from "zod";

export const userSchema = z.object({
  username: z
    .string({
      message: "Username is required ",
    })
    .min(3, { message: "Username must contain at least 3 characters" }),
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Invalid email format" }),
  password: z
    .string({
      message: "Password is required",
    })
    .min(5, { message: "Password must contain at least 5 characters" }),
});
