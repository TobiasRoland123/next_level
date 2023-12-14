
import React, { useState } from 'react';
import { Button } from '../../components/Button/Button';
import Link from 'next/link';
import { AnimatePresence, delay, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';


interface HeaderProps {
  pageList: Array<{
    page: {
      href: string;
      pageTitle: string;

      subPages?: Array<{
        href: string;
        pageTitle: string;
      }>;
    };
  }>;
}
const container = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
  },
};

const item = {
  hidden: { opacity: 0, y: "-10%" },
  show: { opacity: 1, y: "0%" },
};

const chevron = {
  hidden: { transform: 'rotate(0deg)' },
  show: { transform: 'rotate(180deg)' },
};

const underLine = {
  hidden: { width: 0 },
  show: { width: "100%" },
};

export const Header = ({ pageList }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const ToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // console.log(pageList);

  return (
    <>
      {/* MOBILE MENU */}
      <div
        className={` bg-primaryCol w-screen h-screen fixed top-0 transition-all md:hidden z-20 overflow-scroll pb-6  ${
          isOpen ? "right-0" : "right-full"
        } flex flex-col pt-28`}
      >
        <ul className="flex mx-8 flex-col gap-8  ">
          {pageList.map((pages) => {
            return (
              <>
                <li>
                  {pages.page.subPages ? (
                    <div>
                      <a
                        href={pages.page.href}
                        className="font-bold uppercase text-2xl"
                      >
                        {pages.page.pageTitle}
                      </a>
                      <div className="pl-8 flex flex-col gap-2 mt-3 ">
                        {pages.page.subPages.map((subpage) => {
                          return (
                            <>
                              <a
                                href={subpage.href}
                                className=""
                              >
                                {subpage.pageTitle}
                              </a>
                            </>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <a
                      href={pages.page.href}
                      className="border-2 uppercase text-2xl font-bold border-transparent hover:border-b-accentCol "
                    >
                      {pages.page.pageTitle}
                    </a>
                  )}
                </li>
              </>
            );
          })}
        </ul>

        <div className="flex justify-center mt-10">
          <Button
            className="text-2xl font-bold px-8 py-6"
            link="/booking"
          >
            Book tid
          </Button>
        </div>
      </div>

      <nav className="fixed top-2 px-6 md:px-12 lg:px-20 z-20 w-full ">
        <div
          className={`my-3 backdrop-blur-sm ${
            isOpen ? "bg-primaryCol" : "bg-contrastCol/70"
          } flex justify-between items-center px-4 gap-6 rounded-sm  md:bg-contrastCol/70 xl:mx-auto max-w-main h-16`}
        >
          <div className="items-center h-full flex gap-8 font-bold ">
            <a href="/">
              <svg
                width="40"
                height="auto"
                viewBox="0 0 59 45"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M57.6692 0L37.3363 0.138683L29.5529 11.8412L20.5189 0.163853L0 0.104355L19.4341 22.3556L0.0251957 45H20.5313L29.6033 32.6072L38.11 44.0928H59L39.4857 22.135L57.6692 0ZM38.1512 1.64453L54.4518 1.53331L37.4971 22.173L55.6333 42.5806H38.8732L29.5964 30.0555L19.7635 43.4877H3.31354L21.4351 22.346L3.33827 1.6253L19.7754 1.6729L29.6468 14.4328L38.1522 1.64453H38.1512Z"
                  fill="#F2F2F2"
                />
                <path
                  d="M50.8918 0.589581L32.9237 22.1533L33.1734 22.4554L50.4191 43.3271L51.1484 42.7257L34.1524 22.1556L51.6184 1.19421L50.8918 0.589581Z"
                  fill="#F2F2F2"
                />
                <path
                  d="M8.53465 0.583607L7.80442 1.18457L25.0968 22.1524L7.07739 43.7372L7.80396 44.3428L26.325 22.1565L8.53465 0.583607Z"
                  fill="#F2F2F2"
                />
              </svg>
            </a>

            {/* DESKTOP MENU */}

            <AnimatePresence>
              <div className=" hidden md:flex uppercase h-full items-center">
                {pageList.map((pages, index) =>
                  pages.page.subPages ? (
                    <motion.div
                      variants={container}
                      key={index}
                      initial="hidden"
                      whileHover="show"
                      transition={{
                        type: "spring",
                        stiffness: 100,
                        duration: 0.3,
                      }}
                      className="group relative h-full justify-center w-[115px] flex items-center"
                    >
                      <motion.div className='mt-5 w-full flex flex-col justify-center'>
                        <motion.div className='flex justify-center gap-1'>
                          <Link
                            className='text-center'
                            href={pages.page.href}
                          >
                            {pages.page.pageTitle}
                          </Link>
                          <motion.div
                            variants={chevron}
                            transition={{ duration: 0.1 }}
                            className='flex justify-center items-center'
                          >
                            <ChevronDown size={12} />
                          </motion.div>
                        </motion.div>
                        <motion.div
                          variants={underLine}
                          transition={{ duration: 0.1 }}
                          className="h-[2px] rounded-full bg-accentCol mt-[18px]"
                        ></motion.div>
                      </motion.div>
                      <motion.div
                        variants={item}
                        className="bg-contrastCol/70 backdrop-blur-sm w-[115px] py-0 flex-col absolute flex top-16 rounded-b-sm"
                      >
                        {pages.page.subPages.map((subPage) => (
                          <motion.div className="h-7 flex items-center hover:border-l-2 border-accentCol transition-all duration-75 p-2 ease-in-out">
                            <motion.div
                              className=""
                              whileHover={{ x: 10 }}
                            >
                              <Link
                                className="text-xs"
                                href={subPage.href}
                              >
                                {subPage.pageTitle}
                              </Link>
                            </motion.div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </motion.div>
                  ) : (
                    <motion.div
                      variants={container}
                      initial="hidden"
                      whileHover="show"
                      className="relative h-full justify-center w-[115px] flex items-center"
                    >
                      <motion.div className="mt-5 w-full flex flex-col justify-center">
                        <Link
                          className="text-center"
                          href={pages.page.href}
                        >
                          {pages.page.pageTitle}
                        </Link>
                        <motion.div
                          variants={underLine}
                          transition={{ duration: 0.1 }}
                          className="h-[2px] rounded-full bg-accentCol mt-[18px]"
                        ></motion.div>
                      </motion.div>
                    </motion.div>
                  )
                )}
              </div>
            </AnimatePresence>
          </div>

          <button
            className="w-8 flex flex-col gap-2 justify-center items-center h-14 z-10 md:hidden"
            onClick={ToggleMenu}
          >
            <span className={`h-1 bg-accentCol w-full ${isOpen && "translate-y-[0.4rem] rotate-45"}  transition-all	`}></span>
            <span className={`h-1 bg-accentCol w-full ${isOpen && "hidden"}`}></span>
            <span className={`h-1 bg-accentCol w-full ${isOpen && "translate-y-[-0.35rem] -rotate-45 "}  transition-all	`}></span>
          </button>

          <Button
            className="hidden md:block my-1"
            link="/booking"
          >
            Book tid
          </Button>
        </div>
      </nav>
    </>
  );
};
