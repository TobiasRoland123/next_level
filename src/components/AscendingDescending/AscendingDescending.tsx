import { Toggle } from "@/components/ui/toggle";
import { PresenceContext } from "framer-motion";
import { useState } from "react";
import { boolean } from "zod";

interface ascendingDescendingProps {
  trueState: string;
  falseState: string;
  pressed: boolean;
  onChange?: () => void;
}

export function AscendingDescending({ trueState, falseState, pressed, onChange }: ascendingDescendingProps) {
  return (
    <Toggle
      aria-label="Toggle Acsending - Decsending"
      className="bg-contrastCol"
      pressed={pressed}
      onPressedChange={onChange}
    >
      {pressed ? trueState : falseState}
    </Toggle>
  );
}
