import type { Meta, StoryObj } from '@storybook/react';
import { GameCard } from './GameCard';

const meta = {
  title: 'GameCard',
  component: GameCard,
  parameters: { layout: 'centered' },

  tags: ['autodocs'],
} satisfies Meta<typeof GameCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { Name: 'Counter-Strike 2' },
};
