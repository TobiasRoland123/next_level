import { HyphenatedText } from "../HyphenatedText/HyphenatedText";

export interface customerQuoteProps {
  header: string;
  text: string;
  author: string;
}

export const CustomerQuote = ({ header, text, author }: customerQuoteProps) => {
  return (
    <>
      <article>
        <h3>
          <HyphenatedText text={header} />
        </h3>
        <p>
          "<HyphenatedText text={text} />"
        </p>
        <small className="font-bold before:w-6 before:bg-accentCol before:flex before:h-[2px] flex before:my-auto gap-3">
          {author}
        </small>
      </article>
    </>
  );
};
