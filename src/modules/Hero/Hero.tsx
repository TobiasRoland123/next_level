import Image from "next/image";
import heroPlaceholder from "../../../public/images/hero-placeholder.webp";
import { Button, ButtonProps } from "../../components/Button/Button";
import { HyphenatedText } from "@/components/HyphenatedText/HyphenatedText";

interface heroProps {
  header?: string;
  content?: string;
  buttonProps?: ButtonProps;
  /**
   * To be sure not to make type errors please copy paste word.
   * If word is lowercase in header, then it also needs to be lowercase here.
   */
  redWord?: Array<string>;
  /**
   * If used on front page set to true
   */
  isFrontPage: boolean;
}

export const Hero = ({ header, content, buttonProps, redWord, isFrontPage }: heroProps) => {
  const renderHeader = () => {
    if (!header) return null;

    const words = header.split(" ");
    return (
      <h1>
        {words.map((word, index) => (
          <span
            key={index}
            // className={word === redWord ? "text-accentCol" : ""}
            className={`${redWord?.map((redWord) => (redWord === word ? "text-accentCol" : "")).join(" ")}`}
          >
            <HyphenatedText text={word} />{" "}
          </span>
        ))}
      </h1>
    );
  };

  return (
    <>
      <header
        className={`flex min-h-screen justify-center ${
          isFrontPage ? "bg-hero2" : "bg-hero1"
        } bg-center md:bg-left bg-cover bg-no-repeat pb-10`}
      >
        <div className="max-w-screen-xl w-full mt-20  spacer">
          <section className=" bg-contrastCol/50 backdrop-blur-sm mt-28 px-4 py-6 rounded-sm h-fit md:max-w-[66%]">
            {renderHeader()}

            {content && (
              <p className="mt-4">
                <HyphenatedText text={content} />
              </p>
            )}

            {buttonProps && (
              <Button
                className=" mt-7"
                {...buttonProps}
              />
            )}
          </section>
        </div>
      </header>
    </>
  );
};
