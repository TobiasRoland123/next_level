import { ParagraphBold } from "../../components/ParagraphBold/ParagraphBold";
import { Button } from "../../components/Button/Button";
import Image from "next/image";

interface FooterProps {}

export const Footer = () => {
  return (
    <>




      <footer className=" bg-contrastCol  w-full mt-14 md:mt16 lg:mt-20  ">
        <div className="xl:mx-auto  mx-6 md:mx-12 lg:mx-20 flex flex-col  py-6 md:grid md:gap-10  md:grid-cols-[3fr,1fr] max-w-screen-xl ">
          <header className="flex justify-between md:justify-start  items-center gap-8 md:order-2 md:flex-col ">
            <a href="/" className="w-full text-secondaryCol max-w-xs ">
              <svg id="Layer_3" data-name="Layer 3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1454.18 762.99">
                <g id="N">
                  <rect x="55.61" y="294.41" width="67.8" height="180.96" fill="#f2f2f2" stroke-width="0" />
                  <polygon points="0 225.22 48.3 277.05 123.4 277.05 321.67 475.32 384.86 475.32 384.86 277.05 336.29 220.54 318.6 220.54 321.24 393.88 149.19 225.22 0 225.22" fill="#f2f2f2" stroke-width="0" />
                </g>
                <g id="E">
                  <polygon points="392.41 220.54 696.79 220.54 642.86 272.72 392.41 273.41 392.41 220.54" fill="#f2f2f2" stroke-width="0" />
                  <polygon points="405.91 296.54 405.91 475.32 629.4 475.32 583.47 423.07 469.4 422.87 469.97 363.39 544.6 363.39 598.86 309.13 469.78 309.13 469.97 296.54 405.91 296.54" fill="#f2f2f2" stroke-width="0" />
                </g>
                <g id="E-2" data-name="E">
                  <polygon points="589.66 508.21 282.6 508.21 337 559.99 589.66 560.68 589.66 508.21" fill="#f2f2f2" stroke-width="0" />
                  <polyline points="420.16 651.06 419.59 710.54 533.66 710.74 579.59 762.99 356.1 762.99 356.1 584.21 420.16 584.21 419.97 610.73 526.79 610.73 483.87 659.29 420.08 659.29" fill="#f2f2f2" stroke-width="0" />
                </g>
                <g id="X">
                  <path d="m1243.53,476.26l-215-1.47-82.3-123.85-95.52,123.59-216.97.63,205.5-235.5L633.99,0h216.83l95.93,131.16,89.95-121.56h220.89l-206.34,232.39,192.27,234.27Zm-206.39-17.41l172.36,1.17-179.28-218.44,191.77-215.98h-177.22l-98.09,132.56-103.97-142.16h-173.94l191.62,223.76-191.36,219.3,173.81-.5,104.38-135.04,89.93,135.35Z" fill="#f2f2f2" stroke-width="0" />
                  <polygon points="1171.86 470.02 981.87 241.8 984.51 238.6 1166.87 17.71 1174.58 24.07 994.86 241.77 1179.55 463.62 1171.86 470.02" fill="#f2f2f2" stroke-width="0" />
                  <polygon points="723.97 470.09 716.26 463.73 899.1 241.81 708.57 13.36 716.25 6.96 912.09 241.77 723.97 470.09" fill="#f2f2f2" stroke-width="0" />
                </g>
                <g id="T">
                  <rect x="1253.07" y="296.54" width="68.17" height="178.84" fill="#f2f2f2" stroke-width="0" />
                  <polygon points="1454.18 220.54 1122.44 220.54 1174.29 277.05 1404.41 277.05 1454.18 220.54" fill="#f2f2f2" stroke-width="0" />
                </g>
                <g id="L">
                  <polygon points="55.61 508.24 123.4 508.24 123.4 708.8 296.58 708.8 346.84 762.96 56.45 762.96 55.61 508.24" fill="#f2f2f2" stroke-width="0" />
                </g>
                <g id="V">
                  <polygon points="603.61 562.11 603.61 762.96 814.25 549.74 775.47 508.24 665.54 622.02 665.54 500.14 603.61 562.11" fill="#f2f2f2" stroke-width="0" />
                </g>
                <g id="E-3" data-name="E">
                  <polygon points="1085.7 508.21 863.78 508.24 824.25 549.74 838.93 562.11 1085.71 560.68 1085.7 508.21" fill="#f2f2f2" stroke-width="0" />
                  <polyline points="913.5 647.01 912.93 706.49 1027 706.69 1072.93 758.94 849.44 758.94 849.44 580.16 913.5 580.16 913.31 606.67 1021.08 605.6 978.69 655.15 913.42 655.24" fill="#f2f2f2" stroke-width="0" />
                </g>
                <g id="L_2" data-name="L^2">
                  <polyline points="1160.15 508.24 1095.71 560.68 1095.71 762.96 1382.58 762.96 1337.24 708.8 1160.15 708.8" fill="#f2f2f2" stroke-width="0" />
                </g>
                <g id="on_buttton" data-name="on buttton">
                  <rect x="1328.86" y="521.6" width="25.41" height="85.84" fill="#f2f2f2" stroke-width="0" />
                  <polygon points="1360.76 544.19 1415.54 597.27 1341.56 671.25 1341.56 648.09 1393.8 597.27 1360.76 562.11 1360.76 544.19" fill="#f2f2f2" stroke-width="0" />
                  <polygon points="1322.36 544.19 1267.59 597.27 1341.56 671.25 1341.56 648.09 1289.33 597.27 1322.36 562.11 1322.36 544.19" fill="#f2f2f2" stroke-width="0" />
                </g>
              </svg>
            </a>

            <Button className="md:items-center w-full">Book nu</Button>
          </header>
          <section className="md:order-1 md:flex md:gap-x-20 ">
            <div className="mt-12 md:mt-0">
              <ParagraphBold underlined text="Åbningstider" />
              <div className="mt-6">
                <p className="font-bold">Søndag - Torsdag</p>
                <p className="mt-2">14:00 til 03:00</p>
              </div>

              <div className="mt-6">
                <p className="font-bold">Fredag - Lørdag</p>
                <p className="mt-2">14:00 til 04:00</p>
              </div>
            </div>
            <div className="mt-12 md:mt-0">
              <ParagraphBold underlined text="Kontakt os" />
              <div className="mt-6">
                <p className="font-bold">Telefon</p>
                <a href="tel:50988887" className="underline">
                  50 98 88 87
                </a>
              </div>

              <div className="mt-6">
                <p className="font-bold">Email</p>
                <a href="mailto:info@nextlvl.dk" className="underline">
                  info@nextlvl.dk
                </a>
              </div>
              <div className="mt-6">
                <p className="font-bold">Adresse</p>
                <a href="https://maps.app.goo.gl/gTyHSkDryC8BR8TT9k" className="underline">
                  Hovedvejen 3A,
                  <br /> 2600 Glostrup
                </a>
              </div>
            </div>

            <div className="md:flex md:flex-col md:gap-8">
              <div className="mt-12 md:mt-0">
                <ParagraphBold underlined text="Events" />
                <div className="mt-6">
                  <p className="">
                    Læs mere om events{" "}
                    <a href="/events" className="text-accentCol">
                      her
                    </a>
                  </p>
                </div>
              </div>
              <div className="mt-12 md:mt-0">
                <ParagraphBold underlined text="Priser" />
                <div className="mt-6">
                  <p className="">




                    Se vores priser{" "}
                    <a
                      href="/priserl"
                      className=" text-accentCol"
                    >

                      her
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </footer>
    </>
  );
};
