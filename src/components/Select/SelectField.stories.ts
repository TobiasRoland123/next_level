import type { Meta, StoryObj } from '@storybook/react';

import { SelectField } from './SelectField';
const meta = {
  title: 'Select',
  component: SelectField,
  parameters: { layout: 'centered' },

  tags: ['autodocs'],
} satisfies Meta<typeof SelectField>;

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
