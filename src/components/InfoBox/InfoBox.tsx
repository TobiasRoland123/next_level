import { cn } from "../../lib/utils";
import { ReactNode } from "react";

interface infoBoxProps {
  children?: ReactNode;
  className?: string;
}

export const InfoBox = ({ children, className }: infoBoxProps) => {
  return (
    <>
      <div className={cn("py-6 px-8 bg-contrastCol rounded-sm mt-14 ", className)}>{children}</div>
    </>
  );
};
