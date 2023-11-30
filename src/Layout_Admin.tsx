import { ReactNode } from "react";
import { Footer } from "./modules/Footer/Footer";
import { Header } from "./modules/Header/Header";

interface layoutProps {
  children: ReactNode;
}

export const LayoutAdmin = ({ children }: layoutProps) => {
  return (
    <>
      <Header pageList={[{ page: { href: "./admin/spil", pageTitle: "Spil" } }, { page: { href: "./admin/booking", pageTitle: "Priser" } }]} />
    </>
  );
};
