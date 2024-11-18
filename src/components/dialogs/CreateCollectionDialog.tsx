import { instance } from "@/lib/axios";
import { useCreateCollectionDialog } from "@/lib/context";
import { useWorkspaces } from "@/lib/hooks/use-workspaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { TagInput } from "../ui/tag-input";

const CreateCollectionPayloadSchema = z.object({
  name: z.string(),
});

const CreateCollectionDialog = () => {
  const { currentWorkspace } = useWorkspaces();
  const { createCollectionDialogOpen, setCreateCollectionDialogOpen } =
    useCreateCollectionDialog();

  const { register, handleSubmit } = useForm<
    z.infer<typeof CreateCollectionPayloadSchema>
  >({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(CreateCollectionPayloadSchema),
  });
  const [tags, setTags] = React.useState<string[]>([]);
  const { workspaces } = useWorkspaces();
  return (
    <Dialog
      open={createCollectionDialogOpen}
      onOpenChange={setCreateCollectionDialogOpen}
    >
      <DialogContent className="w-full max-w-sm rounded-2xl bg-neutral-100 backdrop-blur-2xl dark:bg-neutral-900">
        <DialogHeader>
          <DialogTitle>Create Collection</DialogTitle>
          <DialogDescription>
            Create a collection to group different documents
          </DialogDescription>
        </DialogHeader>
        <div>
          <form
            onSubmit={handleSubmit(async (values) => {
              try {
                console.log("inside");
                const resp = await instance.post(
                  "/collection",
                  {
                    name: values?.name,
                    tags: tags,
                    documents: null,
                  },
                  {
                    params: {
                      workspace: currentWorkspace?.id,
                    },
                  }
                );
                console.log({ resp });
                if (resp.status !== 201) {
                  toast.error(JSON.stringify(resp?.data));
                  return;
                }
                toast.success("Collection created successfully");
              } catch (error) {
                if (error instanceof AxiosError) {
                  console.log(error);
                }
              }
            })}
          >
            <Input
              className=" bg-neutral-200 focus-visible:outline-none focus-visible:ring-0 dark:bg-neutral-950"
              {...register("name")}
              placeholder="Collection Name"
            />
            <TagInput
              tags={tags}
              placeholder="Select Tags..."
              setTags={setTags}
            />
            <Button variant={"default"} className="mt-2 w-full">
              New Collection
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCollectionDialog;
