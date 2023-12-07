import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 font-bold uppercase mt-8",

  {
    variants: {
      variant: {
        default: " bg-accentCol text-primary-foreground hover:bg-primaryCol/90 border-2 border-primary",
        secondary:
          "bg-contrastCol text-secondaryCol border-2 border-contrastCol hover:bg-transparent border-2 hover:border-primary",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps extends VariantProps<typeof buttonVariants> {
  link?: string;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

const Button = ({ className, variant, size, link, children, ...props }: ButtonProps) => {
  const Comp = link ? "a" : "button";

  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      href={link}
      {...props}
    >
      {children}
    </Comp>
  );
};

Button.displayName = "Button";

export { Button, buttonVariants };
