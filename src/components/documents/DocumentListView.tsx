"use client";
import { useSelectedDocuments } from "@/lib/context";
import { FC, useEffect, useState } from "react";
import DocumentListItem from "./DocumentList";
import { Skeleton } from "../ui/skeleton";
import { Document } from "@/lib/db/schema";

type DocumentListViewProps = {
  data: Document[];
  isLoading: boolean;
};
const DocumentListView: FC<DocumentListViewProps> = ({ data, isLoading }) => {
  const { setSelectedDocuments, selectedDocuments } = useSelectedDocuments();

  const [checked, setChecked] = useState<Record<string, boolean>>({});
  useEffect(() => {
    const checkedArr = Object.entries(checked);
    if (data && checkedArr?.length !== 0) {
      setSelectedDocuments!(
        () =>
          new Set(
            checkedArr
              .filter(([, value]) => value)
              .map(([key]) => parseInt(key))
          )
      );
    }
  }, [checked]);
  const handleCheckBoxChange = (checked: boolean, id: string) => {
    setChecked((prev) => ({ ...prev, [id]: checked }));
  };

  return (
    <section className="">
      {isLoading
        ? [...Array(18)].map((_, i) => {
            return (
              <Skeleton
                key={i}
                className="mt-2 h-10 w-full animate-pulse rounded-lg bg-darkGray/60 dark:bg-lightGray/10"
              />
            );
          })
        : data!?.map((doc, i) => {
            return (
              <DocumentListItem
                key={i}
                checked={checked[doc?.id]}
                handleCheckChange={(checked) =>
                  handleCheckBoxChange(checked, doc?.id)
                }
                document={doc}
              />
            );
          })}
    </section>
  );
};

export default DocumentListView;
