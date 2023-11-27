export interface customerQuoteProps {
  header: string;
  text: string;
  author: string;
}

export const CustomerQuote = ({ header, text, author }: customerQuoteProps) => {
  return (
    <>
      <article>
        <h3>{header}</h3>
        <p>"{text}"</p>
        <small className="font-bold before:w-6 before:bg-accentCol before:flex before:h-[2px] flex before:my-auto gap-3">
          {author}
        </small>
      </article>
    </>
  );
};
