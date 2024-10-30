import { ResizablePanel } from "../ui/resizable";
import ChatAssistant from "./chat-assistant";

const ChatWithDocumentSidebar = () => {
  return (
    <ResizablePanel className="relative hidden h-screen md:flex " maxSize={35}>
      <ChatAssistant />
    </ResizablePanel>
  );
};

export default ChatWithDocumentSidebar;
