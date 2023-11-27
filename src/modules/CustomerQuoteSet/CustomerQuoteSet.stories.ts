import type { Meta, StoryObj } from "@storybook/react";

import { CustomerQuoteSet } from "./CustomerQuoteSet";
const meta = {
  title: "Modules/CustomerQuoteSet",
  component: CustomerQuoteSet,
  parameters: { layout: "centered" },

  tags: ["autodocs"],
} satisfies Meta<typeof CustomerQuoteSet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    header: "Vores kunder siger",
    redWord: "kunder",
    customerQuotes: [
      {
        quote: {
          header: "Whlla Luksus Toast",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibuwlum tempor dictum fringilla. Mauris volutpat dictum lectus venenatis suscipit. Aenean faucibus molestie dictum. Nulla mollis",
          author: "Boris Brix",
        },
      },
      {
        quote: {
          header: "Whlla Luksus Toast",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibuwlum tempor dictum fringilla. Mauris volutpat dictum lectus venenatis suscipit. Aenean faucibus molestie dictum. Nulla mollis",
          author: "Boris Brix",
        },
      },
      {
        quote: {
          header: "Whlla Luksus Toast",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibuwlum tempor dictum fringilla. Mauris volutpat dictum lectus venenatis suscipit. Aenean faucibus molestie dictum. Nulla mollis",
          author: "Boris Brix",
        },
      },
    ],
  },
};
