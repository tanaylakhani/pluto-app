import { useParams, usePathname, useRouter } from "next/navigation";
import AvatarDropDownMenu from "./AvatarDropDownMenu";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import WorkspaceSwitcher from "./WorkspaceSwitcher";

const Navbar = () => {
  const router = useRouter();
  const { workspace } = useParams();
  const links = [
    { id: "documents", name: "Document", url: "/home" },
    { id: "collections", name: "Collection", url: "/home/collection" },
    { id: "tags", name: "Tags", url: "/home" },
  ];
  const path = usePathname();
  const getActivePath = () => {
    switch (path) {
      case `/w/${workspace}`:
        return "documents";
      case `/w/${workspace}/collection`:
        return "collections";
      case `/w/${workspace}`:
        return "tags";
      default:
        return "documents";
    }
  };

  return (
    <header className=" flex w-full flex-col  items-center justify-center ">
      <div className="flex w-full max-w-5xl items-center justify-between  ">
        <div className="">
          <WorkspaceSwitcher />
        </div>

        <div>
          <AvatarDropDownMenu />
        </div>
      </div>
      <nav className="sticky top-0 flex w-full items-center justify-center">
        <div className="flex w-full items-center justify-center px-3">
          <Tabs defaultValue={getActivePath()}>
            <TabsList className="rounded-lg bg-neutral-200/60 dark:bg-lightGray/10">
              <TabsTrigger
                className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-900"
                value="documents"
                onClick={() => router.push(`/w/${workspace}`)}
              >
                Docs
              </TabsTrigger>
              <TabsTrigger
                className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-900"
                value="collections"
                onClick={() => router.push(`/w/${workspace}/collection`)}
              >
                Collection
              </TabsTrigger>
              <TabsTrigger
                className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-900"
                value="tags"
                onClick={() => router.push(`/w/${workspace}`)}
              >
                Tags
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </nav>
      {/* <nav className="sticky top-0 z-50 flex w-full items-center justify-center pb-0.5">
        <ul className="relative flex items-center justify-center">
          {links?.map((link) => {
            return (
              <li
                key={link.id}
                onClick={() => router.push(link?.url)}
                className={cn(
                  "relative cursor-pointer px-4 py-2 font-medium tracking-tight text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100",
                  getActivePath() === link?.id &&
                    "text-neutral-900 dark:text-neutral-100",
                )}
              >
                {link.name}

                {getActivePath() === link?.id && (
                  <motion.span
                    layoutId="bubble"
                    className="absolute inset-[100%_0]  h-1   bg-neutral-200 dark:bg-neutral-800"
                    style={{ borderRadius: 9999 }}
                    transition={{
                      type: "spring",
                      bounce: 0.2,
                      duration: 0.6,
                    }}
                  />
                )}
              </li>
            );
          })}
        </ul>
      </nav> */}
    </header>
  );
};

export default Navbar;
