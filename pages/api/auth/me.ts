import { verifyJWT } from "./modules/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const bearerToken = req.headers["authorization"] as string;
  const token = bearerToken.split(" ")[1];
  console.log(token);

  const payload = jwt.decode(token) as { email: string; exp: number };

  if (!payload.email) {
    return res.status(401).json({
      errorMessage: "unauthorized",
    });
  }
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
    select: {
      id: true,
      phone: true,

      email: true,
      first_name: true,
      last_name: true,
      city: true,
    },
  });
  if (!user) {
    res.status(401).json({ errorMessage: "Invalid Jwt" });
  } else {
    return res.json({
      id: user.id,
      phone: user.phone,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      city: user.city,
    });
  }
}
