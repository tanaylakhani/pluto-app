// import { Collection } from "@prisma/client";
import React, { FC } from "react";
import { Checkbox } from "../ui/checkbox";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Dot } from "lucide-react";
import { Collection } from "@/lib/db/schema";

type CollectionCardProps = {
  collection: Collection;
  checked?: boolean;
  handleCheckChange: (checked: boolean, id: string) => void;
};

const CollectionCard: FC<CollectionCardProps> = ({
  collection,
  handleCheckChange,
  checked,
}) => {
  const router = useRouter();
  const [icon, setIcon] = React.useState<string>("/folder.svg");
  const params = useParams() as { workspace: string };
  const handleClick = () => {
    router.push(`/w/${params?.workspace}/collection/${collection.slug}`);
  };
  return (
    <div
      onClick={handleClick}
      onDragOver={(e) => {
        e?.preventDefault();

        console.log("data: ", e?.dataTransfer?.getData("text/plain"));
        setIcon("/folder-open.svg");
      }}
      onDragLeave={(e) => {
        e?.preventDefault();
        setIcon("/folder.svg");
      }}
      className=" flex w-full  cursor-pointer flex-col items-center justify-center "
    >
      <div className=" w-full">
        <Image
          src={icon}
          className="aspect-square p-0"
          width={250}
          height={250}
          alt=""
        />
      </div>
      <div className=" flex w-full flex-col items-start justify-center px-3 ">
        <span className="leading-snug tracking-tight">
          {collection?.name || "Untitled"}
        </span>
        <div className="flex items-center justify-center">
          <span className="text-sm leading-tight  opacity-70">
            {new Date(collection?.createdAt)?.toDateString()}
          </span>
          <Dot size={20} className="gap-0 opacity-80" />
          <span className="text-sm leading-tight opacity-70">
            {/* @ts-ignore */}
            {collection?.documents?.length || 0}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;
