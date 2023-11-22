import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta = {
  title: 'Card',
  component: Card,
  parameters: { layout: 'centered' },

  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Level1: Story = {
  args: { header: 'header', timeAntal: 20, timePris: 12, totalPris: 100 },
};
export const Level2: Story = {
  args: { variant: 'level2', header: 'header', timeAntal: 20, timePris: 12 },
};
export const Level3: Story = {
  args: { variant: 'level3', header: 'header', timeAntal: 20, timePris: 12 },
};
export const Expert: Story = {
  args: { variant: 'expert', header: 'header', timeAntal: 20, timePris: 12 },
};
export const Master: Story = {
  args: { variant: 'master', header: 'header', timeAntal: 20, timePris: 12 },
};
