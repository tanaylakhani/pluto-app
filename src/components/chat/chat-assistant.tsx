import { cn } from "@/lib/utils";
import { $convertToMarkdownString, TRANSFORMERS } from "@lexical/markdown";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useChat } from "ai/react";
import { useEffect, useRef, useState } from "react";
import { remark } from "remark";
import html from "remark-html";
import { ScrollArea } from "../ui/scroll-area";
import ChatInput from "./chat-input";
const ChatAssistant = () => {
  const chatInputContainerRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const [mdContext, setMdContext] = useState("");
  const [editor] = useLexicalComposerContext();

  const { messages, setMessages, handleSubmit, input, handleInputChange } =
    useChat({
      body: {
        ctx: `<context>${mdContext}</context>`,
      },
    });

  useEffect(() => {
    return editor?.update(() => {
      const md = $convertToMarkdownString(TRANSFORMERS);
      setMdContext(md);
    });
  }, [editor, messages, input]);

  useEffect(() => {
    chatRef.current?.scrollIntoView(false);
  }, [messages]);
  return (
    <div className={cn(" w-full", `h-[84.5vh]`)}>
      <div className="h-full w-full ">
        <ScrollArea className="scroll-y-5 flex h-full w-full flex-col overflow-y-auto px-4 py-6 ">
          <div ref={chatRef} className="flex w-full flex-col space-y-3">
            {messages.map((message, index) => {
              const content = remark()
                .use(html)
                .processSync(message?.content)
                .toString();
              return message?.role === "user" ? (
                <span
                  className="w-fit self-end rounded-2xl bg-neutral-200/60 px-5 py-3 leading-snug dark:bg-neutral-800"
                  key={index}
                >
                  {message?.content}
                </span>
              ) : (
                <div
                  key={index}
                  className="prose leading-snug dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              );
            })}
          </div>
        </ScrollArea>
      </div>
      <div ref={chatInputContainerRef} className="mb-2 h-fit  w-full px-3">
        <ChatInput
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          messages={messages}
        />
      </div>
    </div>
  );
};

export default ChatAssistant;
