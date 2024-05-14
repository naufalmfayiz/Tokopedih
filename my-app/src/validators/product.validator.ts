import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string({
      message: "name is required ",
    })
    .min(3, { message: "Name must contain at least 3 characters" }),
  slug: z
    .string({ message: "Slug is required" })
    .min(3, { message: "Slug must contain at least 3 characters" }),
});
