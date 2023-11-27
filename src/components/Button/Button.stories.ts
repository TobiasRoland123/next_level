import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";
const meta = {
  title: "Button",
  component: Button,
  parameters: { layout: "centered" },

  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: "Primary" },
};
export const PrimaryWithLink: Story = {
  args: { link: "https:www.youtube.com", children: "Im actually a link, try and click me" },
};
export const Secondary: Story = {
  args: { variant: "secondary", children: "Secondary" },
};
