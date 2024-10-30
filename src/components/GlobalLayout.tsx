"use client";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import ChatWithDocumentSidebar from "./chat/chat-with-document-sidebar";
import FloatingMenu from "./FloatingMenu";
import Navbar from "./Navbar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";

const GlobalLayout = ({ children }: { children: ReactNode }) => {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="relative h-screen w-full overflow-hidden bg-white  dark:bg-dark"
    >
      <ResizablePanel className="relative w-full">
        <div className="absolute left-0 right-0 flex w-full items-center justify-center ">
          <div className="fixed bottom-5 z-40 w-full ">
            <FloatingMenu />
          </div>
        </div>
        <div className="absolute left-0 right-0 flex w-full items-center justify-center border-b border-neutral-200/60 dark:border-lightGray/10 ">
          <div className=" z-50 w-full   bg-white/60 px-4 pb-3 pt-2  backdrop-blur-2xl dark:bg-neutral-900/60">
            <Navbar />
          </div>
        </div>
        {children}
      </ResizablePanel>
      <ResizableHandle className="hidden md:flex" withHandle />
      <ChatWithDocumentSidebar />
    </ResizablePanelGroup>
  );
};

export default GlobalLayout;
