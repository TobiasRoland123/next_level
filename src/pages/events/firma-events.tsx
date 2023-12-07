import { Layout } from "@/Layout";
import { Hero } from "@/modules/Hero/Hero";
import Image from "next/image";
import firmaEvent from "../../../public/images/event/firma-event.jpg";
import { RelatedContact } from "../../components/RelatedContact/RelatedContact";

export default function FirmaEvents() {
  return (
    <>
      <Layout>
        <main>
          <Hero
            isFrontPage={false}
            header="professionelle firma events"
            redWord={["firma", "events"]}
            content="Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. "
            link="../om-os/kontakt?firma-event"
            buttonProps={{
              children: "Kontakt os",
              link: "../om-os/kontakt?firma-event",
            }}
          />
          <section>
            <article className="flex justify-center">
              <div className="spacer w-full">
                <h2>
                  Dit næste firma <span className="text-accentCol">event</span>
                </h2>

                <div className="flex flex-col md:flex-row gap-14 md:mt-10">
                  <div>
                    <h3 className="md:mt-0">Det perfekte sociale arrangement til kolleger</h3>
                    <p>
                      Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical
                      Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at
                      Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem
                      Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable
                    </p>
                  </div>
                  <div>
                    <Image
                      src={firmaEvent}
                      width={1000}
                      height={1000}
                      alt="mænd der spiller computer"
                    />
                  </div>
                </div>
              </div>
            </article>
          </section>

          <section>
            <div className="flex justify-center">
              <h2 className="spacer w-full">
                Eksempler på tidligere <span className=" text-accentCol">Firma events</span>
              </h2>
            </div>
            <article className="flex justify-center">
              <div className="spacer flex flex-col md:flex-row w-full gap-14 md:mt-32">
                <div>
                  <h3 className="md:mt-0">Eksempel 1</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus auctor euismod posuere. Integer non
                    ullamcorper mi. Vestibulum et congue lorem. Suspendisse iaculis semper mauris eget aliquet. Mauris malesuada
                    purus et rhoncus auctor. Fusce vitae justo risus. Vestibulum convallis justo eu diam dignissim posuere. Donec
                    ac maximus lectus. Praesent non nibh eget sem tincidunt ultricies vel vitae magna. Nullam eget tellus id quam
                    commodo iaculis convallis a odio. Phasellus sagittis velit eget leo.
                  </p>
                </div>
                <div className="md:max-w-[40%]">
                  <Image
                    className="mt-6 md:mt-0"
                    src={firmaEvent}
                    width={1000}
                    height={1000}
                    alt="gutter der spiller"
                  />
                </div>
              </div>
            </article>

            <article className="flex justify-center">
              <div className="spacer flex flex-col md:flex-row w-full gap-14 md:mt-20">
                <div className="md:max-w-[40%] md:order-1 order-2 mt-6 md:mt-0 ">
                  <Image
                    className=" "
                    src={firmaEvent}
                    width={1000}
                    height={1000}
                    alt="gutter der spiller"
                  />
                </div>
                <div className="order-1 md:order-2">
                  <h3 className="md:mt-0">Eksempel 2</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus auctor euismod posuere. Integer non
                    ullamcorper mi. Vestibulum et congue lorem. Suspendisse iaculis semper mauris eget aliquet. Mauris malesuada
                    purus et rhoncus auctor. Fusce vitae justo risus. Vestibulum convallis justo eu diam dignissim posuere. Donec
                    ac maximus lectus. Praesent non nibh eget sem tincidunt ultricies vel vitae magna. Nullam eget tellus id quam
                    commodo iaculis convallis a odio. Phasellus sagittis velit eget leo.
                  </p>
                </div>
              </div>
            </article>
          </section>

          <section>
            <RelatedContact
              header="Du kan altid kontakte os"
              redWord={["kontakte", "os"]}
              subHeader="har du spørgsmål til dit kommende firma event?"
              content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus auctor euismod posuere. Integer non ullamcorper mi. Vestibulum et congue lorem. Suspendisse iaculis semper mauris eget aliquet. Mauris malesuada purus et rhoncus auctor. Fusce vitae justo risus. Vestibulum convallis justo eu diam dignissim posuere. Donec ac maximus lectus. Praesent non nibh eget sem tincidunt ultricies vel vitae magna. Nullam eget tellus id quam commodo iaculis convallis a odio. Phasellus sagittis velit eget leo. "
              buttonProps={{ children: "Kontakt om firma event ", link: "../om-os/kontakt?firma-event" }}
            />
          </section>
        </main>
      </Layout>
    </>
  );
}
