import { getUserFromCookies } from "@/lib/actions";
import { db } from "@/lib/db/drizzle";
import { collections, documents } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const sessionData = await getUserFromCookies(req);
  const collection = req.nextUrl.searchParams?.get("collection");
  const workspace = req.nextUrl.searchParams?.get("workspace");
  if (!sessionData?.user) {
    return Response.redirect("/api/auth/signin");
  }
  if (collection !== null) {
    const collectionDocuments = await db
      .select()
      .from(collections)
      .where(
        and(
          eq(collections?.slug, collection),
          eq(collections?.workspaceId, workspace!)
        )
      )
      .leftJoin(documents, eq(documents?.collectionId, collections?.id));
    console.log({ collectionDocuments });
    return Response.json({ documents: collectionDocuments }, { status: 201 });
  }

  const workspaceDocuments = await db
    .select()
    .from(documents)
    .where(
      and(
        eq(documents?.workspaceId, workspace!),
        eq(documents?.authorId, sessionData.user.id!)
      )
    );

  return Response.json({ documents: workspaceDocuments }, { status: 201 });
}
