import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import React, { useEffect } from "react";
import { mergeRegister, mediaFileReader, isMimeType } from "@lexical/utils";
import { DRAG_DROP_PASTE } from "@lexical/rich-text";
import { COMMAND_PRIORITY_LOW } from "lexical";
import { INSERT_IMAGE_COMMAND } from "./ImagePlugin";

const ACCEPTED_FILE_TYPES = ["image/png", "image/jpeg", "image/webp"];

const DragDropPlugin = () => {
  const [editor] = useLexicalComposerContext();
  //   const handleDrop = (e: React.DragEvent) => {
  //     console.log(e?.dataTransfer?.files);
  //   };
  useEffect(() => {
    return mergeRegister(() => {
      editor.registerCommand(
        DRAG_DROP_PASTE,
        (files) => {
          (async () => {
            const filesResult = await mediaFileReader(
              files,
              [ACCEPTED_FILE_TYPES].flatMap((x) => x),
            );
            for (const { file, result } of filesResult) {
              if (isMimeType(file, ACCEPTED_FILE_TYPES)) {
                editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
                  altText: file.name,
                  src: result,
                  width: 500,
                });
              }
            }
          })();
          return true;
        },
        COMMAND_PRIORITY_LOW,
      );
    });
  }, [editor]);

  return null;
};

export default DragDropPlugin;
