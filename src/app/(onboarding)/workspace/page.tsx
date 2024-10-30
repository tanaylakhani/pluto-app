"use client";
import CreateWorkspace from "@/components/onboarding/create-workspace";
import { setActiveWorkspace } from "@/lib/actions";
import { Workspace } from "@/lib/db/schema";
import { useWorkspaces } from "@/lib/hooks/use-workspaces";
import Link from "next/link";
import { FC } from "react";

type PageProps = {
  params: {
    // user: string;
  };
};

const Page: FC<PageProps> = ({ params }) => {
  const { workspaces } = useWorkspaces();

  const handleWorkspaceClick = (workspace: Workspace) => {
    setActiveWorkspace(workspace);
  };

  return (
    <section className="flex h-screen w-full flex-col items-center justify-center">
      <FormWrapper />
      <div className="mt-6 flex w-full max-w-sm flex-col space-y-2">
        {workspaces!?.map((workspace, i) => {
          return (
            <Link
              key={i}
              onClick={() => handleWorkspaceClick(workspace!)}
              href={`/w/${workspace?.id}`}
              className="cursor-pointer"
            >
              <div className="w-full rounded-lg border border-neutral-300/60 p-3 dark:border-lightGray/10 ">
                <span>{workspace?.name}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Page;

const FormWrapper = () => {
  return (
    <div className="h-[240px] w-full max-w-sm rounded-lg border border-neutral-300/60 dark:border-lightGray/10">
      <CreateWorkspace />
    </div>
  );
};
