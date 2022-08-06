import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie"; // track user concerned for authentication
import prisma from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { userAgent } from "next/server";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const salt = bcrypt.genSaltSync();
  // trying to verify the user
  const { email, password } = req.body;
  let user;
  try {
    user = await prisma.user.create({
      data: {
        email,
        password: bcrypt.hashSync(password, salt),
      },
    });
  } catch (e) {
    res.status(401); // not found
    res.json({ error: "User already exists" });
    return;
  }

  const token = jwt.sign(
    {
      email: user.email,
      id: user.id,
      time: Date.now(),
    },
    "hello",
    {
      expiresIn: "8h",
    }
  );

  res.setHeader(
    "Set-Cookie",
    cookie.serialize("TRAX_ACCESS_TOKEN", token, {
      httpOnly: true,
      maxAge: 8 * 60 * 60,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    })
  );

  res.json(user);
};
