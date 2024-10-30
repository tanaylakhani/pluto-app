import React, { FC } from "react";
import { Button } from "./ui/button";
import { Filter, MoreVertical, Settings2 } from "lucide-react";

type CollectionViewOptionsProps = {
  children?: React.ReactNode;
  title?: string;
};

const CollectionViewOptions: FC<CollectionViewOptionsProps> = ({
  children,
  title,
}) => {
  return (
    <div className="mt-6 block w-full px-3">
      <div className="flex w-full items-center justify-between px-2">
        <div>
          <span className="text-xl font-semibold leading-snug tracking-tight">
            {title}
          </span>
        </div>
        <div className="flex items-center justify-center gap-x-2">
          <Button variant={"outline"} size={"sm"}>
            <Filter className="size-4 opacity-80" />
            <span className="ml-2">Filter</span>
          </Button>
          <Button variant={"outline"} size={"sm"}>
            <Settings2 className="size-4 opacity-80" />
            <span className="ml-2">Display</span>
          </Button>
          <Button variant={"outline"} size={"smallIcon"}>
            <MoreVertical className="size-4 opacity-80" />
          </Button>
        </div>
      </div>
      <div className="mt-2">{children}</div>
    </div>
  );
};

export default CollectionViewOptions;
