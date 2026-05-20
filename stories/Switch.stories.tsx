import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch } from '../src/components/switch';

const meta = {
  title: 'Components/Switch',
  component: Switch.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: 20 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Switch.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Switch.Root defaultChecked={false}>
      <Switch.Thumb />
    </Switch.Root>
  ),
};

export const Checked: Story = {
  render: () => (
    <Switch.Root defaultChecked>
      <Switch.Thumb />
    </Switch.Root>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <label className="flex items-center gap-2 text-sm font-medium text-foreground cursor-pointer">
      <Switch.Root defaultChecked>
        <Switch.Thumb />
      </Switch.Root>
      Connected
    </label>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <label className="flex items-center gap-2 text-sm font-medium text-foreground cursor-pointer">
        <Switch.Root defaultChecked={false} disabled>
          <Switch.Thumb />
        </Switch.Root>
        Disabled (off)
      </label>
      <label className="flex items-center gap-2 text-sm font-medium text-foreground cursor-pointer">
        <Switch.Root defaultChecked disabled>
          <Switch.Thumb />
        </Switch.Root>
        Disabled (on)
      </label>
    </div>
  ),
};
