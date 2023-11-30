import type { Meta, StoryObj } from "@storybook/react";

import { LoginModule } from "./LoginModule";
const meta = {
  title: "Modules/Login",
  component: LoginModule,
  parameters: { layout: "centered" },

  tags: ["autodocs"],
} satisfies Meta<typeof LoginModule>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FormProps: Story = {
  args: {},
};
