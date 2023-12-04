import { Layout } from "@/Layout";
import { Card } from "@/components/Cards/Card";
import { EventCard } from "@/components/Cards/EventCard";
import { Hero } from "@/modules/Hero/Hero";
import { link } from "fs";

export default function Events() {
  return (
    <>
      <Layout>
        <main>
          <Hero
            header="Top tier gaming events"
            redWord={["gaming"]}
            isFrontPage={false}
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non urna aliquet, mollis lacus sed, dignissim lectus. Curabitur eget diam volutpat, facilisis massa nec, varius nulla."
            buttonProps={{ children: "Kontakt os" }}
          />
          <section>
            <article className="flex justify-center">
              <div className="spacer w-full">
                <div>
                  <h2 className=" hyphens-auto">
                    Forskellige typer <span className="text-accentCol">events</span>
                  </h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus auctor euismod posuere. Integer non
                    ullamcorper mi. Vestibulum et congue lorem. Suspendisse iaculis semper mauris eget aliquet.{" "}
                  </p>

                  <div className=" flex flex-col md:flex-row md:flex-wrap gap-6 mt-10 md:mt-16 justify-around md:gap-10">
                    <EventCard
                      header="Børne - Fødselsdag"
                      content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus auctor euismod posuere. Integer non ullamcorper mi. Vestibulum et congue lorem. Suspendisse iaculis semper mauris eget aliquet."
                      image="foedselsdag"
                      buttonProps={{ children: `Læs mere om fødselsdage`, link: "./foedselsdag" }}
                    />
                    <EventCard
                      header="Firma Event"
                      content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus auctor euismod posuere. Integer non ullamcorper mi. Vestibulum et congue lorem. Suspendisse iaculis semper mauris eget aliquet."
                      image="firma"
                      buttonProps={{ children: `Læs mere om Firma Events`, link: "./firmaevents" }}
                    />
                    <EventCard
                      header="Tuernering"
                      content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus auctor euismod posuere. Integer non ullamcorper mi. Vestibulum et congue lorem. Suspendisse iaculis semper mauris eget aliquet."
                      image="turnering"
                      buttonProps={{ children: `Læs mere om turnering`, link: "./turnering" }}
                    />
                  </div>
                </div>
              </div>
            </article>
          </section>
          <section>
            <article className="flex justify-center">
              <div className="spacer w-full">
                <h2>
                  Du kan altid <span className="text-accentCol">Kontakte os</span>
                </h2>
                <div className="flex flex-col md:flex-row gap-10">
                  <article>
                    <h3>Har du spørgsmål til dit kommende event?</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus auctor euismod posuere. Integer non
                      ullamcorper mi. Vestibulum et congue lorem. Suspendisse iaculis semper mauris eget aliquet. Mauris malesuada
                      purus et rhoncus auctor. Fusce vitae justo risus. Vestibulum convallis justo eu diam dignissim posuere.
                      Donec ac maximus lectus. Praesent non nibh eget sem tincidunt ultricies vel vitae magna. Nullam eget tellus
                      id quam commodo iaculis convallis a odio. Phasellus sagittis velit eget leo.{" "}
                    </p>
                  </article>
                  <div className="border-2 border-green-500">Form goes here !!!!!!!!!!</div>
                </div>
              </div>
            </article>
          </section>
        </main>
      </Layout>
    </>
  );
}
