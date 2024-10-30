import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

type UpdateStateFunctionType = (isOpen: boolean) => void;

type ContextStateType = {
  sidebarOpen: boolean;
  createDocumentDialogOpen: boolean;
  splitView: boolean;
  selectedDocuments?: Set<number>;
  setSelectedDocuments?: React.Dispatch<React.SetStateAction<Set<number>>>;
  isFlashCardsDialogOpen?: boolean;
  isCreateCollectionDialogOpen?: boolean;
  isMoveToFolderDialogOpen?: boolean;
};
type setContextType = [
  ContextStateType,
  {
    setSidebarOpen: UpdateStateFunctionType;
    setCreateDocumentDialogOpen: UpdateStateFunctionType;
    setSplitView: UpdateStateFunctionType;
    setIsFlashCardsDialogOpen?: UpdateStateFunctionType;
    setIsCreateCollectionDialogOpen?: UpdateStateFunctionType;
    setIsMoveToFolderDialogOpen?: UpdateStateFunctionType;
  }
];

const defaultContextState: ContextStateType = {
  sidebarOpen: false,
  createDocumentDialogOpen: false,
  splitView: false,
  selectedDocuments: new Set(),
  setSelectedDocuments: () => {},
  isFlashCardsDialogOpen: false,
  isCreateCollectionDialogOpen: false,
  isMoveToFolderDialogOpen: false,
};

export const Context = createContext([
  defaultContextState,
  {
    setSidebarOpen: () => {},
    setCreateDocumentDialogOpen: () => {},
    setSplitView: () => {},
    setIsFlashCardsDialogOpen: () => {},
    setIsCreateCollectionDialogOpen: () => {},
    setIsMoveToFolderDialogOpen: () => {},
  },
] as setContextType);

export const useSidebarOpenContext = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("useDialogs must be used within a DialogsProvider");
  }

  return {
    sidebarOpen: context[0].sidebarOpen,
    setSidebarOpen: context[1].setSidebarOpen,
  };
};
export const useSplitView = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("useDialogs must be used within a DialogsProvider");
  }

  return {
    splitView: context[0].splitView,
    setSplitView: context[1].setSplitView,
  };
};
export const useCreateDocumentDialog = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("useDialogs must be used within a DialogsProvider");
  }

  return {
    createDocumentDialogOpen: context[0].createDocumentDialogOpen,
    setCreateDocumentDialogOpen: context[1].setCreateDocumentDialogOpen,
  };
};
export const useCreateCollectionDialog = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("useDialogs must be used within a DialogsProvider");
  }

  return {
    createCollectionDialogOpen: context[0].isCreateCollectionDialogOpen,
    setCreateCollectionDialogOpen: context[1].setIsCreateCollectionDialogOpen,
  };
};

export const useSelectedDocuments = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("Context error");
  }

  return {
    selectedDocuments: context[0].selectedDocuments,
    setSelectedDocuments: context[0].setSelectedDocuments,
  };
};

export const useIsFlashcardsDialog = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("Context error");
  }

  return {
    flashcardsDialogOpen: context[0].isFlashCardsDialogOpen,
    setFlashcardsDialogOpen: context[1].setIsFlashCardsDialogOpen,
  };
};

export const useIsMoveToFolderDialog = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("Context error");
  }

  return {
    isMoveToFolderDialogOpen: context[0].isMoveToFolderDialogOpen,
    setIsMoveToFolderDialogOpen: context[1].setIsMoveToFolderDialogOpen,
  };
};

const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [selectedDocuments, setSelectedDocuments] = useState<Set<number>>(
    new Set()
  );
  const [openContext, setOpenContext] =
    useState<ContextStateType>(defaultContextState);
  const setSidebarOpen = useCallback(
    (isOpen: boolean) => {
      setOpenContext({ ...openContext, sidebarOpen: isOpen });
    },
    [openContext?.sidebarOpen]
  );

  const [splitView, setSplitView] = useState(false);
  const setCreateDocumentDialogOpen = useCallback(
    (isOpen: boolean) => {
      setOpenContext({ ...openContext, createDocumentDialogOpen: isOpen });
    },
    [openContext?.createDocumentDialogOpen]
  );
  const setIsFlashCardsDialogOpen = useCallback(
    (isOpen: boolean) => {
      setOpenContext({ ...openContext, isFlashCardsDialogOpen: isOpen });
    },
    [openContext?.isFlashCardsDialogOpen]
  );
  const setIsCreateCollectionDialogOpen = useCallback(
    (isOpen: boolean) => {
      setOpenContext({ ...openContext, isCreateCollectionDialogOpen: isOpen });
    },
    [openContext?.isCreateCollectionDialogOpen]
  );
  const setIsMoveToFolderDialogOpen = useCallback(
    (isOpen: boolean) => {
      setOpenContext({ ...openContext, isMoveToFolderDialogOpen: isOpen });
    },
    [openContext?.isMoveToFolderDialogOpen]
  );
  return (
    <Context.Provider
      value={[
        { ...openContext, selectedDocuments, setSelectedDocuments },
        {
          setSidebarOpen,
          setCreateDocumentDialogOpen,
          setSplitView,
          setIsFlashCardsDialogOpen,
          setIsCreateCollectionDialogOpen,
          setIsMoveToFolderDialogOpen,
        },
      ]}
    >
      {children}
    </Context.Provider>
  );
};

export default AppContextProvider;
