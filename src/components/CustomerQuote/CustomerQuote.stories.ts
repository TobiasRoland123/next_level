import type { Meta, StoryObj } from "@storybook/react";

import { CustomerQuote } from "./CustomerQuote";
const meta = {
  title: "CustomerQuote",
  component: CustomerQuote,
  parameters: { layout: "centered" },

  tags: ["autodocs"],
} satisfies Meta<typeof CustomerQuote>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    header: "Whalla Luksus Toast",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibuwlum tempor dictum fringilla. Mauris volutpat dictum lectus venenatis suscipit. Aenean faucibus molestie dictum. Nulla mollis",

    author: "Boris Brix",
  },
};
