import { getProductBySlug } from "@/db/models/products";
import { NextRequest } from "next/server";

export type GetProductDetailParams = {
  params: {
    slug: string;
  };
};

export const GET = async (
  request: NextRequest,
  { params }: GetProductDetailParams
) => {
  const product = await getProductBySlug(params.slug);
  return Response.json(product);
};
