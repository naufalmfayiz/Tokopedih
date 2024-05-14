import { createUser, getUsers, login } from "@/db/models/user";

export const POST = async (request: Request) => {
  try {
    const { email, password } = await request.json();

    const loginData = await login(email, password);

    return Response.json(loginData, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ message: error.message }, { status: 401 });
    }
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
};
