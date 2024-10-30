import { useSidebarOpenContext } from "@/lib/context";
import { ReactNode } from "react";
import { useHotkeys } from "react-hotkeys-hook";

const GlobalKeybindProvider = ({ children }: { children: ReactNode }) => {
  const { setSidebarOpen, sidebarOpen } = useSidebarOpenContext();
  useHotkeys("ctrl+b", () => {
    setSidebarOpen(!sidebarOpen);
  });
  return children;
};

export default GlobalKeybindProvider;
