"use server";

import { revalidatePath } from "next/cache";

export const getDocument = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/document/${id}`, {
    next: {
      tags: ["document-by-id"],
    },
    cache: "no-cache",
  });
  const data = await res.json();

  if (!res?.ok && data.error) {
    return { data: null, error: data.error };
  }
  return { data: data?.data, error: null };
};

export const revalidateDocumentData = async (
  path: string,
  type: "layout" | "page" = "page"
) => {
  revalidatePath(path, type);
};
