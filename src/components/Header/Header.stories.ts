import type { Meta, StoryObj } from "@storybook/react";

import { Header } from "./Header";
const meta = {
  title: "Header",
  component: Header,
  parameters: { layout: "centered" },

  tags: ["autodocs"],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    pageList: [
      { page: { href: "./spil", pageTitle: "Spil" } },
      { page: { href: "./priser", pageTitle: "Priser" } },
      {
        page: {
          href: "./events",
          pageTitle: "Events",
          subPages: [
            { href: "/foedselsdag", pageTitle: "Fødselsdag" },
            { href: "/turneringer", pageTitle: "Turneringer" },
            { href: "/firma-events", pageTitle: "Firma Events" },
          ],
        },
      },
      { page: { href: "/om-os", pageTitle: "Om os", subPages: [{ href: "/kontakt", pageTitle: "Kontakt os" }] } },
    ],
  },
};
