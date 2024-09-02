import { prisma } from "@/utils/prismaDB";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: any) {
  const body = await request.json();
  const { name, email, password } = body;

  if (!name || !email || !password) {
    return NextResponse.json("Missing Fields", { status: 400 });
  }

  const exist = await prisma.user.findUnique({
    where: {
      email: email.toLowerCase(),
    },
  });

  if (exist) {
    return NextResponse.json(
      {
        message: "User already exists. Try logging in.",
        status: "error",
      },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      campaignDatas: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  return NextResponse.json(
    {
      message: "User Registered Successfully !!",
      status: "success",
    },
    { status: 200 }
  );
}
