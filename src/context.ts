import { Request, Response } from "express";
import { decodeAuthHeader, AuthTokenPayload } from "./utils/auth";

export interface Context {
  req: Request;
  res: Response;
  userId?: number;
}

export const context = ({
  req,
  res,
}: {
  req: Request;
  res: Response;
}): Context => {
  return {
    req,
    res,
  };
};
