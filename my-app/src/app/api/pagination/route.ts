import { database } from "@/db/config";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    let pageNumber =
      (request.nextUrl.searchParams.get("pageNumber") as string) || 1;
    let searchQuery =
      (request.nextUrl.searchParams.get("searchQuery") as string) || "";

    const pageSize = 8;
    const skipAmount = (+pageNumber - 1) * pageSize;
    const count = await database
      .collection("Products")
      .find({
        name: {
          $regex: searchQuery,
          $options: "i",
        },
      })
      .toArray();

    const products = await database
      .collection("Products")
      .aggregate([
        {
          $match: {
            name: {
              $regex: searchQuery,
              $options: "i",
            },
          },
        },
        {
          $skip: skipAmount,
        },
        {
          $limit: pageSize,
        },
      ])
      .toArray();

    return NextResponse.json({
      page: +pageNumber,
      totalData: count.length,
      totalPage: Math.ceil(count.length / pageSize),
      dataPerPage: pageSize,
      data: products,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
