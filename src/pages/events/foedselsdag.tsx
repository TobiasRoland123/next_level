import { Layout } from "@/Layout";
import { Hero } from "@/modules/Hero/Hero";
import Image from "next/image";
import barnVr from "../../../public/images/event/foedselsdag/barn-vr.jpeg";
import { Card } from "@/components/Cards/Card";
import { Button } from "@/components/Button/Button";

export default function Foedselsdag() {
  return (
    <>
      <article>
        <Hero
          header="Fødseldagen du aldrig glemmer"
          redWord={["du", "aldrig", "glemmer"]}
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus auctor euismod posuere. Integer non ullamcorper mi. Vestibulum et congue lorem. Suspendisse iaculis semper mauris eget aliquet. Mauris malesuada purus et rhoncus auctor. Fusce vitae justo risus."
          buttonLabel="Book din fødselsdag her"
          isFrontPage={false}
          link="../om-os/kontakt?foedselsdag"
        />
      </article>
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus auctor euismod posuere. Integer non ullamcorper mi.
                Vestibulum et congue lorem. Suspendisse iaculis semper mauris
                eget aliquet. Mauris malesuada purus et rhoncus auctor. Fusce
                vitae justo risus. Vestibulum convallis justo eu diam dignissim
                posuere. Donec ac maximus lectus. Praesent non nibh eget sem
                tincidunt ultricies vel vitae magna. Nullam eget tellus id quam
                commodo iaculis convallis a odio. Phasellus sagittis velit eget
                leo.
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
            <div className="flex flex-col justify-around md:flex-row mt-10 gap-6">
              <Card variant={"bday1"} />
              <Card variant={"bday2"} />
            </div>
          </div>
        </article>
      </section>
    </>
  );
}
