import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

export async function middleware(req: NextRequest, res: NextResponse) {
  console.log("I am the middleware");
  const bearerToken = req.headers.get("authorization") as string;
  if (!bearerToken) {
    return new NextResponse(
      JSON.stringify({ errorMessage: "Unauthorized request" }),
      { status: 401 }
    );
  }
  const token = bearerToken.split(" ")[1];
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  if (!token) {
    return new NextResponse(
      JSON.stringify({ errorMessage: "Unauthorized request" }),
      { status: 401 }
    );
  }

  try {
    const verifiedUser = await jose.jwtVerify(token, secret);
    console.log(verifiedUser);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ errorMessage: "Unauthorized request" }),
      { status: 401 }
    );
  }
}

export const config = {
  matcher: ["/api/auth/me"],
};
