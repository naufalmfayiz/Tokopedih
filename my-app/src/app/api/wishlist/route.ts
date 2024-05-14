import {
  Wishlist,
  createWishlist,
  deleteWishlist,
  getWishlists,
} from "@/db/models/wishlist";
import { wishlistSchema } from "@/validators/wishlist.validator";
import { z } from "zod";
import { headers } from "next/headers";

export const GET = async () => {
  const headersList = headers();
  const userId = headersList.get("userId") as string;
  // console.log(userId);

  const products = await getWishlists(userId);
  return Response.json(products);
};

export const POST = async (request: Request) => {
  try {
    const headersList = headers();
    const userId = headersList.get("userId") as string;
    // console.log(userId);

    const body: Wishlist = await request.json();
    // console.log(body);

    const data = wishlistSchema.parse({
      userId: userId,
      productId: body.productId,
    });

    const createdWishlist = await createWishlist({
      userId: userId,
      productId: body.productId,
    });

    return Response.json(
      { message: "Added successfully", createdWishlist },
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

export const DELETE = async (request: Request) => {
  try {
    const { id } = await request.json();

    const data = await deleteWishlist(id);

    return Response.json(
      { message: "Deleted successfully", data },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ message: error.message }, { status: 400 });
    }
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
};
