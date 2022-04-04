import { Context } from "context";

export const isAuth = (_parent: any, _args: any, ctx: Context) => {
  return !!ctx.userId;
};
