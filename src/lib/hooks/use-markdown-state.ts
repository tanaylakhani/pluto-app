import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect, useState } from "react";
import { $convertToMarkdownString, TRANSFORMERS } from "@lexical/markdown";

export async function useMarkdownEditorState() {
  const [state, setState] = useState<string>("");
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    return editor?.update(() => {
      const md = $convertToMarkdownString(TRANSFORMERS);
      setState(md);
    });
  }, [editor]);
  return state;
}
