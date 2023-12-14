import type { Meta, StoryObj } from '@storybook/react';

import { AvailibleTimeSlot } from './AvailibleTimeSlot';

const meta = {
  title: 'Availible Time Slot Component',
  component: AvailibleTimeSlot,
  parameters: { layout: 'centered' },

  tags: ['autodocs'],
} satisfies Meta<typeof AvailibleTimeSlot>;

export default meta;
type Story = StoryObj<typeof meta>;

// export const Default: Story = {
//   args: {},
// };
