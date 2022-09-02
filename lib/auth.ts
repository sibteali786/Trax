import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "./prisma";
// handler is every function which has a req and response as arguments
// we will return handler only when given token gets verified otheriwse return 401
export const validateRoute = (handler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies.TRAX_ACCESS_TOKEN; // similar to const {TRAX_ACCESS_TOKEN:token} = req.cookies;
    if (token) {
      let user;

      try {
        const { id } = jwt.verify(token, "hello");
        user = await prisma.user.findUnique({
          where: { id },
        });

        if (!user) {
          throw new Error("Not real user");
        }
      } catch (error) {
        res.status(401);
        res.json({ error: "Not Authorizied" });
        return;
      }

      return handler(req, res, user);
    }

    res.status(401);
    res.json({ error: "Not Authorizied" });
  };
};

export const validateToken = (token) => {
  const user = jwt.verify(token, "hello");
  return user;
};
