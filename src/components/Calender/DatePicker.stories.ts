import type { Meta, StoryObj } from "@storybook/react";

import { DatePicker } from "./DatePicker";
const meta = {
  title: "DatePicker",
  component: DatePicker,
  parameters: { layout: "centered" },

  tags: ["autodocs"],
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
export const Secondary: Story = {
  args: { variant: "secondary" },
};
