import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  const teams = await prisma.team.findMany();
  return new NextResponse(JSON.stringify({ teams }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
