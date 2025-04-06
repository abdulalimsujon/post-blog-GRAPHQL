import { Secret } from "jsonwebtoken";
import jwt from "jsonwebtoken";

const generateToken = async (payload: { userId: number }, secrate: Secret) => {
  const token = jwt.sign(payload, secrate, { expiresIn: "10d" });
};

const getUserInfoFromToken = async (token: string) => {
  try {
    const userData = jwt.verify(token, "fajf") as {
      userId: number;
    };
    return { userId: userData.userId };
  } catch (error) {
    return null;
  }
};

export const jwtHelper = {
  generateToken,
  getUserInfoFromToken,
};
