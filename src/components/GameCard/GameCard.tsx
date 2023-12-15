import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import Image from 'next/image';
import { cn } from '../../lib/utils';
import { forwardRef, useState } from 'react';
import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';

const gameCardVariants = cva(
  'max-w-[700px] lg:max-h-[200px] w-full h-full  rounded cursor-pointer grid',
  {
    variants: {
      variant: {
        card: 'text-gray-200 ',
      },
    },
    defaultVariants: {
      variant: 'card',
    },
  }
);

export interface GameCardProps
  extends Pick<HTMLMotionProps<'div'>, 'animate' | 'whileHover' | 'className' | 'onClick'>,
    VariantProps<typeof gameCardVariants> {
  Name?: string;
  Tags?: string[];
  Image_?: string;
  Console?: string[];
  Description?: string;
  IsAdmin?: boolean;
}

const GameCard = forwardRef<HTMLDivElement, GameCardProps>(
  ({ variant, className, Name, Tags, IsAdmin, Description, Console, Image_, ...props }, ref) => {
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
              <div className='flex w-full h-full col-start-1 row-start-1  rounded overflow-hidden'>
                <Image
                  src={`${Image_}`}
                  width={700}
                  height={300}
                  quality={20}
                  style={{ objectFit: 'cover' }}
                  alt='Picture of the author'
                  className={` transition-all ${isHovered ? 'scale-110' : 'scale-100'}`}
                />
              </div>
              <div className='col-start-1 row-start-1 flex flex-col w-full justify-between rounded p-2 bg-gradient-to-t from-primaryCol to-transparent z-10'>
                <div className='flex gap-2 justify-end'>
                  {Console &&
                    Console.map(console => (
                      <div className='bg-secondary w-fit h-min px-2 rounded-full flex'>
                        <p className='text-primaryCol mt-0'>{console}</p>
                      </div>
                    ))}
                </div>
                <div className='flex flex-col justify-end'>
                  <div className='flex flex-row gap-2'>
                    {Tags &&
                      Tags.map(tag => (
                        <div className='bg-primaryCol w-fit h-min px-2 rounded-full flex self-center uppercase'>
                          <small className='mt-0'>{tag}</small>
                        </div>
                      ))}
                  </div>
                  <div className='w-full h-full'>
                    <h4 className='mt-0 md:truncate md:max-w-[15ch]'>{Name}</h4>
                    <motion.div
                      initial='default'
                      animate={isHovered ? { width: '100%' } : { width: '0%' }}
                      transition={{ duration: 0.1 }}
                      className='h-[2px] rounded bg-accentCol'
                    ></motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </DialogTrigger>

          {!IsAdmin && (
            <DialogContent className='w-5/6 grid min-h-fit lg:max-h-[600px] overflow-y-scroll max-w-[800px] p-0'>
              <div className='h-[160px] col-start-1 row-start-1 rounded-t'>
                <Image
                  src={`${Image_}`}
                  width={800}
                  height={400}
                  style={{ objectFit: 'cover', objectPosition: '50% 20%' }}
                  alt=''
                  className='h-full rounded'
                />
              </div>
              <div className='col-start-1 row-start-1 row-end-2 h-full flex flex-col justify-between  p-2 bg-gradient-to-t from-primaryCol to-transparent to-80% % z-10'></div>

              <div className='px-4 flex flex-col gap-3'>
                <div className='flex items-center gap-2 flex-wrap justify-between'>
                  <div>
                    <h3 className='mt-0 '>{Name}</h3>
                    <div className='w-1/3 h-[2px]  bg-accentCol rounded'></div>
                  </div>
                  <div className='flex gap-3'>
                    {Console &&
                      Console.map(console => (
                        <div className='bg-secondary w-fit h-min px-2 rounded-full flex'>
                          <p className='text-primaryCol mt-0'>
                            {console.replace('PlayStation ', 'PS')}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
                <p
                  dangerouslySetInnerHTML={{
                    __html: (((Description as string)?.split('Español')[0] || '') + '</p>').replace(
                      /\n/g,
                      '<br />'
                    ),
                  }}
                />
              </div>

              <div className='p-4 flex items-end h-full'>
                <p className='mt-0 uppercase'>
                  Tags: <span className='text-accentCol'>{Tags?.join(', ')}</span>
                </p>
              </div>
            </DialogContent>
          )}
        </Dialog>
      </AnimatePresence>
    );
  }
);
GameCard.displayName = 'GameCard';

export { GameCard, gameCardVariants };
