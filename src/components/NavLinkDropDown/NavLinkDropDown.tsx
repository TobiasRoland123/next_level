import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/nav-dropdown-menu';
import { useEffect, useState } from 'react';

interface NavLinkDropDownProp {
  ItemList?: Array<{ href: string; pageTitle: string }>;
  title?: string;
  href?: string;
}

export const NavLinkDropDown = ({ ItemList, href, title }: NavLinkDropDownProp) => {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // console.log(isHovered);
  }, [isHovered]);

  // TODO: find better solution for how to make dropdown apear, so it doesn't flicker

  return (
    <div
      className='flex justify-center items-center border-2 border-transparent text-center w-16 h-full '
      onMouseOver={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setTimeout(() => {
          setIsHovered(false);
        }, 100);
      }}
    >
      <DropdownMenu open={isHovered}>
        <DropdownMenuTrigger className='w-full h-full'>
          <a href={href}>{title}</a>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          sideOffset={-2}
          align='start'
          className='  border-0 border-t-accentCol border-t-2 bg-contrastCol flex flex-col gap-2 mt-5'
        >
          {ItemList?.map(item => (
            <DropdownMenuItem
              key={item.href}
              className='flex font-bold border-2 border-transparent hover:border-b-accentCol'
            >
              <a href={item.href}>{item.pageTitle}</a>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
