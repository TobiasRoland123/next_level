import type { Meta, StoryObj } from "@storybook/react";

import { Button2 } from "./Button2";
const meta = {
  title: "Button2",
  component: Button2,
  parameters: { layout: "centered" },

  tags: ["autodocs"],
} satisfies Meta<typeof Button2>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: "test button 2" },
};

export const Secondary: Story = {
  args: { label: "test secondary" },
};
