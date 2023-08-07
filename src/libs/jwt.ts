import jwt, { SignOptions } from "jsonwebtoken";
import config from "config";

export const verify = (payload: string): object | string => {
  try {
    const decoded = jwt.verify(payload, config.get("jwt_secret")) as
      | object
      | string;
    return decoded;
  } catch (error) {
    throw new Error("Invalid JWT token");
  }
};

export const sign = (payload: string | object): string => {
  try {
    const token = jwt.sign(payload, config.get("jwt_secret"));
    return token;
  } catch (error) {
    throw new Error("Error signing JWT token");
  }
};
