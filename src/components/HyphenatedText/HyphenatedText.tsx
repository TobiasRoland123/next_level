import React from "react";
import { hyphenate } from "../../../utils/hyphenation";

interface HyphenatedTextProps {
  text?: string;
  minWordLength?: number;
}

/**
 * Render a hyphenated text, so it wraps nicely in the browser.
 * @param text
 * @param minWordLength
 * @constructor
 */
export function HyphenatedText({ text, minWordLength }: HyphenatedTextProps) {
  return React.useMemo(
    () => <>{text ? hyphenate(text, minWordLength ? { minWordLength } : undefined) : null}</>,
    [text, minWordLength]
  );
}
