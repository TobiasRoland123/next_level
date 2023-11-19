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
  args: { type: "primary", size: "sm", label: "Default" },
};
export const Secondary: Story = {
  args: { type: "secondary", size: "md", label: "Secondary" },
};
