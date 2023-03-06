import { compareHash, createJWT } from "./modules/auth";
import { NextApiResponse, NextApiRequest } from "next";
import { prisma } from "@/lib/prisma";
import validator from "validator";
import { setCookie } from "cookies-next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    const errors: string[] = [];
    const validationSchema = [
      {
        valid: validator.isEmail(email),
        errorMessage: "Please Enter Email",
      },

      {
        valid: validator.isLength(password, { min: 3 }),
        errorMessage: "No Password entered",
      },
    ];
    validationSchema.forEach((check) => {
      if (!check.valid) {
        errors.push(check.errorMessage);
      }
      if (errors.length) {
        return res.status(400).json({ errorMessage: errors[0] });
      }
    });
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (user) {
      const hashPassword = user.password;
      if (await compareHash(password, hashPassword)) {
        const jwt = await createJWT(user.email);
        setCookie("jwt", jwt, { req, res, maxAge: 60 * 6 * 24 });
        res.status(200).json({
          firstName: user.first_name,
          lastName: user.last_name,
          city: user.city,
          email: user.email,
          phone: user.phone,
        });
      } else {
        return res
          .status(401)
          .json({ errorMessage: "Email or password isn't valid " });
      }
    } else {
      return res
        .status(401)
        .json({ errorMessage: "Email or password isn't valid " });
    }
  }
  return res.status(404).json("unknown endpoint");
}
