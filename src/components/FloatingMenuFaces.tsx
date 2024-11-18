import { useIsMoveToFolderDialog, useSelectedDocuments } from "@/lib/context";
import { Command, Folder, Sparkles, Trash2, X } from "lucide-react";
import { ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export const KeyboardItem = ({
  icon,
  keys,
  ctrl = true,
}: {
  icon?: ReactNode;
  keys: string;
  ctrl?: boolean;
}) => {
  return (
    <kbd className="flex w-fit items-center justify-center gap-x-2">
      <div className="flex items-center justify-center rounded-md border border-neutral-300 p-1 dark:border-neutral-500/50">
        {(ctrl && icon) || <Command className="size-4 opacity-85 " />}
      </div>{" "}
      {keys?.split(",").map((key) => {
        return (
          <span className="flex items-center justify-center rounded-md border border-neutral-300 px-1 py-0.5 text-sm font-medium dark:border-neutral-500/50">
            {key}
          </span>
        );
      })}
    </kbd>
  );
};

export const DefaultFloatingMenuFace = () => {
  return (
    <>
      <Sparkles
        strokeWidth={0.8}
        className="size-4.5 fill-black opacity-80 dark:fill-white"
      />{" "}
      <KeyboardItem keys="K" key={"default"} />
    </>
  );
};

export const SelectedDocumentsMenuFace = () => {
  const { selectedDocuments, setSelectedDocuments } = useSelectedDocuments();
  const { setIsMoveToFolderDialogOpen } = useIsMoveToFolderDialog();

  return (
    <div className="flex w-full items-center justify-between">
      <span className="flex items-center justify-start gap-x-1">
        <span
          onClick={() => setSelectedDocuments!(new Set())}
          className="mr-2 rounded-lg border border-darkGray/80 bg-transparent p-1.5 dark:border-light-dark-border"
        >
          <X className="size-4 opacity-80" />
        </span>
        <span>{selectedDocuments?.size} </span>
        Documents
      </span>
      <div className="ml-3 flex items-center justify-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className=" rounded-lg border border-darkGray/80 bg-transparent p-1.5 dark:border-light-dark-border">
              <Trash2 className="size-4 opacity-80" />
            </TooltipTrigger>
            <TooltipContent>Move to Trash</TooltipContent>
          </Tooltip>
          {/* </span> */}
          <Tooltip>
            <TooltipTrigger
              onClick={() => setIsMoveToFolderDialogOpen!(true)}
              className=" rounded-lg border border-darkGray/80 bg-transparent p-1.5 dark:border-light-dark-border"
            >
              <Folder className="size-4 opacity-80" />
            </TooltipTrigger>
            <TooltipContent>Add to Folder</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};
