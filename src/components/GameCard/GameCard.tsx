import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import Image from 'next/image';
import { cn } from '../../lib/utils';
import { forwardRef, useState } from 'react';
import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion';
import { Dialog, DialogContent, DialogTrigger, DialogClose } from '../ui/dialog';

const gameCardVariants = cva('w-80 h-52 rounded cursor-pointer grid', {
  variants: {
    variant: {
      card: 'text-gray-200 overflow-hidden',
    },
  },
  defaultVariants: {
    variant: 'card',
  },
});

export interface GameCardProps
  extends Pick<HTMLMotionProps<'div'>, 'animate' | 'whileHover' | 'className'>,
    VariantProps<typeof gameCardVariants> {
  Name?: string;
  Tags?: string[];
  Image_?: string;
  Console?: string[];
}

const GameCard = forwardRef<HTMLDivElement, GameCardProps>(
  ({ variant, className, Name, Tags, Console, Image_, ...props }, ref) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <AnimatePresence>
        <Dialog>
          <DialogTrigger asChild>
            <motion.div
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
              className={cn(gameCardVariants({ variant, className }))}
              ref={ref}
              {...props}
            >
              <Image
                src={`${Image_}`}
                width={500}
                height={500}
                quality={20}
                style={{ objectFit: 'fill' }}
                alt="Picture of the author"
                className={`col-start-1 row-start-1 w-auto h-full rounded transition-all ${
                  isHovered ? 'scale-110' : 'scale-100'
                }`}
              />
              <div className="col-start-1 row-start-1 h-full flex flex-col justify-between rounded p-2 bg-gradient-to-t from-primaryCol to-transparent z-10">
                <div className="flex gap-2 justify-end">
                  {Console &&
                    Console.map(console => (
                      <div className="bg-secondary w-fit h-min px-2 rounded-full flex">
                        <p className="text-primaryCol">{console}</p>
                      </div>
                    ))}
                </div>
                <div className="flex flex-col justify-end">
                  <div className="flex flex-row gap-2">
                    {Tags &&
                      Tags.map(tag => (
                        <div className="bg-primaryCol w-fit h-min px-2 rounded-full flex self-center uppercase">
                          <small>{tag}</small>
                        </div>
                      ))}
                  </div>
                  <div className="w-fit">
                    <h4 className="">{Name}</h4>
                    <motion.div
                      initial="default"
                      animate={isHovered ? { width: '100%' } : { width: '0%' }}
                      transition={{ duration: 0.1 }}
                      className="h-[2px] w-full rounded bg-accentCol"
                    ></motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </DialogTrigger>
          <DialogContent className="w-5/6 grid max-w-[800px] p-0">
            <div className="h-[160px] col-start-1 row-start-1 rounded-t">
              <Image
                src={`${Image_}`}
                width={800}
                height={400}
                style={{ objectFit: 'cover', objectPosition: '50% 20%' }}
                alt=""
                className="h-full rounded"
              />
            </div>
            <div className="col-start-1 row-start-1 row-end-2 h-full flex flex-col justify-between  p-2 bg-gradient-to-t from-primaryCol to-transparent to-80% z-10"></div>

            <div className="px-4 flex flex-col gap-3">
              <div className="flex items-center gap-2 flex-wrap justify-between">
                <div>
                  <h3>{Name}</h3>
                  <div className="w-1/3 h-[2px]  bg-accentCol rounded"></div>
                </div>
                <div className="flex gap-3">
                  {Console &&
                    Console.map(console => (
                      <div className="bg-secondary w-fit h-min px-2 rounded-full flex">
                        <p className="text-primaryCol">{console}</p>
                      </div>
                    ))}
                </div>
              </div>
              <p>
                For over two decades, Counter-Strike has offered an elite competitive experience,
                one shaped by millions of players from across the globe. And now the next chapter in
                the CS story is about to begin. This is Counter-Strike 2. <br /> <br /> A free
                upgrade to CS:GO, Counter-Strike 2 marks the largest technical leap in
                Counter-Strike’s history. Built on the Source 2 engine, Counter-Strike 2 is
                modernized with realistic physically-based rendering, state of the art networking,
                and upgraded Community Workshop tools.
              </p>
            </div>

            <div className="p-4 flex items-end h-full">
              <p>
                Tags: <span className="text-accentCol">{Tags?.join(', ')}</span>
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </AnimatePresence>
    );
  }
);
GameCard.displayName = 'GameCard';

export { GameCard, gameCardVariants };
