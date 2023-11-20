import type { Meta, StoryObj } from "@storybook/react";

import { List } from "./List";
const meta = {
  title: "List",
  component: List,
  parameters: { layout: "centered" },

  tags: ["autodocs"],
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { item: "I am a list item for story" },
};
