// "use client";
import { deleteCookie } from "cookies-next";
import {
  Keyboard,
  LogOut,
  Moon,
  Network,
  Settings,
  Sun,
  User,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { FC, PropsWithChildren } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import UserAvatar from "./UserAvatar";

interface AvatarDropDownMenuProps extends PropsWithChildren {}

const AvatarDropDownMenu: FC<AvatarDropDownMenuProps> = ({ children }) => {
  const router = useRouter();
  const { data: user, status } = useSession();
  const { theme, setTheme } = useTheme();

  const items = [
    {
      icon: <User className="mr-2 h-4 w-4" />,
      text: "Profile",
      handleClick: () => {},
      separator: false,
    },
    {
      icon: <Network className="mr-2 h-4 w-4" />,
      text: "Workspaces",
      handleClick: () => {},
      separator: false,
    },
    {
      icon: <Settings className="mr-2 h-4 w-4" />,
      text: "Settings",
      handleClick: () => {},
      separator: false,
    },
    {
      icon: <Keyboard className="mr-2 h-4 w-4" />,
      text: "Keyboard shortcuts",
      handleClick: () => {},
      separator: true,
    },
    {
      icon:
        theme === "dark" ? (
          <Sun className="mr-2 h-4 w-4" />
        ) : (
          <Moon className="mr-2 h-4 w-4" />
        ),
      text: "Switch Theme",
      handleClick: () => {},
      separator: false,
    },
    {
      icon: <LogOut className="mr-2 h-4 w-4" />,
      text: "Logout",
      handleClick: () => {
        deleteCookie("active-workspace");
        signOut({ redirect: true, callbackUrl: "/login" });
      },
      separator: false,
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          user={user!?.user?.image!}
          isLoading={status === "loading"}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-10 w-52 translate-y-2 rounded-xl bg-white/70 px-4 py-2 shadow-black/10 dark:shadow-black/30 drop-shadow-xl backdrop-blur-lg dark:bg-neutral-900">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router?.push("/workspace")}>
            <Network className="mr-2 h-4 w-4" />
            <span>Workspaces</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Keyboard className="mr-2 h-4 w-4" />
            <span>Keyboard shortcuts</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuItem
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <Sun className="mr-2 h-4 w-4" />
          ) : (
            <Moon className="mr-2 h-4 w-4" />
          )}
          <span>Switch Theme</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            deleteCookie("active-workspace");
            signOut({ redirect: true, callbackUrl: "/login" });
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarDropDownMenu;
