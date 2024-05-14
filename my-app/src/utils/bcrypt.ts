import bcrypt from "bcryptjs";

export const hashedPassword = (password: string) => {
  const hash = bcrypt.hashSync(password);
  return hash;
};

export const checkPassword = (password: string, passwordDB: string) => {
  const check = bcrypt.compareSync(password, passwordDB);
  return check;
};
