import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "./Inputfield";

const meta = {
  title: "Inputfield",
  component: Input,
  parameters: { layout: "centered" },

  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { labelText: "Storybook", placeholder: "" },
};
