import type { Meta, StoryObj } from "@storybook/react";

import { Hero } from "./Hero";
const meta = {
  title: "Modules/Hero",
  component: Hero,
  parameters: { layout: "centered" },

  tags: ["autodocs"],
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Frontpage: Story = {
  args: {
    header: "Dk's bedste gaming center",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
    buttonProps: { children: "Tryk på mig" },
    redWord: ["bedste"],
    isFrontPage: true,
  },
};

export const OtherPages: Story = {
  args: {
    header: "Dk's bedste gaming center",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
    buttonProps: { children: "Book tid!" },
    redWord: ["bedste"],
    isFrontPage: false,
  },
};
