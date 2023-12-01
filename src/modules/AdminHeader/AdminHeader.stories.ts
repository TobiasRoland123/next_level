import type { Meta, StoryObj } from "@storybook/react";

import { AdminHeader } from "./AdminHeader";
const meta = {
  title: "Modules/AdminHeader",
  component: AdminHeader,
  parameters: { layout: "centered" },

  tags: ["autodocs"],
} satisfies Meta<typeof AdminHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    pageList: [{ page: { href: "./admin/spil", pageTitle: "Spil" } }, { page: { href: "./admin/booking", pageTitle: "Booking" } }],
  },
};
