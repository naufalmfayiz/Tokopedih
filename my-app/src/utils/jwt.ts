import jwt, { JwtPayload, Secret } from "jsonwebtoken";
const secret = process.env.JWT_SECRET as string;
// process.env.JWT_SECRET as string;

export const createToken = (payload: JwtPayload) => {
  let token = jwt.sign(payload, secret);
  return token;
};

export const verifyToken = (token: string) => {
  let verify = jwt.verify(token, secret);
  return verify;
};
