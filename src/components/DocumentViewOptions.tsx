import { Filter, MoreVertical, Settings2 } from "lucide-react";
import React, { FC } from "react";
import { Button } from "./ui/button";

type DocumentViewOptionsProps = {
  children?: React.ReactNode;
  title?: string;
};

const DocumentViewOptions: FC<DocumentViewOptionsProps> = ({
  children,
  title,
}) => {
  return (
    <div className="mt-6 block w-full px-3">
      <div className="flex w-full items-center justify-between">
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
          {/* <PopoverWrapper
            trigger={ */}
          <Button variant={"outline"} size={"sm"}>
            <Settings2 className="size-4 opacity-80" />
            <span className="ml-2">Display</span>
          </Button>
          {/* }
            className="ml-3 mt-2 max-h-72 w-64  rounded-xl bg-neutral-100  p-0 shadow-black/30 drop-shadow-xl backdrop-blur-lg dark:bg-neutral-800  "
          >
            <div className="flex w-full items-center justify-center gap-2 border-b border-neutral-200/60 px-3 py-2 dark:border-lightGray/10">
              <div className="flex w-full flex-col items-center justify-center rounded-lg border border-neutral-200/60 p-2 dark:border-lightGray/10">
                <Rows3 strokeWidth={1.6} className="size-7 opacity-80" />
                <span className="mt-0.5 text-sm opacity-80">Rows</span>
              </div>
              <div className="flex w-full flex-col items-center justify-center rounded-lg border border-neutral-200/60 p-2 dark:border-lightGray/10">
                <Grid2X2 strokeWidth={1.6} className="size-7 opacity-80" />
                <span className="mt-0.5 text-sm opacity-80">Grids</span>
              </div>
            </div>
            <div className="flex items-center justify-center px-3 py-2">
              <div className="flex items-center justify-center">
                <ArrowDownUp className="size-5 opacity-80" />{" "}
                <span className="ml-1 mt-0.5 text-sm opacity-80">Ordering</span>
              </div>
              <div></div>
            </div>
          </PopoverWrapper> */}
          <Button variant={"outline"} size={"smallIcon"}>
            <MoreVertical className="size-4 opacity-80" />
          </Button>
        </div>
      </div>
      <div className="mt-2">{children}</div>
    </div>
  );
};

export default DocumentViewOptions;
