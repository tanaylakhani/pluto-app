"use client";
import { instance } from "@/lib/axios";
import { NewWorkspace, Workspace } from "@/lib/db/schema";
import { useUser } from "@/lib/user-provider";
import { capitalizeFirstLetter, getSlug } from "@/lib/utils";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { setActiveWorkspace } from "@/lib/actions";
import { Loader } from "lucide-react";
import { queryClient } from "@/lib/session-provider";

const NewWorkspaceSchema = z.object({
  name: z.string().min(6).max(30),
});

const CreateWorkspace = () => {
  const router = useRouter();
  const { user } = useUser();
  console.log({ user });
  const workspaceName =
    user?.name &&
    `${capitalizeFirstLetter(
      user!?.name?.split(" ")[0]! as string
    )}'s Personal Workspace`;

  const {
    register,
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
    },
    values: {
      name: workspaceName,
    },
    resolver: zodResolver(NewWorkspaceSchema),
  });

  const handleFormSubmit = handleSubmit(async (values) => {
    const res = await instance.post("/workspace", {
      name: values?.name!,
      slug: getSlug(values!?.name!),
    } as Pick<NewWorkspace, "name" | "slug">);
    if (res?.status !== 201) {
      toast.error("Failed to create workspace");
      return;
    }
    await queryClient.refetchQueries(["get-workspaces", user?.id!]);
    setActiveWorkspace(res?.data?.data as Workspace);
    router.push(`/w/${res?.data?.data?.id}`);
  });
  return (
    <motion.form
      onSubmit={handleFormSubmit}
      className="flex w-full max-w-sm flex-col rounded-lg   px-4 py-6"
    >
      <Label className="text-sm font-medium leading-tight tracking-tight">
        Workspace name
      </Label>
      <Input className="mt-2 focus-visible:ring-0" {...register("name")} />
      <Button
        type="submit"
        variant={"outline"}
        className="mt-2 flex items-center justify-center gap-x-2"
      >
        {isSubmitting && <Loader className="size-4 animate-spin" />} Create
        Workspace
      </Button>
    </motion.form>
  );
};

export default CreateWorkspace;
