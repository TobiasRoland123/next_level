import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";
import { PresenceContext } from "framer-motion";
import { useState } from "react";
import { boolean } from "zod";

interface ascendingDescendingProps {
  trueState: string;
  falseState: string;
  pressed: boolean;
  onChange?: () => void;
  className?: string;
}

export function AscendingDescending({ trueState, falseState, pressed, onChange, className }: ascendingDescendingProps) {
  return (
    <Toggle
      aria-label="Toggle Acsending - Decsending"
      pressed={pressed}
      onPressedChange={onChange}
      className={cn("bg-contrastCol", className)}
    >
      {pressed ? trueState : falseState}
    </Toggle>
  );
}
