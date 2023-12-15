import Image from 'next/image';
import FirmaImg from '../../../public/images/event/firma-event.jpg';
import FoedselsdagImg from '../../../public/images/event/foedselsdag/barn-vr.jpeg';
import TurneringImg from '../../../public/images/event/turnering.jpg';
import { Button, ButtonProps } from '../Button/Button';

interface EventCardProps {
  header: string;
  image: 'foedselsdag' | 'firma' | 'turnering';
  content: string;
  buttonProps?: ButtonProps;
}

export const EventCard = ({ header, image, content, buttonProps }: EventCardProps) => {
  const setImage = () => {
    if (image === 'firma') {
      return FirmaImg;
    } else if (image === 'foedselsdag') {
      return FoedselsdagImg;
    } else {
      return TurneringImg;
    }
  };

  return (
    <>
      <div
        className='bg-contrastCol/70 backdrop:blur-md rounded-sm pb-4 max-w-[350px]'
        style={{ display: 'grid', gridTemplateRows: 'auto 0.5fr 1fr 0.3fr' }}
      >
        {image && (
          <div className='h-[200px] overflow-hidden '>
            <Image
              src={setImage()}
              fill={false}
              alt='event billede'
            />
          </div>
        )}

        <h3 className='mt-3 hyphens-auto px-3'>{header}</h3>

        <p className='px-3'>{content}</p>

        {buttonProps && (
          <Button
            className='w-fit mx-3'
            {...buttonProps}
          />
        )}
      </div>
    </>
  );
};
