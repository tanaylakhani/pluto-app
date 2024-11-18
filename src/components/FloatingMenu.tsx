"use client";
import { getActiveWorkspace } from "@/lib/actions";
import {
  useCreateCollectionDialog,
  useIsFlashcardsDialog,
  useIsMoveToFolderDialog,
  useSelectedDocuments,
} from "@/lib/context";
import { createDocument } from "@/lib/db/documents";
import { getArticleDataByURL } from "@/lib/utils";
import { $generateNodesFromDOM } from "@lexical/html";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useClickOutside, useWindowEvent } from "@mantine/hooks";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { $insertNodes } from "lexical";
import {
  Copy,
  Download,
  Folder,
  FolderPlus,
  Link2,
  Moon,
  Network,
  Plus,
  Settings,
  Share2,
  Sun,
  Trash2,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useParams, usePathname, useRouter } from "next/navigation";
import { memo, useEffect, useId, useState } from "react";
import toast from "react-hot-toast";
import {
  DefaultFloatingMenuFace,
  KeyboardItem,
  SelectedDocumentsMenuFace,
} from "./FloatingMenuFaces";
import { DefaultMenuSlide, DocumentMenuSlide } from "./FloatingMenuSlides";
import { useSession } from "next-auth/react";

const FloatingMenu = memo(() => {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();
  const ref = useClickOutside(() => setIsExpanded(false));
  const { data: user } = useSession();
  const uniqueId = useId();
  const params = useParams() as { workspace: string };
  const { selectedDocuments, setSelectedDocuments } = useSelectedDocuments();
  const [editor] = useLexicalComposerContext();
  const { setFlashcardsDialogOpen } = useIsFlashcardsDialog();
  const { setCreateCollectionDialogOpen } = useCreateCollectionDialog();
  const { setIsMoveToFolderDialogOpen } = useIsMoveToFolderDialog();
  const { theme, setTheme } = useTheme();
  const path = usePathname();

  const defaultOptions = [
    {
      kbd: <KeyboardItem keys="Shift,D" ctrl={true} />,
      icon: (
        <Plus
          strokeWidth={1.7}
          className="size-4.5 stroke-black opacity-80 dark:stroke-white"
        />
      ),
      name: "Create Document",
      onClick: async () => {
        console.log({ user });
        const workspace = await getActiveWorkspace();
        const { data, error } = await createDocument({
          user: user?.user?.id!,
          workspaceId: workspace?.id!,
        });
        if (error) {
          toast?.error(error);
          return;
        }
        router.push(`/w/${params?.workspace!}/document/${data!.id}`);
      },
    },

    {
      kbd: <KeyboardItem keys="Shift,D" ctrl={true} />,
      icon: (
        <Copy
          strokeWidth={1.7}
          className="size-4.5 stroke-black opacity-80 dark:stroke-white"
        />
      ),
      name: "Generate Flashcards",
      onClick: async () => {
        setFlashcardsDialogOpen!(true);
      },
    },
    {
      kbd: <KeyboardItem keys="Shift,D" ctrl={true} />,
      icon: (
        <Folder
          strokeWidth={1.7}
          className="size-4.5 stroke-black opacity-80 dark:stroke-white"
        />
      ),
      name: "Create Collection",
      onClick: () => {
        setCreateCollectionDialogOpen!(true);
      },
    },
    {
      kbd: <KeyboardItem keys="Shift,D" ctrl={true} />,
      icon: (
        <Network
          strokeWidth={1.7}
          className="size-4.5 stroke-black opacity-80 dark:stroke-white"
        />
      ),
      name: "Create Workspace",
      onClick: () => {},
    },
    {
      kbd: <KeyboardItem keys="Shift,D" ctrl={true} />,
      icon: (
        <Trash2
          strokeWidth={1.7}
          className="size-4.5 stroke-black opacity-80 dark:stroke-white"
        />
      ),
      name: "Delete Workspace",
      onClick: () => {},
    },
    {
      kbd: <KeyboardItem keys="Shift,D" ctrl={true} />,
      icon:
        theme === "dark" ? (
          <Moon
            strokeWidth={1.7}
            className="size-4.5 stroke-black opacity-80 dark:stroke-white"
          />
        ) : (
          <Sun
            strokeWidth={1.7}
            className="size-4.5 stroke-black opacity-80 dark:stroke-white"
          />
        ),
      name: "Switch Theme",
      onClick: () => {
        setTheme(theme === "dark" ? "light" : "dark");
      },
    },
    {
      kbd: <KeyboardItem keys="Shift,D" ctrl={true} />,
      icon: (
        <Settings
          strokeWidth={1.7}
          className="size-4.5 stroke-black opacity-80 dark:stroke-white"
        />
      ),
      name: "Workspace Settings",
      onClick: () => {},
    },
  ];

  const documentOptions = [
    {
      kbd: <KeyboardItem keys="Shift,D" ctrl={true} />,
      icon: (
        <Link2
          strokeWidth={1.7}
          className="size-4.5 stroke-black opacity-80 dark:stroke-white"
        />
      ),
      name: "Extract from URL",
      onClick: async () => {
        const url = prompt("URL:");
        if (!url) return;
        const data = await getArticleDataByURL(url);
        editor.update(() => {
          const parser = new DOMParser();
          const dom = parser.parseFromString(data!, "text/html");
          const nodes = $generateNodesFromDOM(editor, dom);
          console.log(nodes);
          $insertNodes([...nodes]);
        });
      },
    },
    {
      kbd: <KeyboardItem keys="Shift,Del" ctrl={true} />,
      icon: (
        <Copy
          strokeWidth={1.7}
          className="size-4.5 stroke-black opacity-80 dark:stroke-white"
        />
      ),
      name: "Generate Flashcards",
      onClick: () => {},
    },

    {
      kbd: <KeyboardItem keys="Shift,C" ctrl={true} />,
      icon: (
        <FolderPlus
          strokeWidth={1.7}
          className="size-4.5 stroke-black opacity-80 dark:stroke-white"
        />
      ),
      name: "Add To Collection",
      onClick: () => {},
    },
    {
      kbd: <KeyboardItem keys="Shift,Alt,S" ctrl={true} />,
      icon: (
        <Share2
          strokeWidth={1.7}
          className="size-4.5 stroke-black opacity-80 dark:stroke-white"
        />
      ),
      name: "Share Document",
      onClick: () => {},
    },
    {
      kbd: <KeyboardItem keys="Shift,Alt,M" ctrl={true} />,
      icon: (
        <Download
          strokeWidth={1.7}
          className="size-4.5 stroke-black opacity-80 dark:stroke-white"
        />
      ),
      name: "Export Markdown",
      onClick: () => {},
    },
    {
      kbd: <KeyboardItem keys="Shift,Del" ctrl={true} />,
      icon: (
        <Trash2
          strokeWidth={1.7}
          className="size-4.5 stroke-black opacity-80 dark:stroke-white"
        />
      ),
      name: "Delete Document",
      onClick: () => {},
    },
  ];

  const slides = {
    default: <DefaultMenuSlide options={defaultOptions} />,
    document: <DocumentMenuSlide options={documentOptions} />,
  };

  const menuFaces = {
    default: <DefaultFloatingMenuFace />,
    selected: <SelectedDocumentsMenuFace />,
  };
  const [activeFace, setActiveFace] =
    useState<keyof typeof menuFaces>("default");
  const [activeSlide, setActiveSlide] =
    useState<keyof typeof slides>("default");
  useEffect(() => {
    if (path.includes(`/${params?.workspace}/document`)) {
      setActiveSlide("document");
    } else {
      setActiveSlide("default");
    }
  }, [path, params?.workspace]);

  useEffect(() => {
    if (selectedDocuments!.size > 0) {
      console.log(selectedDocuments);
      setActiveFace("selected");
    } else {
      setActiveFace("default");
    }
  }, [selectedDocuments?.size]);

  useWindowEvent("keydown", (e) => {
    if (isExpanded && e.key === "Escape") {
      e.preventDefault();
      setIsExpanded(false);
    }
    if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      setIsExpanded(!isExpanded);
      return;
    }
  });

  const controls = useAnimation();
  useEffect(() => {
    if (isExpanded) {
      controls?.start("expand");
    } else {
      controls?.start("collapse");
    }
  }, [isExpanded]);

  return (
    <div className="relative  flex w-full items-center justify-center ">
      <motion.div
        key="button"
        layoutId={`popover-${uniqueId}`}
        animate={isExpanded ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
        className="bottom-3 z-30 flex min-w-[180px] cursor-pointer items-center justify-between border border-neutral-300 bg-white/70 px-4 py-2 backdrop-blur-lg dark:border-light-dark-border dark:bg-neutral-800/70"
        style={{
          borderRadius: "24px",
        }}
        onClick={() => activeFace === "default" && setIsExpanded(true)}
      >
        {menuFaces[activeFace]}
      </motion.div>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            ref={ref}
            layoutId={`popover-${uniqueId}`}
            className="absolute bottom-3 z-30 w-[384px] overflow-hidden border border-neutral-300 bg-white/70 shadow-black/80 drop-shadow-2xl backdrop-blur-lg  dark:border-light-dark-border dark:bg-neutral-800/70"
            transition={{ duration: 0.36, ease: [0.32, 0.72, 0, 1] }}
            style={{
              borderRadius: "16px",
            }}
          >
            <motion.ul className="py-2">{slides[activeSlide]}</motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export default FloatingMenu;
