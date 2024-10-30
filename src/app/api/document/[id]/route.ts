import { getUserFromCookies } from "@/lib/actions";
import { db } from "@/lib/db/drizzle";
import { documents } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getUserFromCookies(req);
    console.log(user);
    const { id } = params;
    const doc = await db
      .select()
      .from(documents)
      .where(and(eq(documents?.id, id)))
      .limit(1);
    console.log({ doc });
    if (doc.length === 0) {
      throw new Error("Document not found");
    }

    return NextResponse.json({ data: doc[0] }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { data: null, error: (error as Error).message },
      { status: 400 }
    );
  }
}
