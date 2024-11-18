import { SessionData, verifyJWTPayload } from "@/lib/actions";
import { db } from "@/lib/db/drizzle";
import { users } from "@/lib/db/schema";
import { and, eq, isNull } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("user");
  const sessionCookie = await verifyJWTPayload(
    req.cookies.get("session")?.value!
  );
  if (!sessionCookie) {
    return Response.json(
      { data: null, error: "Session not found" },
      { status: 401 }
    );
  }

  const curretUser = await db
    .select()
    .from(users)
    .where(
      and(
        eq(users.id, (sessionCookie as SessionData)?.user?.id!),
        isNull(users.deletedAt)
      )
    )
    .limit(1);

  return Response.json({ data: curretUser[0], error: null }, { status: 201 });
}
