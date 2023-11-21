import * as React from "react";

import { Label } from "../Inputfields/label";
import { cn } from "../../lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  labelText: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, labelText, ...props }, ref) => {
  return (
    <div>
      <Label>{labelText}</Label>
      <textarea
        className={cn("flex h-80 w-full rounded bg-contrastCol px-3 py-2 border-b-transparent border-b-2 text-sm file:border-0 transition ease-in duration-300 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none  focus-visible:border-b-2 focus-visible:border-accentCol disabled:cursor-not-allowed disabled:opacity-50", className)}
        ref={ref}
        {...props}
      />
    </div>
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
