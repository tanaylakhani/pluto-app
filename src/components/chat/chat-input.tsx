import React, { Dispatch, FC, SetStateAction } from "react";
import TextArea from "react-textarea-autosize";
import { Button } from "../ui/button";
import {
  ArrowUp,
  CornerRightUp,
  Paperclip,
  SendHorizonal,
  Smile,
} from "lucide-react";
import { ChatRequestOptions, Message } from "ai";

type ChatInputProps = {
  messages: Message[];
  reload?: () => void;
  isDone?: boolean;
  input: string;
  stop?: () => void;
  append?: (m: Message) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (
    event?: {
      preventDefault?: () => void;
    },
    chatRequestOptions?: ChatRequestOptions,
  ) => void;
  isLoading?: boolean;
  isResponseLoading?: boolean;
  setIsResponseLoading?: Dispatch<SetStateAction<boolean>>;
  setMessages?: (messages: Message[]) => void;
};

const ChatInput: FC<ChatInputProps> = ({
  input,
  handleInputChange,
  handleSubmit,
}) => {
  return (
    <form
      className=" flex w-full flex-col items-end justify-center overflow-hidden rounded-xl bg-neutral-200/60 p-1 dark:bg-neutral-800"
      onSubmit={(e) => {
        console.log({ input });
        handleSubmit!(e);
      }}
    >
      <TextArea
        value={input}
        onChange={handleInputChange}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit!();
          }
        }}
        placeholder="Ask Assistant"
        className="mt-2 flex h-full w-full cursor-pointer resize-none appearance-none border-none bg-transparent px-2 py-2 leading-tight text-opacity-80 focus-visible:outline-none "
      />
      <div className="flex w-full flex-row items-center justify-between px-1.5 pb-1.5">
        <div className="flex items-center justify-center">
          <Button
            size={"icon"}
            className="rounded-xl border border-darkGray/80 bg-transparent p-1 dark:border-lightGray/10 dark:bg-transparent"
          >
            <Paperclip className="size-4 stroke-black opacity-70 dark:stroke-white" />
          </Button>
        </div>
        <Button
          type="submit"
          size={"icon"}
          className="cursor-pointer"
          variant={"primary"}
        >
          <ArrowUp className="size-4 opacity-80" />
        </Button>
      </div>
    </form>
  );
};

export default ChatInput;
