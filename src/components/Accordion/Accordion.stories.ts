import type { Meta, StoryObj } from "@storybook/react";

import { Accordions } from "./Accordion";
const meta = {
  title: "Accordions",
  component: Accordions,
  parameters: { layout: "centered" },

  tags: ["autodocs"],
} satisfies Meta<typeof Accordions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
export const Secondary: Story = {
  args: { variant: "secondary" },
};
