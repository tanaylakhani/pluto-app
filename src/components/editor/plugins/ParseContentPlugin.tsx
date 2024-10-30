"use client";
import { $generateNodesFromDOM } from "@lexical/html";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getRoot, $insertNodes } from "lexical";
import { FC, useEffect, useState } from "react";

type TParseContentPlugin = {
  content?: string;
  isHtmlcontent?: boolean;
  setContent?: any;
};

function cleanString(str: string) {
  return str!.replace(/\s+/g, " ").replace(/\\/g, "");
}

const ParseContentPlugin: FC<TParseContentPlugin> = ({ content }) => {
  const [editor] = useLexicalComposerContext();
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    if (!content) return;
    if (isFirstRender) {
      setIsFirstRender(false);
    }
    editor?.update(() => {
      const parser = new DOMParser();
      const state = parser.parseFromString(content, "text/html");
      const nodes = $generateNodesFromDOM(editor, state);
      console.log({ nodes, content });
      $getRoot().clear().select();
      $insertNodes(nodes);
      setIsFirstRender(false);
    });
  }, [isFirstRender, content, editor]);

  // const onChange = useCallback(
  //   (editorState: EditorState, editor: LexicalEditor) => {
  //     console.log(JSON.stringify(editorState));
  //     setContent(JSON.stringify(editorState));
  //   },
  //   [setContent]
  // );

  return <></>;
};

export default ParseContentPlugin;
