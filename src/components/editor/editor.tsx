"use client";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { EditorRefPlugin } from "@lexical/react/LexicalEditorRefPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { LexicalEditor } from "lexical";
import { memo, useRef } from "react";
import EditorPlugins from "./plugins";
import ParseContentPlugin from "./plugins/ParseContentPlugin";

interface EditorProps {
  content: string;
  setContent?: (data: string) => void;
}

function Editor({ content, setContent }: EditorProps) {
  const editor = useRef<LexicalEditor>(null);

  return (
    <>
      <RichTextPlugin
        contentEditable={
          <ContentEditable
            id="editor"
            className="relative min-h-screen w-full overflow-hidden  pb-12"
          />
        }
        placeholder={<div>Enter some text...</div>}
        ErrorBoundary={LexicalErrorBoundary}
      />

      <ParseContentPlugin content={content!} setContent={setContent} />
      <EditorRefPlugin editorRef={editor} />
      <EditorPlugins />
    </>
  );
}
export default Editor;
