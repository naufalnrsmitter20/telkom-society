import { findAllUsers } from "@/utils/user.query";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const dataUser = await findAllUsers();
  return new NextResponse(JSON.stringify({ dataUser }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
