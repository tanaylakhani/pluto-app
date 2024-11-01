import { getServerAuthSession } from "@/lib/auth";
import { createCollection } from "@/lib/db/collections";
import { db } from "@/lib/db/drizzle";
import { Collection, collections } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const user = await getServerAuthSession();
  const workspace = req.nextUrl.searchParams?.get("workspace");
  if (user === null || workspace === null) {
    return Response.json(
      { data: null, error: "Missing parameters" },
      { status: 400 }
    );
  }
  const allCollections = await db
    .select()
    .from(collections)
    .where(
      and(
        eq(collections?.userId, user?.user?.id!),
        eq(collections.workspaceId, workspace!)
      )
    );
  console.log({ allCollections });
  return Response.json({ data: allCollections, error: null });
}
export async function POST(req: NextRequest) {
  const { name, tags, documents }: Collection & { documents?: string[] } =
    await req.json();
  const user = await getServerAuthSession();
  const workspace = req.nextUrl.searchParams?.get("workspace");

  const resp = await createCollection({
    name: name!,
    tags: tags!,
    user: user?.user?.id!,
    documents,
    workspace: workspace!,
  });
  if (resp?.error)
    return Response.json({ data: null, error: resp.error }, { status: 400 });
  return Response.json({ data: resp?.data, error: null }, { status: 201 });
}
export async function PUT(req: NextRequest) {}
export async function DELETE(req: NextRequest) {}
