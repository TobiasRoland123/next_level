import * as React from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { IoMdCheckmark } from 'react-icons/io';

import { cn } from '../../lib/utils';
import clsx from 'clsx';

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

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  header?: string;
  timeAntal?: number;
  timePris?: number;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant, header, timeAntal, timePris, size, className, ...props }, ref) => {
    const cardClassName = cn(cardVariants({ variant, size, className }));
    const cardNamesStuff = cardVariants();

    console.log(cardNamesStuff);

    return (
      <div
        ref={ref}
        className={cardClassName}
        {...props}
      >
        <div className="bg-primaryCol w-full h-72 rounded">
          <h2 className={clsx(variant, 'text-center text-4xl')}>{header}</h2>
          <h3 className=" text-secondaryCol text-center text-3xl">{timeAntal} timer</h3>
          <div className="h-[1px] mx-5 my-3 bg-secondaryCol rounded"></div>
          <div className="flex flex-row gap-3 justify-center">
            <IoMdCheckmark
              className="text-green-400"
              size="18"
            />
            <p className=" text-center text-secondaryCol">{timePris}kr. pr. time</p>
          </div>
        </div>
      </div>
    );
  }
);

Card.displayName = 'Card';

export { Card, cardVariants };
