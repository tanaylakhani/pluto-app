// import Editor from "@/components/editor/editor";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import toast from "react-hot-toast";
import { getDocument } from "./actions";

type PageProps = {
  params: { id: string };
};

const DocumentPage = dynamic(
  () => import("@/components/documents/DocumentPage"),
  {
    ssr: false,
  }
);

export default async function Page({ params }: PageProps) {
  if (!params?.id) return notFound();
  const { data, error } = await getDocument(params.id);
  // console.log({ data, error });
  if (error) {
    toast.error(error);
    return;
  }
  return <DocumentPage document={data} />;
}
