import React, { FC } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";

type PopoverWrapperProps = {
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

const PopoverWrapper: FC<PopoverWrapperProps> = ({
  children,
  trigger,
  className,
}) => {
  return (
    <Popover>
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent className={cn(className, "")}>{children}</PopoverContent>
    </Popover>
  );
};

export default PopoverWrapper;
