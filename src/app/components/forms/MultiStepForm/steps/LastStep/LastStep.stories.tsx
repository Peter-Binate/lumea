import { Meta, StoryObj } from '@storybook/react';
import LastStep, { ILastStepProps } from './LastStep';
import { mockLastStepProps } from './LastStep.mocks';

export default {
  title: 'templates/LastStep',
  component: LastStep,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as Meta<typeof LastStep>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
type Template = StoryObj<ILastStepProps>;

export const Base: Template = (args: ILastStepProps) => <LastStep {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockLastStepProps.base,
} as ILastStepProps;
