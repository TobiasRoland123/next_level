import type { Meta, StoryObj } from "@storybook/react";

import { EventBanner } from "./EventBanner";
const meta = {
  title: "Modules/EventBanner",
  component: EventBanner,
  parameters: { layout: "centered" },

  tags: ["autodocs"],
} satisfies Meta<typeof EventBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    heading: "Vores Events",
    text: "Korem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus.",
    button: { children: "Mere om events", variant: "secondary" },
  },
};

export const WithImage: Story = {
  args: {
    heading: "Vores Events",
    text: "Korem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus.",
    button: { children: "Mere om events", variant: "secondary" },
    image: "firmaEvent",
  },
};
