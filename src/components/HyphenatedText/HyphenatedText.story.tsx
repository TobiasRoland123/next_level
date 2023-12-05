import * as React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { HyphenatedText } from "./HyphenatedText";

export default {
  component: HyphenatedText,
  render: (args) => (
    <div className="space-y-5">
      <div className="border py-3 px-2 text-20">
        <HyphenatedText {...args} />
      </div>
      <div className="max-w-[500px] border py-3 px-2 text-20">
        <HyphenatedText {...args} />
      </div>
      <div className="max-w-[250px] border py-3 px-2  text-20">
        <HyphenatedText {...args} />
      </div>
    </div>
  ),
} as Meta<typeof HyphenatedText>;

export const Default: StoryObj<typeof HyphenatedText> = {
  name: "HyphenatedText",
  args: { text: "speciallægepraksisplanlægningsstabilliseringsperiode" },
};
