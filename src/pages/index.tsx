import { Button } from "@/components/Button/Button";

import { Header } from "../modules/Header/Header";

import { Input } from "@/components/Inputfields/Inputfield";

import { Footer } from "@/modules/Footer/Footer";
import { Hero } from "@/modules/Hero/Hero";
import { ParagraphBold } from "@/components/ParagraphBold/ParagraphBold";

export default function Home() {
  return (
    <>
      <Hero
        header="Dk's bedste gaming center"
        redWord="bedste"
        content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"
        buttonLabel="Book Nu"
        isFrontPage
      />
      <section className=" mx-auto">
        <article className=" spacer">
          <h2>
            Next Level <span className="text-accentCol">Priser</span>
          </h2>
          <div>GameCard set placeholder</div>

          <Button
            variant={"secondary"}
            children={"Se alle vores priser"}
          />
        </article>
        <article className=" bg-hero2 bg-no-repeat bg-cover w-screen py-14 md:py-16 lg:py-20 mt-14 md:mt-16 lg:mt-20">
          <div className="spacer !mt-0">
            <h2>
              Skal du holde et <span className="text-accentCol">Event?</span>
            </h2>
            <ParagraphBold
              underlined
              text="VI holder de bedste events med fokus på gaming"
            />

            <p>
              “Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibuwlum tempor dictum fringilla. Mauris volutpat
              dictum lectus venenatis suscipit. Aenean faucibus mole
            </p>

            <Button
              //This is wating on aproval of another branch, therefore it's commented out
              // link="/events"
              children="Find vores events her"
            />
          </div>
        </article>
        <article className="spacer">
          <h2>
            Vores <span className="text-accentCol">Kunder</span> siger
          </h2>

          <section className="flex flex-col md:flex-row gap-10">
            <article>
              <h3>Whalla luksus toast</h3>
              <p>
                “Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibuwlum tempor dictum fringilla. Mauris volutpat
                dictum lectus venenatis suscipit. Aenean faucibus molestie dictum. Nulla mollis”
              </p>
              <small className="font-bold before:w-6 before:bg-accentCol before:flex before:h-[2px] flex before:my-auto gap-3">
                Boris Brix
              </small>
            </article>
            <article>
              <h3>Whalla luksus toast</h3>
              <p>
                “Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibuwlum tempor dictum fringilla. Mauris volutpat
                dictum lectus venenatis suscipit. Aenean faucibus molestie dictum. Nulla mollis”
              </p>
              <small className="font-bold before:w-6 before:bg-accentCol before:flex before:h-[2px] flex before:my-auto gap-3">
                Boris Brix
              </small>
            </article>
            <article>
              <h3>Whalla luksus toast</h3>
              <p>
                “Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibuwlum tempor dictum fringilla. Mauris volutpat
                dictum lectus venenatis suscipit. Aenean faucibus molestie dictum. Nulla mollis”
              </p>
              <small className="font-bold before:w-6 before:bg-accentCol before:flex before:h-[2px] flex before:my-auto gap-3">
                Boris Brix
              </small>
            </article>
          </section>
        </article>
      </section>
    </>
  );
}
