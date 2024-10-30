import { eq } from "drizzle-orm";
import { getSlug } from "../utils";
import { db } from "./drizzle";
import { collections, NewCollection } from "./schema";

export type CreateCollectionPayload = {
  name: string;
  tags?: string[];
  user?: string;
  documents?: string[];
  workspace?: string;
};

export const createCollection = async ({
  name,
  tags,
  user,
  workspace,
  documents,
}: CreateCollectionPayload) => {
  try {
    const collectionSlug = getSlug(name);
    const collection = await db.insert(collections).values({
      name: name,
      slug: collectionSlug,
      tags: tags || [],
      workspaceId: workspace,
      userId: user,
      documents: documents || [],
    } as NewCollection);

    return { data: collection, error: null };
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return { data: null, error: error?.message };
    }
  }
};
