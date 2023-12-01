import { Layout } from "@/Layout";
import { Input } from "@/components/Inputfields/Inputfield";
import { Hero } from "@/modules/Hero/Hero";
import { FaUserGroup } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { DatePicker } from "@/components/Calender/DatePicker";

export default function Booking() {
  return (
    <>
      <Layout>
        <main>
          <Hero header="Book DK's mest unikke gaming oplevelse" redWord={["unikke"]} isFrontPage={false} content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non urna aliquet, mollis lacus sed, dignissim lectus. Curabitur eget diam volutpat, facilisis massa nec, varius nulla." />
          <section>
            <article id="antalGuests" className="w-full">
              <div className="bg-contrastCol mt-8 p-4 lg:block">
                <h4 className="mt-0">Hvor mange kommer i?</h4>
                <p> For at vi kan checke om der er PC'er nok til jer, så vil vi gerne vide hvor mang i kommer. </p>
              </div>
              <div className="bg-contrastCol md:mt-8 p-4 lg:block">
                <p className="mt-0 flex flex-row align-middle gap-x-2">
                  <FaUserGroup className="inline-block mt-0.4" />
                  <span>Antal (max 5)</span>
                </p>
                <Input type="number" max={5} min={1} className="border-white"></Input>
              </div>
            </article>
            <article id="date" className="w-full">
              <div className="bg-contrastCol mt-8 p-4 lg:block">
                <h4 className="mt-0">Hvilken dag vil i komme?</h4>
                <p> I kan booke tid 14 dage frem og alle ledige datoer vil være markeret med grøn farve. Dage vi er fuldt bookede er market med rød.</p>
              </div>
              <div className="bg-contrastCol md:mt-8 p-4 lg:block">
                <p className="mt-0 flex flex-row align-middle gap-x-2">
                  <FaCalendarAlt className="inline-block mt-0.4" />
                  <span>Dato</span>
                </p>
                <DatePicker ></DatePicker>
              </div>
            </article>
            <article id="time" className="w-full"></article>
            <article id="place" className="w-full"></article>
            <article id="personalInfo" className="w-full"></article>
          </section>
        </main>
      </Layout>
    </>
  );
}
