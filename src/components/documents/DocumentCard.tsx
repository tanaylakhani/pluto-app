"use client";
import { Document } from "@prisma/client";
import React from "react";
import { Checkbox } from "../ui/checkbox";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

type DocumentCardProps = {
  document: Document;
  checked?: boolean;
  handleCheckChange: (checked: boolean, id: number) => void;
};

const DocumentCardItem = ({
  document,
  checked,
  handleCheckChange,
}: DocumentCardProps) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/home/document/${document.id}`);
  };
  return (
    <div className=" mt-2 flex w-full max-w-sm flex-col items-start justify-center rounded-xl border border-neutral-200 px-2.5 py-3 dark:border-lightGray/10">
      <div className="flex w-full items-start justify-center">
        <span
          onClick={handleClick}
          className="line-clamp-2 w-full text-lg leading-tight tracking-tight hover:cursor-pointer  "
        >
          {document?.title || "Untitled"}
        </span>
        <div className="relative">
          <Checkbox
            checked={checked}
            className={cn(`data-[state=checked]:bg-violet-600`, "")}
            onCheckedChange={(checked) => {
              handleCheckChange(checked as boolean, document?.id);
            }}
          />
        </div>
      </div>
      <span className="text-sm opacity-80">
        {new Date(document?.createdAt)?.toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </span>
    </div>
  );
};

export default DocumentCardItem;
