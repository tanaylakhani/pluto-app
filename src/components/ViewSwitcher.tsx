import { setCookie } from "cookies-next";
import { Grid2x2, List } from "lucide-react";
import { Button } from "./ui/button";
import { FC, useEffect } from "react";

type ViewSwitcherProps = {
  setView: (view: "list" | "grid") => void;
  view: "list" | "grid";
};

const ViewSwitcher: FC<ViewSwitcherProps> = ({ setView, view }) => {
  useEffect(() => {
    if (view === "list") {
      setCookie("documents-view", "list");
    } else {
      setCookie("documents-view", "grid");
    }
  }, [view]);
  return (
    <div className="flex items-center justify-center rounded-lg bg-neutral-800">
      <Button
        size={"icon"}
        variant={"ghost"}
        className="rounded-lg p-0 "
        onClick={() => {
          setView("list");
        }}
      >
        <List className="size-4 opacity-80" />
      </Button>
      <Button
        size={"icon"}
        variant={"ghost"}
        className="rounded-lg p-0 "
        onClick={() => {
          setView("list");
        }}
      >
        <Grid2x2 className="size-4 opacity-80" />
      </Button>
    </div>
  );
};

export default ViewSwitcher;
