import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/nav-dropdown-menu";
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

  // TODO: find better solution for how to make dropdown apear, so it doesn't flicker

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
          className="border-0 border-t-accentCol border-t-2 bg-contrastCol flex flex-col gap-2"
        >
          {ItemList?.map((item) => (
            <DropdownMenuItem
              key={item.href}
              className="flex justify-center font-bold border-2 border-transparent hover:border-b-accentCol"
            >
              <a href={item.href}>{item.pageTitle}</a>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
