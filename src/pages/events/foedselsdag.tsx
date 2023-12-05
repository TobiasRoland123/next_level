import { Layout } from "@/Layout";
import { Hero } from "@/modules/Hero/Hero";
import Image from "next/image";
import barnVr from "../../../public/images/event/foedselsdag/barn-vr.jpeg";
import { Card } from "@/components/Cards/Card";
import { Button } from "@/components/Button/Button";
import foedselsdagImg1 from "../../../public/images/event/foedselsdag/barn-vr.jpeg";
import foedselsdagImg2 from "../../../public/images/event/foedselsdag.jpg";
import { RelatedContact } from "../../components/RelatedContact/RelatedContact";

export default function Foedselsdag() {
  return (
    <>
      <Layout>
        <main>
          <Hero
            header="Fødseldagen du aldrig glemmer"
            redWord={["du", "aldrig", "glemmer"]}
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus auctor euismod posuere. Integer non ullamcorper mi. Vestibulum et congue lorem. Suspendisse iaculis semper mauris eget aliquet. Mauris malesuada purus et rhoncus auctor. Fusce vitae justo risus."
            buttonProps={{
              children: "Kontakt os",
              link: "../om-os/kontakt?foedselsdag",
            }}
            isFrontPage={false}
          />

          <section>
            <div className="flex justify-center">
              <h2 className="spacer w-full">
                next level <span className=" text-accentCol">fødselsdag</span>
              </h2>
            </div>

            <article className="flex justify-center">
              <div className="spacer w-full flex flex-col md:flex-row gap-14">
                <div>
                  <h3
                    className="mt-0
            "
                  >
                    Elsker du og dine venner at game?
                  </h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus auctor euismod posuere. Integer non
                    ullamcorper mi. Vestibulum et congue lorem. Suspendisse iaculis semper mauris eget aliquet. Mauris malesuada
                    purus et rhoncus auctor. Fusce vitae justo risus. Vestibulum convallis justo eu diam dignissim posuere. Donec
                    ac maximus lectus. Praesent non nibh eget sem tincidunt ultricies vel vitae magna. Nullam eget tellus id quam
                    commodo iaculis convallis a odio. Phasellus sagittis velit eget leo.
                  </p>
                </div>
                <div>
                  <Image
                    src={barnVr}
                    width={1000}
                    height={1000}
                    alt="barn der spiller i vr"
                  />
                </div>
              </div>
            </article>
            <article className="flex justify-center">
              <div className="spacer w-full ">
                <h2>
                  priser på <span className=" text-accentCol">fødselsdag</span>
                </h2>
                <div className="flex flex-col items-center md:items-stretch justify-around md:flex-row mt-10 gap-6">
                  <Card
                    variant={"bday1"}
                    totalPris={120}
                  />
                  <Card
                    variant={"bday2"}
                    totalPris={150}
                  />
                </div>
              </div>
            </article>
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
                    src={foedselsdagImg1}
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
                    src={foedselsdagImg2}
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
              subHeader="har du spørgsmål til dit kommende Børne fødselsdag?"
              content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus auctor euismod posuere. Integer non ullamcorper mi. Vestibulum et congue lorem. Suspendisse iaculis semper mauris eget aliquet. Mauris malesuada purus et rhoncus auctor. Fusce vitae justo risus. Vestibulum convallis justo eu diam dignissim posuere. Donec ac maximus lectus. Praesent non nibh eget sem tincidunt ultricies vel vitae magna. Nullam eget tellus id quam commodo iaculis convallis a odio. Phasellus sagittis velit eget leo. "
              buttonProps={{ children: "Kontakt os om fødselsdag ", link: "../om-os/kontakt?foedselsdag" }}
            />
          </section>
        </main>
      </Layout>
    </>
  );
}
