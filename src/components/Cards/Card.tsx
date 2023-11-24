import * as React from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { IoIosArrowForward, IoMdCheckmark } from 'react-icons/io';
import { HiCpuChip } from 'react-icons/hi2';
import { BsGpuCard } from 'react-icons/bs';
import { FaMemory } from 'react-icons/fa';
import Tilt from 'react-parallax-tilt';

import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import clsx from 'clsx';
import { forwardRef, useState } from 'react';

const cardVariants = cva('w-52 h-80 rounded bg-gradient-to-br cursor-pointer', {
  variants: {
    variant: {
      level1: 'text-gray-300 from-white to-gray-600',
      level2: 'text-sky-200 from-sky-100 to-sky-300',
      level3: 'text-blue-500 from-sky-400 to-blue-700',
      expert: 'text-fuchsia-500 from-fuchsia-400 to-fuchsia-600',
      master: 'text-red-500 from-orange-500 to-red-600',
      nlp: 'text-amber-500 w-[938px] h-[507px] from-yellow-400 to-amber-600',
      bday1: 'text-red-500 w-[343px] h-[460px] from-orange-500 to-red-600',
      bday2: 'text-red-500 w-[343px] h-[460px] from-orange-500 to-red-600',
    },
    size: {
      default: 'px-1 py-1',
    },
  },
  defaultVariants: {
    variant: 'level1',
    size: 'default',
  },
});

const InnerBoxVariants = {
  default: { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' },
  hover: {
    clipPath: [
      'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
      ' polygon(0 0, 100% 0, 100% 94%, 0% 100%)',
    ],
  },
};

const InnerBoxVariantNlp = {
  default: { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' },
  hover: {
    clipPath: [
      'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
      ' polygon(0 0, 100% 0, 100% 94%, 0% 100%)',
    ],
  },
};

export interface CardProps
  extends Pick<HTMLMotionProps<'div'>, 'animate' | 'whileHover' | 'className'>,
    VariantProps<typeof cardVariants> {
  header?: string;
  timeAntal?: number;
  timePris?: number;
  totalPris?: number;
  oprettelseInkl?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    { variant, header, timeAntal, timePris, totalPris, oprettelseInkl, size, className, ...props },
    ref
  ) => {
    const cardClassName = cn(cardVariants({ variant, size, className }));
    const cardNamesStuff = cardVariants();
    const [isHovered, setIsHovered] = useState(false);

    console.log(cardNamesStuff);

    return (
      <AnimatePresence>
        <Tilt
          tiltEnable={variant !== 'nlp'}
          tiltMaxAngleX={5}
          tiltMaxAngleY={5}
          className="z-50"
        >
          <motion.div
            whileHover={
              variant !== 'nlp'
                ? {
                    scale: [null, 1.45, 1.3],
                    backgroundImage: `linear-gradient(var(--rotate), var(--${variant}Gradient))`,
                    animation: 'spin 1.7s linear infinite',
                    zIndex: 50,
                    boxShadow: `0px 0px 70px 30px var(--${variant}Shadow)`,
                  }
                : {
                    scale: [null, 1.08, 1.05],
                    backgroundImage: `linear-gradient(var(--rotate), var(--${variant}Gradient))`,
                    animation: 'spin 2.7s linear infinite',
                    zIndex: 50,
                    boxShadow: `0px 0px 70px 30px var(--${variant}Shadow)`,
                  }
            }
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            transition={{ duration: 0.25 }}
            ref={ref}
            className={cardClassName}
            {...props}
          >
            {variant !== 'nlp' ? (
              <>
                <motion.div
                  initial="default"
                  animate={isHovered ? 'hover' : 'default'}
                  transition={{ duration: 0.1 }}
                  variants={InnerBoxVariants}
                  className={`bg-primaryCol flex flex-col p-4 w-full ${
                    variant === 'bday1' || variant === 'bday2' ? 'h-[424px]' : 'h-72'
                  } rounded`}
                >
                  <h2 className={clsx(variant, 'text-center text-4xl')}>{header}</h2>
                  {variant === 'bday1' || variant === 'bday2' ? (
                    <>
                      <h3 className=" text-secondaryCol text-center text-3xl">
                        {variant === 'bday1' ? 'Standard' : 'Nlp'} pakke
                      </h3>
                      <p className=" text-center text-secondaryCol uppercase">
                        {variant === 'bday1' ? '(min. 8 personer)' : '(MAX. 10 personer)'}
                      </p>
                    </>
                  ) : (
                    <h3 className=" text-secondaryCol text-center text-3xl">{timeAntal} timer</h3>
                  )}

                  <div className="h-[1px] my-3 bg-secondaryCol rounded"></div>
                  <div className="flex flex-col justify-between h-3/4">
                    {variant === 'bday1' || variant === 'bday2' ? (
                      <div className="flex flex-col gap-4 p-5">
                        <div className="flex flex-row gap-3">
                          <IoMdCheckmark
                            className="text-green-400 shrink-0"
                            size="18"
                          />
                          <p className=" text-secondaryCol">
                            3 timers gaming{' '}
                            {variant === 'bday2' && '- I vores VIP rum med kraftigere computere'}
                          </p>
                        </div>

                        <div className="flex flex-row gap-3">
                          <IoMdCheckmark
                            className="text-green-400 shrink-0"
                            size="18"
                          />
                          <p className="text-secondaryCol">
                            Toast menu{' '}
                            {variant === 'bday2' && (
                              <span className="italic font-light">- Inklusiv Dåsesodavand</span>
                            )}
                          </p>
                        </div>
                        <div className="flex flex-row gap-3">
                          <IoMdCheckmark
                            className="text-green-400 shrink-0"
                            size="18"
                          />
                          <p className=" text-secondaryCol">
                            En slikpose og en ekstra dåsesodavand.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2">
                        {oprettelseInkl && (
                          <div className="flex flex-row gap-3">
                            <IoMdCheckmark
                              className="text-green-400 shrink-0"
                              size="18"
                            />
                            <p className=" text-center text-secondaryCol">Inkl. oprettelse</p>
                          </div>
                        )}
                        <div className="flex flex-row gap-3">
                          <IoMdCheckmark
                            className="text-green-400 shrink-0"
                            size="18"
                          />
                          <p className=" text-center text-secondaryCol">
                            {timeAntal && totalPris && Math.round(totalPris / timeAntal)}kr. pr.
                            time{' '}
                          </p>
                        </div>
                        <div className="flex flex-row gap-3">
                          <IoMdCheckmark
                            className="text-green-400 shrink-0"
                            size="18"
                          />
                          <p className="max-w-[15ch] text-secondaryCol">
                            Svarer til {timeAntal ? Math.round((timeAntal * 60) / 34) : 3} spil CS
                            eller {timeAntal ? Math.round((timeAntal * 60) / 30) : 3} spil PubG
                          </p>
                        </div>
                      </div>
                    )}

                    <div>
                      {variant === 'bday1' || variant === 'bday2' ? (
                        <h3 className="text-secondaryCol text-center text-4xl">
                          {totalPris},- pr. pers.
                        </h3>
                      ) : (
                        <h3 className="text-secondaryCol text-center text-4xl">{totalPris},-</h3>
                      )}

                      {!oprettelseInkl && variant !== 'bday1' && variant !== 'bday2' && (
                        <p className="text-secondaryCol text-center">(+35 kr i oprettelse)</p>
                      )}
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.1 }}
                  className="flex justify-end -mt-1"
                >
                  <p className="text-secondaryCol uppercase font-bold">Book nu</p>
                  <IoIosArrowForward
                    className="self-center"
                    size="16"
                  />
                </motion.div>{' '}
              </>
            ) : (
              <>
                <motion.div
                  initial="default"
                  animate={isHovered ? 'hover' : 'default'}
                  transition={{ duration: 0.1 }}
                  variants={InnerBoxVariantNlp}
                  className="bg-primaryCol flex justify-between p-7 w-full h-[495px] rounded"
                >
                  <div className="flex flex-col">
                    <h2 className={clsx(variant, 'text-4xl')}>{header}</h2>
                    <h4 className="text-secondaryCol">
                      Per time - <span className="text-amber-500">{timePris}kr.</span>
                    </h4>
                    <p className="text-secondaryCol max-w-prose mt-6">
                      Som frugten af flere års hårdt slid, har vi nu skabt hvad vi mener er de
                      bedste omgivelser til netop dette, i vores nye Next Level Pro Room(NLP). Her
                      kan du sidde privat med dit hold og fordybe dig i dit spil uden at blive
                      forstyrret. Vi har ladet os inspirere af de professionelle gamere til at
                      udruste vores NLP-Room med 10 kraftfulde pcer fra Shark Gaming <br />
                      <br /> Hvis du eller din virksomhed har brug for et sted hvor i kan træne til
                      at spille i E-sport ligaen er dette rum det perfekte sted for jer. Ring eller
                      skriv til vores mail hvis i er interesseret i et samarbejde.
                    </p>
                  </div>

                  <div className="flex flex-col gap-8 h-full items-center">
                    <div className="bg-red-500 min-w-[420px] h-[250px] mx-10 "></div>
                    <h4>specs</h4>
                    <div className="flex justify-center flex-wrap gap-5">
                      <div className="flex gap-3">
                        <HiCpuChip
                          className="flex-shrink-0"
                          size={20}
                        />
                        <p className="text-secondaryCol">i9-14900KF</p>
                      </div>
                      <div className="flex gap-3">
                        <BsGpuCard
                          className="flex-shrink-0"
                          size={20}
                        />
                        <p className="text-secondaryCol">RTX 4080</p>
                      </div>
                      <div className="flex gap-3">
                        <FaMemory
                          className="flex-shrink-0"
                          size={20}
                        />
                        <p className="text-secondaryCol"> 64GB DDR5 RAM</p>
                      </div>
                      <div className="flex gap-3">
                        <HiCpuChip
                          className="flex-shrink-0"
                          size={20}
                        />
                        <p className="text-secondaryCol">Intel Core i9-14900KF Tray</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.1 }}
                  className="flex justify-end -mt-5"
                >
                  <p className="text-secondaryCol uppercase font-bold">Book nu</p>
                  <IoIosArrowForward
                    className="self-center"
                    size="16"
                  />
                </motion.div>{' '}
              </>
            )}
          </motion.div>
        </Tilt>
      </AnimatePresence>
    );
  }
);

Card.displayName = 'Card';

export { Card, cardVariants };
