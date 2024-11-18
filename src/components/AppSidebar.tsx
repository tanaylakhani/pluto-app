"use client";
import { useSidebarOpenContext } from "@/lib/context";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import { ImperativePanelHandle } from "react-resizable-panels";
import { Button } from "./ui/button";
import { ResizablePanel } from "./ui/resizable";
import WorkspaceManager from "./WorkspaceSwitcher";
import { instance } from "@/lib/axios";
import { useQuery } from "react-query";
// import { Document } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Document } from "@/lib/db/schema";

const fetchDocuments = async () => {
  const res = await instance.get("/document");
  if (!res?.data) {
    return;
  }
  return res.data?.documents as Document[];
};

const AllDocuments = () => {
  const { data, isError, isLoading } = useQuery(["documents-lists"], async () =>
    fetchDocuments()
  );
  const router = useRouter();
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="flex h-full flex-col space-y-2 px-3 pt-5">
        {data?.map((doc, i) => {
          return (
            <div className=" cursor-pointer rounded-lg border border-neutral-300 px-3 py-2 dark:border-light-dark-border ">
              <span
                onClick={() => router.push(`/document/${doc?.id}`)}
                className="line-clamp-2 leading-tight tracking-tight opacity-85"
              >
                {doc?.title}
              </span>
            </div>
          );
        })}
      </div>
      <WorkspaceManager />
    </div>
  );
};

const AppSidebar = () => {
  const ref = useRef<ImperativePanelHandle>(null);
  const { setSidebarOpen, sidebarOpen } = useSidebarOpenContext();

  const sidebarMap = {
    "all-docs": <AllDocuments />,
  };

  useEffect(() => {
    if (sidebarOpen) {
      ref.current?.expand();
    } else {
      ref.current?.collapse();
    }
  }, [sidebarOpen]);

  return (
    <ResizablePanel
      collapsible
      collapsedSize={0}
      minSize={0}
      ref={ref}
      className={cn(
        "flex h-screen w-full flex-col items-center justify-end border-none bg-neutral-100 outline-none transition-all  duration-75 dark:bg-light-dark "
      )}
      defaultSize={20}
      maxSize={20}
    >
      <AllDocuments />
    </ResizablePanel>
  );
};

export default AppSidebar;

const SidebarItem = ({
  icon,
  text,
  onClick,
  open,
}: {
  icon: any;
  text: string;
  onClick: () => void;
  open?: boolean;
}) => {
  return (
    <Button
      variant={"ghost"}
      className={cn("mt-1 size-12 rounded-xl hover:bg-lightGray/60")}
      onClick={onClick}
      size={"icon"}
    >
      {icon}
    </Button>
  );
};
