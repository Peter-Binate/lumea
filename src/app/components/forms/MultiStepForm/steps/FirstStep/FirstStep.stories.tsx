import { Meta, StoryObj } from '@storybook/react';
import FirstStep, { IFirstStep } from './FirstStep';
import { mockFirstStepProps } from './FirstStep.mocks';

export default {
  title: 'templates/FirstStep',
  component: FirstStep,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as Meta<typeof FirstStep>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
type Template = StoryObj<IFirstStep>;

export const Base: Template = (args: IFirstStep) => <FirstStep {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockFirstStepProps.base,
} as IFirstStep;
