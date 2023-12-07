import createHyphenation, { HyphenationFunctionSync } from "hyphen";
import patterns from "hyphen/patterns/da";

export const defaultMinWordLength = 8;

/**
 * Use the hyphenate function, to split long words with break characters.
 */
export const hyphenate = createHyphenation(patterns, {
  async: false,
  minWordLength: defaultMinWordLength,
}) as HyphenationFunctionSync;

/**
 * Use the hyphenateHTML function, to split long words within HTML text.
 */
export const hyphenateHTML = createHyphenation(patterns, {
  async: false,
  minWordLength: defaultMinWordLength,
  html: true,
}) as HyphenationFunctionSync;
