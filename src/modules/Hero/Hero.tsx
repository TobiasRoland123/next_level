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
}

export const Hero = ({ header, content, buttonLabel, redWord }: heroProps) => {
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
      <header className="w-full flex min-h-screen bg-hero1 bg-cover bg-no-repeat pb-10">
        <section className=" bg-contrastCol/50 backdrop-blur-sm mt-28  mx-4 px-4 py-6 rounded-sm h-fit md:max-w-[66%] lg:max-w-3xl  ">
          {renderHeader()}
          <p className="mt-4">{content && content}</p>
          {buttonLabel && <Button className=" mt-7">{buttonLabel}</Button>}
        </section>
      </header>
    </>
  );
};
