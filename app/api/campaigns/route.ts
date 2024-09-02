import { authOptions } from "@/utils/auth";
import { prisma } from "@/utils/prismaDB";
import validateMockJSON from "@/utils/validateMockJSON";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: any) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      {
        message: "Unauthorized",
        status: "error",
      },
      { status: 401 }
    );
  }
  const body = await request.json();
  if (!validateMockJSON(body)) {
    return NextResponse.json("Invalid JSON", { status: 400 });
  }

  try {
    await prisma.user.update({
      where: {
        email: session.user!.email!,
      },
      data: {
        campaignDatas: body,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error uploading campaign",
        status: "error",
      },
      { status: 500 }
    );
  }
  return NextResponse.json(
    {
      message: "User Registered Successfully !!",
      status: "success",
    },
    { status: 200 }
  );
}

export async function GET(request: any) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      {
        message: "Unauthorized",
        status: "error",
      },
      { status: 401 }
    );
  }
  const user = await prisma.user.findUnique({
    where: {
      email: session.user!.email!,
    },
    select: {
      campaignDatas: true,
    },
  });
  return NextResponse.json(user?.campaignDatas || []);
}
