import * as React from "react";
import { IoIosSearch } from "react-icons/io";
import { Label } from "./label";
import { cn } from "../../lib/utils";
import { useState } from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText?: string;
  isSearch?: boolean;
  valid?: any;
  isEmpty?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, labelText, isSearch, isEmpty, valid, ...props }, ref) => {
    const [inputValue, setInputValue] = React.useState("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      setInputValue(newValue);
    };

    return (
      <div className="relative">
        <Label>{labelText}</Label>
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded bg-contrastCol px-3 py-2 border-b-transparent border-b-2 text-sm file:border-0 transition ease-in duration-300 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-b-2 focus-visible:border-secondaryCol disabled:cursor-not-allowed disabled:opacity-50",

            className
          )}
          value={inputValue}
          onChange={handleInputChange}
          ref={ref}
          {...props}
          // @ts-ignore
          onWheel={(e) => e.target.blur()}
        />
        {isSearch && isEmpty && inputValue === "" && (
          <div
            className={`absolute h-2 ${
              labelText ? "inset-y-10" : "inset-y-4"
            } right-0 pr-3 flex items-center pointer-events-none`}
          >
            <div>
              <IoIosSearch />
            </div>
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
