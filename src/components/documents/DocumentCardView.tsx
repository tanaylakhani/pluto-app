"use client";
import { useSelectedDocuments } from "@/lib/context";
import { Document } from "@prisma/client";
import { FC, useEffect, useState } from "react";
import DocumentListItem from "./DocumentList";
import DocumentCardItem from "./DocumentCard";

type DocumentCardViewProps = {
  data: Document[];
};
const DocumentCardView: FC<DocumentCardViewProps> = ({ data }) => {
  const { setSelectedDocuments, selectedDocuments } = useSelectedDocuments();

  const [checked, setChecked] = useState<Record<number, boolean>>({});
  useEffect(() => {
    const checkedArr = Object.entries(checked);
    if (data && checkedArr?.length !== 0) {
      setSelectedDocuments!(
        () =>
          new Set(
            checkedArr
              .filter(([, value]) => value)
              .map(([key]) => parseInt(key)),
          ),
      );
    }
  }, [checked]);
  const handleCheckBoxChange = (checked: boolean, id: number) => {
    setChecked((prev) => ({ ...prev, [id]: checked }));
  };

  return (
    <section className="grid grid-cols-2 gap-2 ">
      {data &&
        data!.map((doc, i) => {
          return (
            <DocumentCardItem
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

export default DocumentCardView;
