import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from '../src/components/checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Checkbox.Root>
      <Checkbox.Indicator />
    </Checkbox.Root>
  ),
};

export const Checked: Story = {
  render: () => (
    <Checkbox.Root defaultChecked>
      <Checkbox.Indicator />
    </Checkbox.Root>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Checkbox.Root disabled>
      <Checkbox.Indicator />
    </Checkbox.Root>
  ),
};

export const DisabledChecked: Story = {
  render: () => (
    <Checkbox.Root disabled defaultChecked>
      <Checkbox.Indicator />
    </Checkbox.Root>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <label className="flex items-center gap-2 text-sm">
      <Checkbox.Root>
        <Checkbox.Indicator />
      </Checkbox.Root>
      Accept terms and conditions
    </label>
  ),
};
