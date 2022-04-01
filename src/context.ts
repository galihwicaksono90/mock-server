import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
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
    prisma,
    req,
    res,
    userId: req.session.userId,
  };
};
