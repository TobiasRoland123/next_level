import Image from "next/image";
import FirmaImg from "../../../public/images/event/firma-event.jpg";
import FoedselsdagImg from "../../../public/images/event/foedselsdag/barn-vr.jpeg";
import TurneringImg from "../../../public/images/event/turnering.jpg";
import { Button, ButtonProps } from "../Button/Button";

interface EventCardProps {
  header: string;
  image: "foedselsdag" | "firma" | "turnering";
  content: string;
  buttonProps?: ButtonProps;
}

export const EventCard = ({ header, image, content, buttonProps }: EventCardProps) => {
  const setImage = () => {
    if (image === "firma") {
      return FirmaImg;
    } else if (image === "foedselsdag") {
      return FoedselsdagImg;
    } else {
      return TurneringImg;
    }
  };

  return (
    <>
      <div className="bg-contrastCol/70 backdrop:blur-md rounded-sm pb-4 overflow-hidden max-w-[350px] grid">
        {image && (
          <div className=" aspect-video overflow-hidden">
            <Image
              src={setImage()}
              width={1000}
              height={1000}
              alt="event billede"
            />
          </div>
        )}
        <div className="px-4 flex flex-col justify-between ">
          <div>
            <h3 className="mt-3 hyphens-auto">{header}</h3>
            <p>{content}</p>
          </div>

          {buttonProps && (
            <Button
              className="w-fit"
              {...buttonProps}
            />
          )}
        </div>
      </div>
    </>
  );
};
