import type { Meta, StoryObj } from "@storybook/react";

import { InfoBox } from "./InfoBox";

const meta = {
  title: "InfoBox",
  component: InfoBox,
  parameters: { layout: "centered" },

  tags: ["autodocs"],
} satisfies Meta<typeof InfoBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
