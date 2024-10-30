import React from "react";
import CreateDocumentDialog from "./CreateDocumentDialog";
import CreateCollectionDialog from "./CreateCollectionDialog";
import MoveToFolderDialog from "./MoveToFolderDialog";

const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <CreateDocumentDialog />
      <CreateCollectionDialog />
      <MoveToFolderDialog />
      {children}
    </>
  );
};

export default DialogProvider;
