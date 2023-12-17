import type { Meta, StoryObj } from '@storybook/react';

import { ContactForm } from './ContactForm';
const meta = {
  title: 'Modules/ContactForm',
  component: ContactForm,
  parameters: { layout: 'centered' },

  tags: ['autodocs'],
} satisfies Meta<typeof ContactForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    selectedValue: 'fødselsdag', // provide a default selected value
    onSelectChange: (selectValue: string) => {
      //console.log("Selected value:", selectValue);
    },
  },
};
