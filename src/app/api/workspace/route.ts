import { db } from "@/lib/db/drizzle";
import { NewWorkspace, workspaces } from "@/lib/db/schema";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {}

export async function POST(req: NextRequest) {
  const sessionCookie = await getServerSession();
  const payload = (await req.json()) as NewWorkspace;
  if (!sessionCookie) {
    return Response.json(
      { data: null, error: "Session not found" },
      { status: 401 }
    );
  }

  const workspace = await db
    .insert(workspaces)
    .values({ ...payload, user: sessionCookie?.user?.id! })
    .returning();
  console.log({ workspace });

  return Response.json({ data: workspace[0], error: null }, { status: 201 });
}
