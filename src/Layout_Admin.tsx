import { ReactNode } from "react";
import { Footer } from "./modules/Footer/Footer";
import { AdminHeader } from "./modules/AdminHeader/AdminHeader";

interface layoutProps {
  children: ReactNode;
}

export const LayoutAdmin = ({ children }: layoutProps) => {
  return (
    <>
      <AdminHeader pageList={[{ page: { href: "../admin/spil", pageTitle: "Administrer Spil" } }, { page: { href: "../admin/booking", pageTitle: "Bookinger" } }]} />
      {children}
    </>
  );
};
