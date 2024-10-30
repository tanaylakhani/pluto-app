"use client";
import React from "react";
import { Checkbox } from "../ui/checkbox";
import { cn } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import { Document } from "@/lib/db/schema";

type DocumentListProps = {
  document: Document;
  checked?: boolean;
  handleCheckChange: (checked: boolean, id: string) => void;
};

const DocumentListItem = ({
  document,
  checked,
  handleCheckChange,
}: DocumentListProps) => {
  const router = useRouter();
  const { workspace } = useParams();
  const handleClick = () => {
    router.push(`/w/${workspace}/document/${document.id}`);
  };
  return (
    <div className="mt-2 flex w-full items-center justify-start truncate">
      <Checkbox
        checked={checked}
        className={cn(`data-[state=checked]:bg-violet-600`, "mt-0.5")}
        onCheckedChange={(checked) => {
          handleCheckChange(checked as boolean, document?.id);
        }}
      />
      <div className="ml-2 flex items-center justify-start">
        <span
          onClick={handleClick}
          className="line-clamp-1 text-lg leading-tight tracking-tight hover:cursor-pointer "
        >
          {document?.title || "Untitled"}
        </span>
        <span className="ml-2 text-sm opacity-80">
          {new Date(document?.createdAt)?.toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}{" "}
        </span>
      </div>
    </div>
  );
};

export default DocumentListItem;
