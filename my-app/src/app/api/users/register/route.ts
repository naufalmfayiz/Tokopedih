import { createUser, getUsers } from "@/db/models/user";
import { userSchema } from "@/validators/user.validator";
import { z } from "zod";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();

    const data = userSchema.parse(body);

    const createdUser = await createUser(body);

    return Response.json(
      { message: "created successfully", createdUser },
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
