// Workspaces Types
export type CreateWorkspacePayload = {
  name: string;
  user: string;
};
// Collection Types
export type CreateCollectionPayload = {
  name: string;
  tags?: string[];
  user?: string;
  documents?: string[];
  workspace?: string;
};

// Document Types
export type CreateDocumentPayload = {
  user: string;
  title?: string;
  content?: string;
  workspaceId?: string;
};

export type AddDocumentToCollectionPayload = {
  collections: string[];
  documents: number[];
};

// User Types

export type RegisterUserPayload = {
  name: string;
  email: string;
  password: string;
};
