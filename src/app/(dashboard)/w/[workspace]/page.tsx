"use client";
import DocumentListView from "@/components/documents/DocumentListView";
import DocumentViewOptions from "@/components/DocumentViewOptions";
import { instance } from "@/lib/axios";
import { Document } from "@/lib/db/schema";
import { FC } from "react";
import { useQuery } from "react-query";

const fetchDocuments = async ({ workspace }: { workspace: string }) => {
  const res = await instance.get("/document", {
    params: {
      workspace: workspace,
    },
  });
  if (!res?.data) {
    console.log({ err: res?.data });
    return;
  }
  return res.data?.documents as Document[];
};
type PageProps = {
  params: {
    workspace: string;
  };
};

const Page: FC<PageProps> = ({ params }) => {
  const { data, isError, isLoading } = useQuery(
    ["documents-lists", params?.workspace],
    async () => await fetchDocuments({ workspace: params?.workspace })
  );

  return (
    <div className="flex w-full flex-col items-center justify-center px-2 pt-28">
      <div className="w-full max-w-5xl">
        <DocumentViewOptions title="All Documents">
          {data!?.length === 0 && <span>No Documents found </span>}
          <DocumentListView data={data!} isLoading={isLoading} />
        </DocumentViewOptions>
      </div>
    </div>
  );
};

export default Page;
