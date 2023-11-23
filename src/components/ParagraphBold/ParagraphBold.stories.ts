import type { Meta, StoryObj } from "@storybook/react";

import { ParagraphBold } from "./ParagraphBold";
const meta = {
  title: "ParagraphBold",
  component: ParagraphBold,
  parameters: { layout: "centered" },

  tags: ["autodocs"],
} satisfies Meta<typeof ParagraphBold>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { text: "Im a bold praragraph with underline", underlined: true },
};
