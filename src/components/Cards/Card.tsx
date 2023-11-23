import * as React from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { IoIosArrowForward, IoMdCheckmark } from 'react-icons/io';
import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import clsx from 'clsx';
import { forwardRef, useState } from 'react';

const cardVariants = cva('w-52 h-80 rounded bg-gradient-to-br', {
  variants: {
    variant: {
      level1: 'text-gray-300 from-white to-gray-600',
      level2: 'text-sky-200 from-sky-100 to-sky-300',
      level3: 'text-blue-500 from-sky-400 to-blue-700',
      expert: 'text-fuchsia-500 from-fuchsia-400 to-fuchsia-600',
      master: 'text-red-500 from-orange-500 to-red-600',
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
        <motion.div
          className="absolute w-screen h-screen top-0 left-0 bg-black"
          animate={isHovered ? { opacity: 0.7, zIndex: 20 } : { opacity: 0, zIndex: -1 }}
        ></motion.div>
        <motion.div
          whileHover={{
            scale: [null, 1.45, 1.4],
            backgroundImage: `linear-gradient(var(--rotate), var(--${variant}Gradient))`,
            animation: 'spin 1.7s linear infinite',
            zIndex: 50,
            boxShadow: `0px 0px 70px 20px var(--${variant}Shadow)`,
          }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          transition={{ duration: 0.25 }}
          ref={ref}
          className={cardClassName}
          {...props}
        >
          <motion.div
            initial="default"
            animate={isHovered ? 'hover' : 'default'}
            transition={{ duration: 0.1 }}
            variants={InnerBoxVariants}
            className="bg-primaryCol flex flex-col p-4 w-full h-72 rounded"
          >
            <h2 className={clsx(variant, 'text-center text-4xl')}>{header}</h2>
            <h3 className=" text-secondaryCol text-center text-3xl">{timeAntal} timer</h3>
            <div className="h-[1px] my-3 bg-secondaryCol rounded"></div>
            <div className="flex flex-col justify-between h-3/4">
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
                    {timeAntal && totalPris && Math.round(totalPris / timeAntal)}kr. pr. time
                  </p>
                </div>
                <div className="flex flex-row gap-3">
                  <IoMdCheckmark
                    className="text-green-400 shrink-0"
                    size="18"
                  />
                  <p className="max-w-[15ch] text-secondaryCol">
                    Svarer til {timeAntal ? Math.round((timeAntal * 60) / 34) : 3} spil CS eller{' '}
                    {timeAntal ? Math.round((timeAntal * 60) / 30) : 3} spil PubG
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-secondaryCol text-center text-4xl">{totalPris},-</h3>
                {!oprettelseInkl && (
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
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }
);

Card.displayName = 'Card';

export { Card, cardVariants };
