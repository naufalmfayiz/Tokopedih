import { getUserById } from "@/db/models/user";
import { NextRequest } from "next/server";

export type GetUserDetailParams = {
  params: {
    id: string;
  };
};

export const GET = async (
  request: NextRequest,
  { params }: GetUserDetailParams
) => {
  const user = await getUserById(params.id);
  return Response.json(user);
};
