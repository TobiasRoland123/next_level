import Image from "next/image";
import heroPlaceholder from "../../../public/images/hero-placeholder.webp";
import { Button } from "../../components/Button/Button";

interface heroProps {
  header?: string;
  content?: string;
  buttonLabel?: string;
  /**
   * To be sure not to make type errors please copy paste word.
   * If word is lowercase in header, then it also needs to be lowercase here.
   */
  redWord?: string;
  /**
   * If used on front page set to true
   */
  isFrontPage: boolean;
}

export const Hero = ({ header, content, buttonLabel, redWord, isFrontPage }: heroProps) => {
  const renderHeader = () => {
    if (!header) return null;

    const words = header.split(" ");
    return (
      <h1
        className="hyphens-auto md:hyphens-none"
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
      </h1>
    );
  };

  return (
    <>
      <header
        className={`w-full flex min-h-screen ${
          isFrontPage ? "bg-hero2" : "bg-hero1"
        } bg-center md:bg-left bg-cover bg-no-repeat pb-10`}
      >
        <div className="max-w-screen-xl w-full mt-20 mx-6 md:mx-12 lg:mx-20 xl:mx-auto  ">
          <section className=" bg-contrastCol/50 backdrop-blur-sm mt-28 px-4 py-6 rounded-sm h-fit md:max-w-[66%]">
            {renderHeader()}
            <p className="mt-4">{content && content}</p>
            {buttonLabel && <Button className=" mt-7">{buttonLabel}</Button>}
          </section>
        </div>
      </header>
    </>
  );
};
