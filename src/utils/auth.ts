import * as jwt from "jsonwebtoken";

export const APP_SECRET = "access";
export const REFRESH_SECRET = "refresh";

export interface AuthTokenPayload {
  userId: number;
}

export function decodeAuthHeader(authHeader: String): AuthTokenPayload {
  const token = authHeader.replace("Bearer ", ""); // 3

  if (!token) {
    throw new Error("No token found");
  }

  return jwt.verify(token, APP_SECRET) as AuthTokenPayload; // 4
}
