import { ReactNode } from "react";
import { Footer } from "./modules/Footer/Footer";
import { Header } from "./modules/Header/Header";

interface layoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: layoutProps) => {
  return (
    <>
      <Header
        pageList={[
          { page: { href: "./spil", pageTitle: "Spil" } },
          { page: { href: "./priser", pageTitle: "Priser" } },
          {
            page: {
              href: "./events",
              pageTitle: "Events",
              subPages: [
                { href: "/events/foedselsdag", pageTitle: "Fødselsdag" },
                { href: "/events/turneringer", pageTitle: "Turneringer" },
                { href: "/events/firma-events", pageTitle: "Firma Events" },
              ],
            },
          },
          { page: { href: "/om-os", pageTitle: "Om os", subPages: [{ href: "/om-os/kontakt", pageTitle: "Kontakt os" }] } },
        ]}
      />
      {children}
      <Footer />
    </>
  );
};
