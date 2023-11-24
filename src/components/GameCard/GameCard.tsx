import * as React from 'react';

import { cva, type VariantProps } from 'class-variance-authority';
import Image from 'next/image';
import { cn } from '../../lib/utils';
import { forwardRef } from 'react';
import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion';

const gameCardVariants = cva('w-80 h-52 rounded cursor-pointer grid', {
  variants: {
    variant: {
      card: 'text-gray-200',
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
  Image?: string;
}

const tagList = ['FPS', 'COMPETITIVE', 'SHOOTER'];

const GameCard = forwardRef<HTMLDivElement, GameCardProps>(
  ({ variant, className, Name, Tags, ...props }, ref) => {
    return (
      <AnimatePresence>
        <motion.div
          className={cn(gameCardVariants({ variant, className }))}
          ref={ref}
          {...props}
        >
          <Image
            src="https://cdn.akamai.steamstatic.com/steam/apps/730/capsule_616x353.jpg?t=1698860631"
            width={500}
            height={500}
            alt="Picture of the author"
            className="col-start-1 row-start-1 w-auto h-full rounded"
          />
          <div className="col-start-1 row-start-1 h-full flex justify-between rounded p-2 bg-gradient-to-t from-primaryCol to-transparent">
            <div className="flex flex-col justify-end">
              <div className="flex flex-row gap-2">
                {tagList.map(tag => (
                  <div className="bg-primaryCol w-fit h-min px-2 rounded-full flex self-center uppercase">
                    <small>{tag}</small>
                  </div>
                ))}
              </div>
              <h4 className="">{Name}</h4>
            </div>
            <div className="bg-secondary w-fit h-min px-2 rounded-full flex">
              <p className="text-primaryCol">PC</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }
);
GameCard.displayName = 'GameCard';

export { GameCard, gameCardVariants };
