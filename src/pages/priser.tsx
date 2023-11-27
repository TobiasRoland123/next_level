import { Button } from "@/components/Button/Button";
import { InfoBox } from "@/components/InfoBox/InfoBox";
import { ParagraphBold } from "@/components/ParagraphBold/ParagraphBold";
import { EventBanner } from "@/modules/EventBanner/EventBanner";
import { Hero } from "@/modules/Hero/Hero";
import { Children } from "react";
import { MdCheck } from "react-icons/md";

export default function Priser() {
  return (
    <>
      <Hero
        isFrontPage={false}
        buttonLabel="Se priserne"
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non urna aliquet, mollis lacus sed, dignissim lectus. Curabitur eget diam volutpat, facilisis massa nec, varius nulla."
        header="DK’S mest op
priser på gaming"
        redWord="op"
      />

      <section className="flex justify-center flex-col items-center">
        <article className=" md:flex spacer justify-between gap-14">
          <div>
            <h2>
              Next Level <span className="text-accentCol">priser</span>
            </h2>
            <p>
              Hos Next Level kan du både spille som gæst eller medlem. Som medlem får du de bedste priser på din gaming tid.
              Uanset om du er gæst eller medlem får du de samme gode rammer, for at nyde din oplevelse hos os. Vi gør ikke
              forskel!
            </p>
            <Button variant={"secondary"}>Se vores medlemspriser</Button>
          </div>
          <InfoBox className="text-center md:mt-0 lg:max-w-[33%] h-fit">
            <h3
              className="mt-0 hyphens-auto"
              lang="da"
            >
              Timepris for ikke medlemmer
            </h3>
            <p className=" text-4xl font-bold">20,-</p>
          </InfoBox>
        </article>
        {/* <article className=" w-full spacer">
          <h2
            className=" hyphens-auto w-full "
            lang="da"
          >
            Next Level <span className="text-accentCol">Medlemsskaber</span>
          </h2>
          <div className="flex">
            <div>
              <ParagraphBold
                text="Hvad du får som medlem"
                underlined
              />
              <p>
                Hos Next Level kan du både spille som gæst eller medlem. Som medlem får du de bedste priser på din gaming tid.
                Uanset om du er gæst eller medlem får du de samme gode rammer, for at nyde din oplevelse hos os. Vi gør ikke
                forskel!
              </p>
            </div>
            <InfoBox className="md:mt-5 lg:max-w-[33%] h-fit">
              <h3
                className="mt-0 text-2xl font-bold hyphens-auto"
                lang="da"
              >
                Timepris for ikke medlemmer
              </h3>

              <ul className="mt-6 gap-3 flex flex-col">
                <li className="flex gap-6 items-center">
                  <MdCheck className="w-6 text-[#36DF5B] h-auto" />
                  <p className="mt-0">Fordelagtige medlemspriser</p>
                </li>
                <li className="flex gap-6 items-center">
                  <MdCheck className="w-6 text-[#36DF5B] h-auto" />
                  <p className="mt-0">1 gratis drikkevarer ved hvert besøg</p>
                </li>
                <li className="flex gap-6 items-center">
                  <MdCheck className="w-6 text-[#36DF5B] h-auto" />
                  <p className="mt-0">Tag en ven med gratis én gang om måneden</p>
                </li>
                <li className="flex gap-6 items-center">
                  <MdCheck className="w-6 text-[#36DF5B] h-auto" />
                  <p className="mt-0">Fortrinsret ved turneringer</p>
                </li>
              </ul>
              <p className=" text-4xl font-bold text-center">35 ,-</p>
            </InfoBox>
          </div>
        </article> */}
      </section>
      <section className="flex justify-center flex-col items-center">
        <div className=" md:flex spacer justify-between gap-14">
          <h2
            className=" hyphens-auto"
            lang="da"
          >
            Next Level <span className="text-accentCol">Medlemskaber</span>
          </h2>
        </div>

        <article className=" md:flex spacer justify-between gap-14">
          <div>
            <ParagraphBold
              underlined
              text="Hvad får du som medlem?"
            />
            <p>
              Hos Next Level kan du både spille som gæst eller medlem. Som medlem får du de bedste priser på din gaming tid.
              Uanset om du er gæst eller medlem får du de samme gode rammer, for at nyde din oplevelse hos os. Vi gør ikke
              forskel!
            </p>
          </div>
          <InfoBox className="text-center md:mt-0 lg:max-w-[33%] h-fit">
            <h3
              className="mt-0 hyphens-auto"
              lang="da"
            >
              Timepris for ikke medlemmer
            </h3>
            <p className=" text-4xl font-bold">20,-</p>
          </InfoBox>
        </article>
      </section>

      {/* <section className="">
        <article className="spacer border-2 border-green-500">
          <h3>Dækker de fleste behov</h3>
          <p>
            Perfekt til en hurtig gamingsession. Vores Level pakker dækker langt de fleste behov. Det er uanset om du er på udkig
            efter en hurtigt session, eller gerne fordele dine timer ud på flere sessioner.
          </p>
        </article>
        <article className="spacer border-2 border-green-500">
          <h3>TIl den der ikke kan få nok</h3>
          <p>
            Perfekt til en hurtig gamingsession. Vores Level pakker dækker langt de fleste behov. Det er uanset om du er på udkig
            efter en hurtigt session, eller gerne fordele dine timer ud på flere sessioner.
          </p>
        </article>

        <article className="spacer border-2 border-green-500">
          <h3>Noget helt specielt</h3>
        </article>
      </section>

      <EventBanner
        className=""
        heading="vores Events"
        text="Korem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. "
        button={{ children: "Læs mere om events", variant: "secondary" }}
        image="firmaEvent"
      /> */}
    </>
  );
}
