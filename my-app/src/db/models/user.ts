import { ObjectId } from "mongodb";
import { database } from "../config";
import { checkPassword, hashedPassword } from "@/utils/bcrypt";
import { createToken } from "@/utils/jwt";

export type User = {
  name?: string;
  username: string;
  email: string;
  password: string;
};

export const getUsers = async () => {
  return database
    .collection<User>("User")
    .find()
    .project({ password: 0 })
    .toArray();
};

export const getUserById = async (id: string | ObjectId) => {
  const objectId = typeof id === "string" ? new ObjectId(id) : id;

  return database
    .collection<User>("User")
    .findOne({ _id: objectId }, { projection: { password: 0 } });
};

export const createUser = async (newUser: User) => {
  const existingUsername = await database
    .collection<User>("User")
    .findOne({ username: newUser.username });
  if (existingUsername) {
    throw new Error("Username already exist");
  }
  const existingEmail = await database
    .collection<User>("User")
    .findOne({ email: newUser.email });
  if (existingEmail) {
    throw new Error("Email already exists");
  }

  newUser.password = hashedPassword(newUser.password);

  const { insertedId } = await database
    .collection<User>("User")
    .insertOne(newUser);

  return await getUserById(insertedId);
};

export const login = async (email: string, password: string) => {
  const user = await database.collection<User>("User").findOne({ email });
  if (!user) {
    throw new Error("Invalid Email/Password");
  }

  const verifyPassword = checkPassword(password, user.password);
  if (!verifyPassword) {
    throw new Error("Invalid Email/Password");
  }

  const access_token = createToken({
    _id: user._id,
    username: user.username,
    email: user.email,
  });

  return { access_token, email };
};
