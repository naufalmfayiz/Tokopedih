import { ObjectId } from "mongodb";
import { database } from "../config";

export type Product = {
  _id: ObjectId;
  name: string;
  slug: string;
  description?: string;
  excerpt?: string;
  price?: number;
  tags?: string[];
  thumbnail?: string;
  images?: string[];
  createdAt?: Date;
  updatedAt?: Date;
};

export const getProducts = async () => {
  return database.collection<Product>("Products").find().toArray();
};

export const getProductById = async (id: string | ObjectId) => {
  const objectId = typeof id === "string" ? new ObjectId(id) : id;

  return database.collection<Product>("Products").findOne({ _id: objectId });
};

export const getProductBySlug = async (slug: string) => {
  return database.collection<Product>("Products").findOne({ slug: slug });
};

export const createProduct = async (newProduct: Product) => {
  const existingSlug = await database
    .collection<Product>("Products")
    .findOne({ slug: newProduct.slug });
  if (existingSlug) {
    throw new Error("Slug already exist");
  }

  const { insertedId } = await database
    .collection<Product>("Products")
    .insertOne({
      ...newProduct,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

  return await getProductById(insertedId);
};
