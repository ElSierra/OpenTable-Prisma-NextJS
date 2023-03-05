import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";

import { createJWT, HashPassword } from "./modules/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { firstName, lastName, email, phone, city, password } = req.body;
    const errors: string[] = [];
    const validationSchema = [
      {
        valid: validator.isLength(firstName, { min: 1, max: 20 }),
        errorMessage: "First name must be between 1 and 20 characters",
      },
      {
        valid: validator.isLength(lastName, { min: 1, max: 20 }),
        errorMessage: "Last name must be between 1 and 20 characters",
      },
      {
        valid: validator.isEmail(email),
        errorMessage: "Email is not valid",
      },
      {
        valid: validator.isMobilePhone(phone, "en-NG"),
        errorMessage: "Phone number is not valid",
      },
      {
        valid: validator.isLength(city, { min: 1 }),
        errorMessage: "First name must be between 1 and 20 characters",
      },
      {
        valid: validator.isStrongPassword(password),
        errorMessage: "Password is not strong enough",
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
    const userWithEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (userWithEmail) {
      return res.status(400).json({ errorMessage: "Email exists" });
    }
    const hashedPassword = await HashPassword(password);
    const user = await prisma.user.create({
      data: {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: hashedPassword,
        phone: phone,
        city: city,
      },
    });
    const token = await createJWT(email);
  return  res.status(200).json({token});
  }
 return res.status(404).json("unknown endpoint");
}
