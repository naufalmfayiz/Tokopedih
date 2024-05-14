import { ObjectId } from "mongodb";
import { database } from "../config";
import { Product } from "./products";

export type Wishlist = {
  _id?: ObjectId | string;
  Product?: Product;
  userId?: ObjectId | string;
  productId: ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
};

export const getWishlists = async (userId: string) => {
  return database
    .collection<Wishlist>("Wishlist")
    .aggregate([
      {
        $match: {
          userId: new ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "Products",
          localField: "productId",
          foreignField: "_id",
          as: "Product",
        },
      },
      {
        $unwind: {
          path: "$Product",
          preserveNullAndEmptyArrays: false,
        },
      },
    ])
    .toArray();
};

export const getWishListById = async (id: string | ObjectId) => {
  const objectId = typeof id === "string" ? new ObjectId(id) : id;

  return database.collection<Wishlist>("Wishlist").findOne({ _id: objectId });
};

export const createWishlist = async (newWishlist: Wishlist) => {
  const existingWishlist = await database
    .collection<Wishlist>("Wishlist")
    .findOne({
      userId: new ObjectId(newWishlist.userId),
      productId: new ObjectId(newWishlist.productId),
    });
  if (existingWishlist) {
    throw new Error("Already added to wishlist");
  }

  const { insertedId } = await database
    .collection<Wishlist>("Wishlist")
    .insertOne({
      userId: new ObjectId(newWishlist.userId),
      productId: new ObjectId(newWishlist.productId),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

  return await getWishListById(insertedId);
};

export const deleteWishlist = async (id: string) => {
  const data = database
    .collection<Wishlist>("Wishlist")
    .deleteOne({ _id: new ObjectId(id) });

  return data;
};
