import { z } from "zod";

export const wishlistSchema = z.object({
  userId: z
    .string({
      message: "name is required ",
    })
    .min(3, { message: "Name must contain at least 3 characters" }),
  productId: z
    .string({ message: "Slug is required" })
    .min(3, { message: "Slug must contain at least 3 characters" }),
});
