import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/nav-dropdown-menu";
import { useEffect, useState } from "react";

interface NavLinkDropDownProp {
  ItemList?: Array<{ href: string; pageTitle: string }>;
  title?: string;
  href?: string;
}

export const NavLinkDropDown = ({ ItemList, href, title }: NavLinkDropDownProp) => {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    console.log(isHovered);
  }, [isHovered]);

  return (
    <>
      <DropdownMenu open={isHovered}>
        <DropdownMenuTrigger
          onMouseEnter={() => {
            setIsHovered(true);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
          }}
          className=""
        >
          <a href={href}>{title}</a>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          onMouseEnter={() => {
            setIsHovered(true);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
          }}
          className="border-0 border-t-accentCol border-t-2 bg-contrastCol"
        >
          {ItemList?.map((item) => (
            <DropdownMenuItem
              key={item.href}
              className="flex justify-center font-bold"
            >
              <a href={item.href}>{item.pageTitle}</a>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
