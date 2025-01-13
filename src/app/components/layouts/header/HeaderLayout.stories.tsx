import { Meta, StoryObj } from '@storybook/react';
import HeaderLayout, { IHeaderLayout } from './HeaderLayout';
import { mockHeaderLayoutProps } from './HeaderLayout.mocks';

export default {
  title: 'templates/HeaderLayout',
  component: HeaderLayout,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as Meta<typeof HeaderLayout>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
type Template = StoryObj<IHeaderLayout>;

export const Base: Template = (args: IHeaderLayout) => (
  <HeaderLayout {...args} />
);

// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockHeaderLayoutProps.base,
} as IHeaderLayout;
