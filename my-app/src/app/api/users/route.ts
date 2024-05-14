import { createUser, getUsers } from "@/db/models/user";

export const GET = async () => {
  const users = await getUsers();
  return Response.json(users);
};
