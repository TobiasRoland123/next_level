import { Layout } from "@/Layout";
import ContactForm from "@/modules/Forms/Contactform/ContactForm";
import { Hero } from "@/modules/Hero/Hero";
import { FaClock, FaHouse, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaYoutube } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { Accordions } from "../../components/Accordion/Accordion";
import { useEffect, useState, useRef } from "react";

export default function Kontakt() {
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const [selectedValue, setSelectedValue] = useState("");
  const contactFormRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (currentUrl.includes("foedselsdag")) {
      console.log("found");
      setSelectedValue("fødselsdag");
      if (contactFormRef.current) {
        contactFormRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } else if (currentUrl.includes("turneringer")) {
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

  return (
    <>
      <Layout>
        <main>
          <Hero
            header="Kontakt os bror"
            redWord={["bror"]}
            content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"
            isFrontPage={true}
          />
          <section className="flex justify-center">
            <article className="spacer w-full md:grid md:grid-cols-2">
              <h2 className="md:col-span-2">
                "Der findes ikke dumme spørgsmål"
              </h2>
              <div
                ref={contactFormRef}
                className="md:row-start-2 md:col-start-2 md:row-span-3"
              >
                <h3>Send os dit spørgsmål</h3>
                <ContactForm
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
                            <p
                              className="mt-0 hyphens-auto"
                              lang="da"
                            >
                              Hovedvejen 3A, <br /> 2600 Glostrup
                            </p>
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
                                <p className="font-bold mt-0">
                                  Søndag til torsdag
                                </p>
                                <p className="mt-2 ">14:00 til 03:00</p>
                              </div>
                              <div>
                                <p className="font-bold mt-0">
                                  Fredag til Lørdag
                                </p>
                                <p className="mt-2 ">14:00 til 04:00</p>
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
                          <FaYoutube
                            className={"text-3xl cursor-pointer text-accentCol"}
                          />
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
                          <FaYoutube
                            className={"text-3xl cursor-pointer text-accentCol"}
                          />
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
                          <FaYoutube
                            className={"text-3xl cursor-pointer text-accentCol"}
                          />
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
                          <FaYoutube
                            className={"text-3xl cursor-pointer text-accentCol"}
                          />
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
                <section className="justify-center md:row-start-4 md:col-span-1 md:max-w-[80%]">
                  <h3>faq</h3>
                  <Accordions
                    items={[
                      {
                        item: {
                          itemHeader: "Spørgsmål 1",
                          itemContent: "Svar på spørgsmål 1",
                        },
                      },
                      {
                        item: {
                          itemHeader: "Spørgsmål 2",
                          itemContent: "Svar på spørgsmål 2",
                        },
                      },
                      {
                        item: {
                          itemHeader: "Spørgsmål 3",
                          itemContent: "Svar på spørgsmål 3",
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
