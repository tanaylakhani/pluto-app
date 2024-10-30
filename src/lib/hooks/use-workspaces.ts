"use client";
import { cache, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getActiveWorkspace } from "../actions";
import { Workspace } from "../db/schema";
import { getUserWorkspaces } from "../db/workspaces";
import { useUser } from "../user-provider";

type GetWorkspacesResponse = {
  workspaces: Workspace[];
  currentWorkspace: Workspace | null;
};

export const useWorkspaces = () => {
  const { user } = useUser();
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(
    null
  );
  const { data, isLoading, refetch } = useQuery(
    ["get-workspaces", user?.id!],
    cache(async () => await getUserWorkspaces(user?.id!)),
    { enabled: false }
  );
  useEffect(() => {
    refetch();
    (async () => {
      const w = await getActiveWorkspace();
      setCurrentWorkspace(w!);
    })();
  }, [user]);

  return {
    isLoading,
    workspaces: data,
    currentWorkspace,
  };
};
