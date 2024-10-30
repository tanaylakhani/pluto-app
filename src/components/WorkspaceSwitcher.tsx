"use client";
import { Workspace } from "@/lib/db/schema";
import { useWorkspaces } from "@/lib/hooks/use-workspaces";
import { setCookie } from "cookies-next";
import { ChevronsUpDown, Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ScrollArea } from "./ui/scroll-area";
import { Skeleton } from "./ui/skeleton";

const WorkspaceSwitcher = () => {
  const router = useRouter();
  // const { workspace } = useParams() as { workspace: string };
  const [show, setShow] = React.useState(false);
  const { workspaces, isLoading, currentWorkspace } = useWorkspaces();
  if (isLoading)
    return (
      <Skeleton className="h-10 w-32 animate-pulse rounded-lg bg-neutral-200/60 dark:bg-lightGray/10" />
    );
  const handleWorkspaceClick = (workspace: Workspace) => {
    setCookie("active-workspace", JSON.stringify(workspace));
    router.replace(`/${workspace?.id}`);
  };
  return (
    <Popover>
      <PopoverTrigger asChild className="w-64 ">
        <button
          onClick={() => setShow(!show)}
          className="flex w-full items-center justify-center gap-x-1 rounded-3xl border border-neutral-200/60 px-3 py-1.5  hover:bg-neutral-100 dark:border-lightGray/10 dark:hover:bg-lightGray/10"
        >
          <div className="ml-1 flex items-center justify-center">
            <span className="line-clamp-1 text-sm leading-tight">
              {currentWorkspace!?.name}
            </span>
            <ChevronsUpDown
              className="ml-1 h-4 w-4 opacity-75"
              aria-hidden="true"
            />
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent className="ml-3 mt-2 max-h-72 w-64 rounded-xl bg-white/70 p-0  shadow-black/30 drop-shadow-xl backdrop-blur-lg dark:bg-neutral-900">
        <div className="w-full ">
          <ScrollArea className="flex h-full flex-col space-y-1 overflow-y-auto p-0">
            {!workspaces
              ? [...Array(10)].map((_, i) => {
                  return (
                    <Skeleton
                      key={i}
                      className="h-10 w-full animate-pulse rounded-lg bg-neutral-200/60 dark:bg-lightGray/10"
                    />
                  );
                })
              : workspaces!?.map((workspace) => {
                  return (
                    <div
                      key={workspace?.id}
                      className="flex w-full cursor-pointer items-center justify-start border-t border-neutral-200/60  px-3 py-2 first:border-none   dark:border-lightGray/10 "
                      onClick={() => handleWorkspaceClick(workspace)}
                    >
                      <div>
                        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-red-500 via-indigo-300 to-transparent" />
                      </div>
                      <div className="ml-3 flex flex-col">
                        <span className="line-clamp-2 text-sm leading-tight tracking-tight">
                          {workspace?.name}
                        </span>
                      </div>
                    </div>
                  );
                })}
          </ScrollArea>
        </div>
        <div className="group flex cursor-pointer items-center justify-start gap-x-2 border-t border-neutral-200/60  px-3 py-2 dark:border-lightGray/10">
          <Plus className="size-4 opacity-80 group-hover:opacity-100" />{" "}
          <span className="text-sm opacity-80 group-hover:opacity-100">
            Create Workspace
          </span>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default WorkspaceSwitcher;
