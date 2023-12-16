import { Layout } from "@/Layout";
import { Card } from "@/components/Cards/Card";
import { EventCard } from "@/components/Cards/EventCard";
import { Hero } from "@/modules/Hero/Hero";
import { link } from "fs";
import { Button } from "../components/Button/Button";
import { RelatedContact } from "@/components/RelatedContact/RelatedContact";

export default function Events() {
  return (
    <>
      <Layout>
        <main>
          <Hero
            header="Top tier gaming events"
            redWord={["gaming"]}
            isFrontPage={false}
            content="Vi holder de fedeste gaming events i vores gaming center i Glostrup. Alt du skal gøre er at kontakte os omkring hvilket event du godt kunne tænke dig at holde. Vi holder en række forskellige events alt fra børnefødselsdage til firma events og alt derimellem. Synes du der mangler noget, så hjælper vi også gerne med at arrangere lige dét event du ønsker"
            buttonProps={{ children: "Kontakt os" }}
            link="./om-os/kontakt"
          />
          <section>
            <article className="flex justify-center">
              <div className="spacer w-full">
                <div>

                  <h2 className=" hyphens-auto">
                    Forskellige typer <span className="text-accentCol">events</span>
                  </h2>
                  <p>
                    Som standard udbyder vi en række forskellige events. Har du et ønske om et skræddersyet event, så{" "}

                    <a
                      className="text-accentCol"
                      href="/om-os/kontakt"
                    >
                      skriv til os
                    </a>
                  </p>

                  <div className=" flex flex-col items-center md:items-stretch md:flex-row md:flex-wrap gap-6 mt-10 md:mt-16 justify-around md:gap-10">
                    <EventCard
                      header="Børne - Fødselsdag"
                      content="Vores børnefødselsdage er et hit! Gaming er noget vi kan samles om, og kunne give det videre til børnene gennem vores børnefødselsdage er noget vi er rigtig glad for."
                      image="foedselsdag"
                      buttonProps={{
                        children: `Læs mere om fødselsdage`,
                        link: "/events/foedselsdag",
                      }}
                    />
                    <EventCard
                      header="Firma Event"
                      content="Gaming er for alle! Med vores firma events har vi skabt et koncept som giver virksomheder et alternativ til de klassiske oplevelser. Vi har skabt en oplevelse i særklasse hvor alle kan være med ligemeget om du er nybegynder, eller rutineret gamer."
                      image="firma"
                      buttonProps={{
                        children: `Læs mere om Firma Events`,
                        link: "/events/firma-events",
                      }}
                    />
                    <EventCard

                      header='Turnering'
                      content='Vi afholder de fedeste turneringer, med de bedste præmier. Vi afholder turneringer i Counter-Strike, League of Legends, Dota 2 og mange flere.'
                      image='turnering'

                      buttonProps={{
                        children: `Læs mere om turneringer`,
                        link: "/events/turneringer",
                      }}
                    />
                  </div>
                </div>
              </div>
            </article>
          </section>
          <section>
            <RelatedContact
              header="Du kan altid kontakte os"
              redWord={["kontakte", "os"]}
              subHeader="har du spørgsmål til dit kommende event?"
              content="Ønsker du at afholde en børnefødselsdag, firma event, polterabend eller andet? Så tøv ikke med at kontakte os. Vi vil gå langt for at give dig den bedste gaming oplevelse. "
              buttonProps={{
                children: "Kontakt os om events",
                link: "../om-os/kontakt?andet",
              }}
            />
          </section>
        </main>
      </Layout>
    </>
  );
}
