import { Layout } from "@/Layout";
import { Hero } from "@/modules/Hero/Hero";

export default function Turneringer() {
  return (
    <>
      <Hero
        isFrontPage={false}
        buttonProps={{ children: "Kontakt os", link: "../om-os/kontakt" }}
        content="Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur"
        header="De vildeste turneringer"
        redWord={["turneringer"]}
      />

      <section>
        <article className="flex justify-center">
          <div className="spacer w-full">
            <h2>
              Find din næste <span className="text-accentCol">turnering</span>
            </h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus auctor euismod posuere. Integer non ullamcorper
              mi. Vestibulum et congue lorem. Suspendisse iaculis semper mauris eget aliquet. Mauris malesuada purus et rhoncus
              auctor. Fusce vitae justo risus. Vestibulum convallis justo eu diam dignissim posuere. Donec acv
            </p>
            <div className="border-2 border-green-500">Turnering lineup løsning comming soon</div>
          </div>
        </article>

        <article className="flex justify-center">
          <div className="spacer w-full">
            <div className="border-2 border-green-500 ">small form comming soon</div>
          </div>
        </article>
      </section>
    </>
  );
}
