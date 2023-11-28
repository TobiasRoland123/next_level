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
  args: {
    Name: 'Counter-Strike 2',
    Console: ['PC'],
    Tags: ['FPS', 'COMPETITIVE', 'SHOOTER'],
    Image_: 'https://media.rawg.io/media/games/ec4/ec4b02bdb3eb5c6212992c19bc05697e.jpg',
  },
};
