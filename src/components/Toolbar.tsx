"use client";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $wrapNodeInElement, mergeRegister } from "@lexical/utils";
import {
  $createParagraphNode,
  $getSelection,
  $insertNodes,
  $isRangeSelection,
  $isRootOrShadowRoot,
  COMMAND_PRIORITY_CRITICAL,
  COMMAND_PRIORITY_EDITOR,
  LexicalEditor,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import { Variant, Variants, motion, useAnimation } from "framer-motion";

import {
  INSERT_IMAGE_COMMAND,
  InsertImagePayload,
} from "./editor/plugins/ImagePlugin";
import { useCallback, useEffect, useRef, useState } from "react";
import { ImagePlus, List, ListOrderedIcon, Type } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  $createImageNode,
  ImageNode,
} from "@/components/editor/nodes/ImageNode";

const toolbarVariants: { [key: string]: Variant } = {
  show: {
    opacity: 1,
  },
  hide: {
    opacity: 0,
  },
};

const options = [
  {
    icon: <Type className="size-4 opacity-85" />,
    onClick: (editor: LexicalEditor) => {
      const src = prompt("Enter Image URL: ");
      if (!src) return;
      editor.dispatchCommand(INSERT_IMAGE_COMMAND, { src, altText: "Image" });
    },
  },
  {
    icon: <List className="size-4 opacity-85" />,
    onClick: (editor: LexicalEditor) => {
      const src = prompt("Enter Image URL: ");
      if (!src) return;
      editor.dispatchCommand(INSERT_IMAGE_COMMAND, { src, altText: "Image" });
    },
  },
  {
    icon: <ListOrderedIcon className="size-4 opacity-85" />,
    onClick: (editor: LexicalEditor) => {
      const src = prompt("Enter Image URL: ");
      if (!src) return;
      editor.dispatchCommand(INSERT_IMAGE_COMMAND, { src, altText: "Image" });
    },
  },
  {
    icon: <ImagePlus className="size-4 opacity-85" />,
    onClick: (editor: LexicalEditor) => {
      const src = prompt("Enter Image URL: ");
      if (!src) return;
      editor.dispatchCommand(INSERT_IMAGE_COMMAND, { src, altText: "Image" });
    },
  },
];

const Toolbar = () => {
  const [editor] = useLexicalComposerContext();
  const [show, setShow] = useState(false);
  const toolBarRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  const insertImage = () => {
    editor?.dispatchCommand(INSERT_IMAGE_COMMAND, {
      altText: "Image",
      src: prompt("Enter Image URL") || "",
    });
  };

  const $updateToolbar = useCallback(() => {
    const selection = getSelection();

    if (selection === null) {
      controls?.start({ opacity: 0 });

      return;
    }
    if (!selection?.isCollapsed) {
      const editorRect = document
        ?.getElementById("editor")
        ?.getBoundingClientRect();
      const editorScroller = document
        ?.getElementById("editor")
        ?.parentElement?.getBoundingClientRect();
      const range = selection?.getRangeAt(0);

      const rangeRect = range.getBoundingClientRect();
      const toolbar = toolBarRef.current?.getBoundingClientRect();
      let top = rangeRect.bottom - editorRect!.top + 10;
      let left = rangeRect.left - 5;
      if (editorRect!.top > top) {
        top = editorRect!.top + 10;
      }
      if (left + toolbar!.width > editorScroller!.right) {
        left = editorScroller!.right - toolbar!.width - 10;
      }

      left -= editorRect!.left;
      controls?.start({ opacity: 1, visibility: "visible", top, left });
    } else {
      controls?.start({ opacity: 0, visibility: "hidden" });
    }
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (!editor.hasNodes([ImageNode])) {
      throw new Error("ImagesPlugin: ImageNode not registered on editor");
    }

    return mergeRegister(
      editor.registerCommand<InsertImagePayload>(
        INSERT_IMAGE_COMMAND,
        (payload) => {
          const imageNode = $createImageNode(payload);
          console.log(imageNode);
          $insertNodes([imageNode]);
          if ($isRootOrShadowRoot(imageNode.getParentOrThrow())) {
            $wrapNodeInElement(imageNode, $createParagraphNode).selectEnd();
          }

          return true;
        },
        COMMAND_PRIORITY_EDITOR
      ),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          $updateToolbar();
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      ),
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      })
    );
  }, [editor, $updateToolbar]);
  return (
    <motion.div
      ref={toolBarRef}
      animate={controls}
      transition={{ duration: 0.3, ease: "easeInOut", type: "tween" }}
      className=" absolute flex items-center justify-center gap-x-1 rounded-xl bg-white px-3 py-1.5 shadow-lg shadow-black/20 backdrop-blur-md "
    >
      {options.map((option, index) => {
        return (
          <motion.button
            className={cn("rounded-lg p-2 hover:bg-lightGray/70")}
            key={index}
            onClick={() => option.onClick(editor)}
          >
            {option.icon}
          </motion.button>
        );
      })}
    </motion.div>
  );
};

export default Toolbar;
