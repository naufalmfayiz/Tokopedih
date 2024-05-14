import { Product, createProduct, getProducts } from "@/db/models/products";
import { productSchema } from "@/validators/product.validator";
import { z } from "zod";

export const GET = async () => {
  const products = await getProducts();
  return Response.json(products);
};

export const POST = async (request: Request) => {
  try {
    const body: Product = await request.json();
    // console.log(body);

    const data = productSchema.parse(body);

    const createdProduct = await createProduct(body);

    return Response.json(
      { message: "created successfully", createdProduct },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(
        { message: error.errors[0].message },
        { status: 400 }
      );
    }
    if (error instanceof Error) {
      return Response.json({ message: error.message }, { status: 400 });
    }
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
};
