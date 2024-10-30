import { eq } from "drizzle-orm";
import { db } from "./drizzle";
import { documents } from "./schema";
import { CreateDocumentPayload } from "../types";
import { revalidatePath } from "next/cache";
import { revalidateDocumentData } from "@/app/(dashboard)/w/[workspace]/document/[id]/actions";

export const getDocumentById = async (id: string) => {
  try {
    const res = await db
      .select()
      .from(documents)
      .where(eq(documents?.id, id))
      .limit(1);

    if (res.length === 0) {
      throw new Error("Document not found");
    }
    return { data: res[0], error: null };
  } catch (error) {
    return { data: null, error: (error as Error).message };
  }
};

export const updateDocument = async ({
  content,
  id,
  title,
  markdown,
}: {
  id: string;
  title: string;
  content: string;
  markdown: string;
}) => {
  try {
    const document = await db
      .update(documents)
      .set({
        title: title,
        content: content,
        markdown: markdown,
      })
      .where(eq(documents.id, id))
      .returning();
    console.log({ document });

    if (document.length === 0) {
      throw new Error("Failed to save document");
    }
    await revalidateDocumentData("/(dashboard)/w/[workspace]/document/[id]");
    return { data: document, error: null };
  } catch (error) {
    return { data: null, error: (error as Error).message };
  }
};
export const createDocument = async ({
  user,
  content,
  title,
  workspaceId,
}: CreateDocumentPayload) => {
  try {
    const document = await db
      .insert(documents)
      .values({
        title: "",
        content: "",
        markdown: "",
        authorId: user,
        workspaceId: workspaceId!,
      })
      .returning();

    if (document.length === 0) {
      throw new Error("Failed to create document");
    }
    return { data: document[0], error: null };
  } catch (error) {
    return { data: null, error: (error as Error).message };
  }
};

const movetoCollection = async ({
  documentsToMove,
  collectionId,
}: {
  documentsToMove: string[];
  collectionId: string;
}) => {
  try {
    documentsToMove?.map(async (doc) => {
      await db
        .update(documents)
        .set({
          collectionId: collectionId,
        })
        .where(eq(documents.id, doc));
    });
    // revalidateDocumentData("/(dashboard)/w/[workspace]");
    // revalidateDocumentData("/(dashboard)/w/[workspace]/collection/[slug]");
  } catch (error) {
    return { data: null, error: (error as Error).message };
  }
};
