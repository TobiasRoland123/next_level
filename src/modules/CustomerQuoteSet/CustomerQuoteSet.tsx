import { CustomerQuote, customerQuoteProps } from "../../components/CustomerQuote/CustomerQuote";

interface customerQuoteSetProps {
  header: string;
  redWord: string;
  customerQuotes: Array<{
    quote: customerQuoteProps;
  }>;
}

export const CustomerQuoteSet = ({ header, redWord, customerQuotes }: customerQuoteSetProps) => {
  const renderHeader = () => {
    if (!header) return null;

    const words = header.split(" ");
    return (
      <h2
        className="col-start-1 row-start-1 self-end"
        lang="da"
      >
        {words.map((word, index) => (
          <span
            key={index}
            className={word === redWord ? "text-accentCol" : ""}
          >
            {word}{" "}
          </span>
        ))}
      </h2>
    );
  };
  return (
    <>
      <section className="flex justify-center">
        <div>
          <div className="grid grid-cols-1 spacer !w-auto">
            <svg
              className=" col-start-1 row-start-1 -mt-10 md:-ml-6 lg:mb-10 lg:-ml-14"
              width="149"
              height="89"
              viewBox="0 0 149 89"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M65.15 0.300012C67.0167 0.300012 68.65 1.00001 70.05 2.40001C71.2167 3.80001 71.8 5.31668 71.8 6.95001C71.8 8.35001 71.5667 9.75001 71.1 11.15L44.85 78.7C43.6833 81.0333 42.1667 83.25 40.3 85.35C38.4333 87.45 35.6333 88.5 31.9 88.5H7.39999C5.53332 88.5 3.89999 87.6833 2.49999 86.05C0.866661 84.65 0.283328 82.7833 0.749995 80.45L11.6 12.2C11.8333 9.40001 13 6.71667 15.1 4.15C17.2 1.58334 20.2333 0.300012 24.2 0.300012H65.15ZM142.15 0.300012C144.017 0.300012 145.65 1.00001 147.05 2.40001C148.217 3.80001 148.8 5.31668 148.8 6.95001C148.8 8.35001 148.567 9.75001 148.1 11.15L121.85 78.7C120.683 81.0333 119.167 83.25 117.3 85.35C115.433 87.45 112.633 88.5 108.9 88.5H84.75C82.65 88.5 80.9 87.6833 79.5 86.05C78.1 84.65 77.6333 82.7833 78.1 80.45L88.6 12.2C89.0667 9.40001 90.35 6.71667 92.45 4.15C94.3167 1.58334 97.2333 0.300012 101.2 0.300012H142.15Z"
                fill="#FF0C1E"
                fill-opacity="0.4"
              />
            </svg>
            {renderHeader()}
          </div>
          <div className="flex flex-col md:grid md:grid-cols-3 gap-10 spacer !w-auto !mt-0">
            {customerQuotes.map((Quote) => {
              const quote = Quote.quote;
              return (
                <CustomerQuote
                  header={quote.header}
                  text={quote.text}
                  author={quote.author}
                />
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};
