import {
  $applyNodeReplacement,
  DecoratorNode,
  EditorConfig,
  LexicalNode,
  NodeKey,
  SerializedLexicalNode,
  Spread,
} from "lexical";
import { Suspense } from "react";
export type TAssistantNode = {
  text: string;
  key?: NodeKey;
};
export type SerializedAssistantNode = Spread<
  TAssistantNode,
  SerializedLexicalNode
>;

export default class AssistantNode extends DecoratorNode<JSX.Element> {
  __text: string;
  constructor({ text, key }: { key?: NodeKey; text: string }) {
    super(key);
    this.__text = text;
  }
  createDOM(config: EditorConfig): HTMLElement {
    const span = document.createElement("p");
    const theme = config.theme;
    const className = theme.paragraph;
    if (className !== undefined) {
      span.className = className;
    }
    return span;
  }

  updateDOM(): false {
    return false;
  }
  getText() {
    return this.__text;
  }
  static getType() {
    return "assistant";
  }
  static clone(node: AssistantNode): AssistantNode {
    return new AssistantNode({
      text: node.__text,
      key: node.__key,
    });
  }

  exportJSON(): SerializedAssistantNode {
    return {
      text: this.getText(),
      type: "assistant",
      version: 1,
    };
  }
  decorate(): JSX.Element {
    return (
      <Suspense fallback={<div>.....Loading</div>}>{this.getText()}</Suspense>
    );
  }
}

export function $createAssistantNode({
  text,
  key,
}: {
  text: string;
  key?: NodeKey;
}): AssistantNode {
  return $applyNodeReplacement(new AssistantNode({ text, key }));
}

export function $isAssistantNode(
  node: LexicalNode | null | undefined,
): node is AssistantNode {
  return node instanceof AssistantNode;
}
