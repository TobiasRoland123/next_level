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
  args: { header: 'Level 1', timeAntal: 5, totalPris: 70 },
};
export const Level2: Story = {
  args: { variant: 'level2', header: 'Level 2', timeAntal: 10, totalPris: 120 },
};
export const Level3: Story = {
  args: {
    variant: 'level3',
    header: 'Level 3',
    timeAntal: 15,
    totalPris: 150,
    oprettelseInkl: true,
  },
};
export const Expert: Story = {
  args: {
    variant: 'expert',
    header: 'Expert',
    timeAntal: 50,
    totalPris: 450,
    oprettelseInkl: true,
  },
};
export const Master: Story = {
  args: {
    variant: 'master',
    header: 'Master',
    timeAntal: 100,
    totalPris: 700,
    oprettelseInkl: true,
  },
};
export const NLP: Story = {
  args: {
    variant: 'nlp',
    header: 'Nlp',
    timePris: 30,
    oprettelseInkl: true,
  },
};
