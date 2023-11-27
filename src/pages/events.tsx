import { Hero } from "@/modules/Hero/Hero";

export default function Events() {
  return (
    <>
      <Hero
        header="Top tier gaming events"
        redWord="gaming"
        isFrontPage={false}
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non urna aliquet, mollis lacus sed, dignissim lectus. Curabitur eget diam volutpat, facilisis massa nec, varius nulla."
        buttonLabel="Kontakt os"
      />

      <section>
        <article className="flex justify-center">
          <div className="spacer w-full">
            <h2>
              Forskellige typer <span className="text-accentCol">events</span>
            </h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus auctor euismod posuere. Integer non ullamcorper
              mi. Vestibulum et congue lorem. Suspendisse iaculis semper mauris eget aliquet.{" "}
            </p>
            <div className="border-2 border-green-500 ">EventCards goes here!!!!!!!!!!!!!!</div>
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
                  purus et rhoncus auctor. Fusce vitae justo risus. Vestibulum convallis justo eu diam dignissim posuere. Donec ac
                  maximus lectus. Praesent non nibh eget sem tincidunt ultricies vel vitae magna. Nullam eget tellus id quam
                  commodo iaculis convallis a odio. Phasellus sagittis velit eget leo.{" "}
                </p>
              </article>
              <div className="border-2 border-green-500">Form goes here !!!!!!!!!!</div>
            </div>
          </div>
        </article>
      </section>
    </>
  );
}
