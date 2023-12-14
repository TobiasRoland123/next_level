import type { Meta, StoryObj } from "@storybook/react";

import { BookedTimeSlot } from "./BookedTimeSlot";

const meta = {
  title: "Booked Time Slot Component",
  component: BookedTimeSlot,
  parameters: { layout: "centered" },

  tags: ["autodocs"],
} satisfies Meta<typeof BookedTimeSlot>;

export default meta;
type Story = StoryObj<typeof meta>;

// export const Default: Story = {
//   args: {},
// };
