"use client";
import DocumentListView from "@/components/documents/DocumentListView";
import DocumentViewOptions from "@/components/DocumentViewOptions";
import { instance } from "@/lib/axios";
import { Collection, Document } from "@/lib/db/schema";
import React, { FC } from "react";
import { useQuery } from "react-query";

interface PageProps {
  params: { slug: string; workspace: string };
}

const getCollectionDocuments = async (slug: string, workspace: string) => {
  const res = await instance(`/document`, {
    params: {
      collection: slug,
      workspace: workspace,
    },
  });
  if (!res?.data) {
    console.log({ err: res?.data });
    return;
  }
  return (
    res.data?.documents as { collections: Collection; documents: Document }[]
  )?.map((r) => r?.documents);
};

const Page: FC<PageProps> = ({ params }) => {
  console.log(params);
  const { data, isError, isLoading } = useQuery(
    ["collection-documents", params?.slug, params?.workspace!],
    async () => await getCollectionDocuments(params?.slug!, params?.workspace!)
  );
  console.log({ data });
  return (
    <div className="flex w-full flex-col items-center justify-center  pt-28">
      <div className="w-full max-w-5xl">
        <DocumentViewOptions title={`Documents`}>
          <DocumentListView data={data!} isLoading={isLoading} />
        </DocumentViewOptions>
      </div>
    </div>
  );
};

export default Page;
