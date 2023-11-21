import * as React from "react";

import { Label } from "./label";
import { cn } from "../../lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, labelText, ...props }, ref) => {
  return (
    <div>
      <Label>{labelText}</Label>
      <input
        type={type}
        className={cn("flex h-10 w-full rounded  bg-contrastCol px-3 py-2 border-b-transparent border-b-2 text-sm file:border-0 transition ease-in duration-300 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none  focus-visible:border-b-2 focus-visible:border-accentCol disabled:cursor-not-allowed disabled:opacity-50", className)}
        ref={ref}
        {...props}
      />
    </div>
  );
});
Input.displayName = "Input";

export { Input };
