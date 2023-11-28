import React, { ReactNode } from "react";
import { text } from "stream/consumers";

interface paragraphBoldProps {
  underlined?: boolean;
  text: string;
}

export const ParagraphBold = ({ underlined = false, text = "im a bold paragraph" }: paragraphBoldProps) => {
  return (
    <p
      className={`font-bold mb-2 relative uppercase ${
        underlined &&
        "after:h-[2px] after:w-2/3 after:max-w-[150px] after:bg-accentCol after:absolute after:-bottom-2 after:left-0"
      }`}
    >
      {text}
    </p>
  );
};
