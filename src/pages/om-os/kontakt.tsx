import { Layout } from "@/Layout";
import ContactForm from "@/modules/Forms/Contactform/ContactForm";
import { Hero } from "@/modules/Hero/Hero";
import { FaClock, FaHouse, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaYoutube } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

export default function Kontakt() {
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
            <article className="spacer w-full">
              <h2>"Der findes ikke dumme spørgsmål"</h2>
              <h3>Send os dit spørgsmål</h3>

              <ContactForm />

              {/* INFORMATION */}
              <div className="w-full mt-16">
                <div className="bg-contrastCol mt-8 p-4 md:max-w-[66%]">
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
              </div>

              {/* SOCIAL MEDIA */}
              <div className="w-full !mt-0">
                <div className="h-36 flex bg-contrastCol mt-8 p-4 flex-col md:max-w-[66%]">
                  <div>
                    <h4 className="mt-0">Sociale medier</h4>
                  </div>
                  <div className="flex justify-evenly align-center">
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
                        <FaYoutube className={"text-3xl cursor-pointer"} />
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
                        <FaYoutube className={"text-3xl cursor-pointer"} />
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
                        <FaYoutube className={"text-3xl cursor-pointer"} />
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
                        <FaYoutube className={"text-3xl cursor-pointer"} />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </article>
          </section>
        </main>
      </Layout>
    </>
  );
}
