import { useIsMoveToFolderDialog, useSelectedDocuments } from "@/lib/context";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { useParams } from "next/navigation";
import { getAllCollections } from "../collection/AllCollections";
import { useQuery } from "react-query";
import { queryClient } from "@/lib/session-provider";
import { Skeleton } from "../ui/skeleton";
import { Checkbox } from "../ui/checkbox";
import { cn } from "@/lib/utils";

const MoveToFolderDialog = () => {
  const { workspace } = useParams() as { workspace: string };
  const { isMoveToFolderDialogOpen, setIsMoveToFolderDialogOpen } =
    useIsMoveToFolderDialog();
  const [selectedCollections, setSelectedCollections] = React.useState<
    string[]
  >([]);
  const [hoveredCollection, setHoveredCollection] = React.useState<
    string | null
  >(null);
  const { data, error, isLoading } = useQuery(
    ["all-collections", workspace!],
    async () =>
      await getAllCollections({
        workspace: workspace!,
      })
  );
  const { selectedDocuments } = useSelectedDocuments();
  const isHovered = (id: string) => hoveredCollection === id;
  const isSelected = (id: string) => selectedCollections.includes(id);
  const handleMoveToFolder = async () => {
    const docs = Array.from(selectedDocuments!);

    // const res = await addDocumentToCollection({
    //   collections: selectedCollections,
    //   documents: docs,
    // });
    // console.log(res);
  };
  return (
    <Dialog
      open={isMoveToFolderDialogOpen}
      onOpenChange={setIsMoveToFolderDialogOpen}
    >
      <DialogContent className="h-[340px] w-full max-w-sm">
        <DialogHeader>
          <DialogTitle>Move to Folder</DialogTitle>
          <DialogDescription>
            Select a document or multiple documents to move to a new folder or
            an existing folder
          </DialogDescription>
        </DialogHeader>
        <div className="w-full">
          <ScrollArea className="h-full w-full overflow-y-auto">
            {isLoading
              ? [...Array(9)].map((_, i) => {
                  return (
                    <Skeleton
                      key={i}
                      className="h-34  w-full animate-pulse rounded-lg bg-darkGray/60 dark:bg-lightGray/10"
                    />
                  );
                })
              : data!?.map((collection, i) => {
                  return (
                    <div
                      key={i}
                      onMouseEnter={() => setHoveredCollection(collection?.id)}
                      onMouseLeave={() => setHoveredCollection(null)}
                      className="flex w-full items-center justify-between border-b border-neutral-200/60 py-1 dark:border-lightGray/10 "
                    >
                      <div className="flex items-center justify-center">
                        <Checkbox
                          checked={selectedCollections.includes(collection?.id)}
                          className={cn(
                            `data-[state=checked]:bg-violet-600`,
                            "mt-0.5"
                          )}
                          onCheckedChange={(checked) => {
                            setSelectedCollections((prev) => {
                              if (checked) {
                                return [...prev, collection?.id];
                              }
                              return prev.filter((id) => id !== collection?.id);
                            });
                          }}
                        />

                        <span className="ml-2 leading-tight tracking-tight">
                          {collection?.name}
                        </span>
                      </div>
                      <span className="text-sm opacity-80">
                        {/* @ts-ignore */}
                        {collection?.documents?.length}{" "}
                      </span>
                    </div>
                  );
                })}
          </ScrollArea>
        </div>

        <div className="flex w-full items-center justify-center gap-2">
          <Button className="w-full" variant={"primary"}>
            New{" "}
          </Button>
          <Button
            onClick={handleMoveToFolder}
            className="w-full"
            variant={"default"}
          >
            Move
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MoveToFolderDialog;
