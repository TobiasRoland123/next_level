import { Button, ButtonProps } from "../../components/Button/Button";
import { cn } from "../../lib/utils";
import Image from "next/image";
import firmaEvent from "../../../public/images/event/firma-event.jpg";
import turnering from "../../../public/images/event/turnering.jpg";
import foedselsdag from "../../../public/images/event/foedselsdag.jpg";

interface eventBannerProps {
  heading: string;
  text: string;
  image?: "firmaEvent" | "turnering" | "foedselsdag";
  button?: ButtonProps;
  className?: string;
}

export const EventBanner = ({ heading, text, image, button, className }: eventBannerProps) => {
  const imageRender = () => {
    if (image === "firmaEvent") {
      return firmaEvent;
    } else if (image === "foedselsdag") {
      return foedselsdag;
    } else {
      return turnering;
    }
  };

  return (
    <>
      <article
        className={cn(
          "py-6 px-8 bg-contrastCol/70 backdrop-blur-md rounded-sm mt-14 md:mt-16 lg:mt-20 flex flex-col md:flex-row gap-12",
          className
        )}
      >
        <div>
          <h3 className="mt-0">{heading}</h3>
          <p>{text}</p>
          {button && (
            <Button
              className=" hidden md:block w-fit"
              {...button}
            >
              {button.children}
            </Button>
          )}
        </div>
        {image && (
          <div className="flex flex-col">
            {button && (
              <Button
                className="order-2 md:hidden"
                {...button}
              >
                {button.children}
              </Button>
            )}

            <Image
              src={imageRender()}
              width={500}
              height={500}
              alt="Event example"
              className=" order-1 md:order-3 w-full "
            />
          </div>
        )}
      </article>
    </>
  );
};
