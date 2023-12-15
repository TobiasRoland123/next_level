import { Layout } from "@/Layout";
import ContactForm from "@/modules/Forms/Contactform/ContactForm";
import { Hero } from "@/modules/Hero/Hero";
import { FaClock, FaHouse, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaYoutube } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitch } from "react-icons/fa";


import { AnimatePresence, motion } from 'framer-motion';
import { Accordions } from '../../components/Accordion/Accordion';
import { useEffect, useState, useRef } from 'react';
import { HiCpuChip } from 'react-icons/hi2';
import { BsGpuCard } from 'react-icons/bs';
import { FaDesktop, FaHeadset, FaKeyboard, FaMemory, FaMouse } from 'react-icons/fa';
import { useAtom } from 'jotai';
import { submitFormAtom } from '@/states/store';


export default function Kontakt() {
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const contactFormRef = useRef<HTMLDivElement | null>(null);
  const [submitForm, setSubmitForm] = useAtom(submitFormAtom);

  useEffect(() => {
    if (currentUrl.includes("foedselsdag")) {
      console.log("found");
      setSelectedValue("fødselsdag");
      if (contactFormRef.current) {
        contactFormRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } else if (currentUrl.includes("turnering")) {
      setSelectedValue("turnering");
      console.log(selectedValue);
      if (contactFormRef.current) {
        contactFormRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } else if (currentUrl.includes("firma-event")) {
      setSelectedValue("firma-event");
      console.log(selectedValue);
      if (contactFormRef.current) {
        contactFormRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } else if (currentUrl.includes("andet")) {
      setSelectedValue("andet");
      console.log(selectedValue);
      if (contactFormRef.current) {
        contactFormRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } else if (currentUrl.includes("nlp")) {
      setSelectedValue("nlp");
      console.log(selectedValue);
      if (contactFormRef.current) {
        contactFormRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      console.log("not found");
      console.log(selectedValue);
      setSelectedValue("");
    }
  }, [currentUrl]);

  useEffect(() => {
    console.log("Updated state:", selectedValue);
  }, [selectedValue]);

  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
    console.log("contact", value);
  };
  const handleDateChange = (value: string) => {
    setSelectedDate(value);
    console.log("Date", value);
  };

  return (
    <>
      <Layout>
        <main>
          <Hero
            header="Kontakt os"
            redWord={["os"]}
            content="Vi elsker at høre fra jer. Hvis du har nogle spørgsmål, så tøv ikke med at kontakte os hvis du har nogle spørgsmål."
            isFrontPage={true}
          />

          <section className='flex justify-center'>
            <article className='spacer w-full md:grid md:grid-cols-2'>
              <h2 className='md:col-span-2'>"Der findes ikke dumme spørgsmål"</h2>

              <div
                ref={contactFormRef}
                className="md:row-start-2 md:col-start-2 md:row-span-3"
              >
                {!submitForm && <h3>Send os dit spørgsmål</h3>}
                <ContactForm
                  onDateChange={handleDateChange}
                  selectedValue={selectedValue}
                  onSelectChange={handleSelectChange}
                />
              </div>
              {/* INFORMATION */}
              <div className="w-full mt-16 md:col-start-1 md:row-start-2">
                <div className="bg-contrastCol  p-4 md:max-w-[80%] md:col-start-1">
                  <h4 className="mt-0">Information</h4>
                  <ul className="flex flex-col sm:flex-row gap-3 ">
                    <li>
                      <ul>
                        <li>
                          <div className="flex items-start gap-4 mt-4 ">
                            <FaHouse className={"text-accentCol"} />
                            <a
                              className="mt-0 hyphens-auto"
                              lang="da"
                              href="https://maps.app.goo.gl/eKRjh2DJL8qw7nvX8"
                              target="_blank"
                            >
                              Hovedvejen 3A, <br /> 2600 Glostrup
                            </a>
                          </div>
                        </li>

                        <li>
                          <div className="flex items-center gap-4 mt-4">
                            <FaPhone className={"text-accentCol"} />
                            <a
                              className="mt-0 hyphens-auto"
                              lang="da"
                              href="tel:50988887"
                            >
                              50 98 88 87
                            </a>
                          </div>
                        </li>
                        <li>
                          <div className="flex items-center gap-4 mt-4">
                            <MdEmail className={"text-accentCol"} />
                            <a
                              className="mt-0 hyphens-auto"
                              lang="da"
                              href="mailto:info@nextlvl.dk"
                            >
                              info@nextlvl.dk
                            </a>
                          </div>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <ul>
                        <li>
                          <div className="flex items-start gap-4 mt-4">
                            <FaClock className={"text-accentCol"} />
                            <div className="flex flex-col gap-6">
                              <div>

                                <p className='font-bold mt-0'>Søndag til torsdag</p>
                                <p className='mt-2 '>14:00 til 03:00</p>
                              </div>
                              <div>
                                <p className='font-bold mt-0'>Fredag til Lørdag</p>
                                <p className='mt-2 '>14:00 til 04:00</p>

                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>

                {/* SOCIAL MEDIA */}
                <div className="w-full !mt-0 md:max-w-[80%]">
                  <div className="h-36 flex bg-contrastCol mt-8 p-4 flex-col  justify-between">
                    <div>
                      <h4 className="mt-0">Sociale medier</h4>
                    </div>
                    <div className="flex justify-evenly align-center mt-auto mb-auto">
                      <AnimatePresence>
                        <motion.div
                          whileHover={{ scale: 1.5 }}
                          animate={{ rotate: 0, scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 20,
                          }}
                        >
                          <a
                            target="_blank"
                            href="https://www.youtube.com/channel/UCG4CeyBvWjuyDxkYGlloVfg"
                          >

                            <FaYoutube className={'text-3xl cursor-pointer text-accentCol'} />

                          </a>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.5 }}
                          animate={{ rotate: 0, scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 20,
                          }}
                        >
                          <a
                            target="_blank"
                            href="https://www.facebook.com/Nextlvl.dk/"
                          >

                            <FaFacebook className={'text-3xl cursor-pointer text-accentCol'} />

                          </a>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.5 }}
                          animate={{ rotate: 0, scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 20,
                          }}
                        >
                          <a
                            target="_blank"
                            href="https://www.tiktok.com/"
                          >

                            <FaTiktok className={'text-3xl cursor-pointer text-accentCol'} />

                          </a>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.5 }}
                          animate={{ rotate: 0, scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 20,
                          }}
                        >
                          <a
                            target="_blank"
                            href="https://www.linkedin.com/feed/"
                          >

                            <FaLinkedin className={'text-3xl cursor-pointer text-accentCol'} />

                          </a>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.5 }}
                          animate={{ rotate: 0, scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 20,
                          }}
                        >
                          <a
                            target="_blank"
                            href="https://www.twitch.tv/"
                          >

                            <FaTwitch className={'text-3xl cursor-pointer text-accentCol'} />

                          </a>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.5 }}
                          animate={{ rotate: 0, scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 20,
                          }}
                        >
                          <a
                            target="_blank"
                            href="https://www.instagram.com/nextlvl.dk/?hl=da"
                          >

                            <FaInstagram className={'text-3xl cursor-pointer text-accentCol'} />

                          </a>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                {/* FAQ */}
                <section className="justify-center md:row-start-4 md:col-span-1 md:max-w-[80%]">
                  <h3 className="mb-3">faq</h3>
                  <Accordions
                    items={[
                      {
                        item: {
                          itemHeader: "Hvilket udstyr har i?",
                          itemContent:
                            "Vi samarbejder med de bedste leverandører på markedet. Alle vores computere har følgende specs:",
                          children: [
                            <div className="flex flex-col gap-5 ">
                              <div className="flex mt-5 flex-col md:flex-row md:justify-between">
                                <div className="flex flex-col gap-5">
                                  <div className="flex gap-1">
                                    <HiCpuChip
                                      className="flex-shrink-0"
                                      size={20}
                                    />

                                    <p className='text-secondaryCol mt-0'>i9-14900KF</p>

                                  </div>
                                  <div className="flex gap-3">
                                    <BsGpuCard
                                      className="flex-shrink-0"
                                      size={20}
                                    />

                                    <p className='text-secondaryCol mt-0'>RTX 4080</p>

                                  </div>
                                  <div className="flex gap-3">
                                    <FaMemory
                                      className="flex-shrink-0"
                                      size={20}
                                    />

                                    <p className='text-secondaryCol mt-0'> 64GB DDR5 RAM</p>

                                  </div>
                                </div>
                                <div className="flex flex-col gap-5 mt-5 md:mt-0">
                                  <div className="flex gap-3">
                                    <FaDesktop
                                      className="flex-shrink-0"
                                      size={20}
                                    />

                                    <p className='text-secondaryCol mt-0'>27" 1440p 240HZ</p>

                                  </div>
                                  <div className="flex gap-3">
                                    <FaMouse
                                      className="flex-shrink-0"
                                      size={20}
                                    />
                                    <p className="text-secondaryCol mt-0">Logitech G PRO X SUPERLIGHT</p>
                                  </div>
                                  <div className="flex gap-3">
                                    <FaKeyboard
                                      className="flex-shrink-0"
                                      size={20}
                                    />

                                    <p className='text-secondaryCol mt-0'>CORSAIR K55 RGB PRO</p>

                                  </div>
                                  <div className="flex gap-3">
                                    <FaHeadset
                                      className="flex-shrink-0"
                                      size={20}
                                    />
                                    <p className="text-secondaryCol mt-0">Logitech G PRO X 2 - LIGHTSPEED</p>
                                  </div>
                                </div>
                              </div>
                            </div>,
                          ],
                        },
                      },
                      {
                        item: {
                          itemHeader: "Hvilke spil kan jeg spille?",
                          itemContent: "Vi har op mod 60 forskellige spil installeret på vores computere. Listen kan du finde ",
                          children: [
                            <a
                              className="text-accentCol"
                              href="/spil"
                            >
                              her.
                            </a>,
                          ],
                        },
                      },
                      {
                        item: {
                          itemHeader: "Skal jeg være medlem for at spille?",
                          itemContent:
                            "Nej du skal ikke være medlem. Skal du udnytte vores fordelagtige priser på gaming tid, skal du dog være medlem. Et medlemsskab koster 35,-. Du kan se hvad du får med ",
                          children: [
                            <a
                              className="text-accentCol"
                              href="/priser"
                            >
                              her.
                            </a>,
                          ],
                        },
                      },
                      {
                        item: {
                          itemHeader: "Skal jeg have min egen Steam-konto?",
                          itemContent:
                            "For det meste skal du ikke have din egen Steam-konto. De mest populære spil som Counter-Strike osv. har vi vores egne konti. Andre spil kræver din egen konto. Kontakt os hvis du er i tvivl",
                        },
                      },
                      {
                        item: {

                          itemHeader: 'Hvor gammel skal jeg være for at kunne game?',

                          itemContent:
                            "Der er ingen aldersgrænse hos os. Dog anbefaler vi at en forældre hjælper med evt. oprettelse af et medlemsskab, eller medbringer kode til barnets konto (fx. til Fortnite",
                        },
                      },
                      {
                        item: {

                          itemHeader: 'Hvordan booker jeg plads i gaming centret?',

                          itemContent:
                            "Vi har gjort booking nemt. Det er muligt at booke tid 14 dage ud i fremtiden. Ønsker du derimod at booket et event, kan du kontakte os ",
                          children: [
                            <a
                              className="text-accentCol"
                              href="/booking"
                            >
                              her.
                            </a>,
                          ],
                        },
                      },
                      {
                        item: {

                          itemHeader: 'Hvad er forskellen på NLP og gaming centret?',

                          itemContent:
                            "NLP rummet står for Next Level Pro room. Det siger sig selv at her får du en ekstra Next Level oplevelse. Her har vi skabt et rum hvor der er skruet op for intensiteten og specs på computerne. Det er muligt at reservere NLP-rummet hvis i er min. 6 personer. Forespørg på reservation ",
                          children: [
                            <a
                              className="text-accentCol"
                              href="/om-os/kontakt?nlp"
                            >
                              her.
                            </a>,
                          ],
                        },
                      },
                      {
                        item: {
                          itemHeader: "Hvad hvis jeg løber tør midt i et game?",
                          itemContent:
                            "Vores system logger dig automatisk ud, når du løber tør for tid. Du får dog en advarsel når der er 30 minutter tilbage af din tid. Det giver dig tid nok til at afslutte dit spil.",
                        },
                      },
                      {
                        item: {
                          itemHeader: "Koster det penge at blive medlem?",
                          itemContent:
                            "Det koster 35,- at blive medlem, men så får du også adgang til vores de bedste fordele og priser. Læs os vores medlemspriser ",
                          children: [
                            <a
                              className="text-accentCol"
                              href="/priser"
                            >
                              her.
                            </a>,
                          ],
                        },
                      },
                      // Add more items as needed
                    ]}
                  />
                </section>
              </div>
            </article>
          </section>
        </main>
      </Layout>
    </>
  );
}
