import type { Meta, StoryObj } from '@storybook/react-vite';
import { LinkButton } from '../src/components/link-button';

const meta = {
  title: 'Metadata UI/LinkButton',
  component: LinkButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LinkButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: '/products/sap.s4:apiResource:Order_v1:v1',
    label: 'Open resource',
  },
};

export const Outline: Story = {
  args: {
    href: '/products/sap.s4:apiResource:Order_v1:v1',
    label: 'Open resource',
    variant: 'outline',
    size: 'sm',
  },
};

export const InlineWithCode: Story = {
  render: () => (
    <div className="flex items-center gap-2 rounded-md border px-3 py-1.5 font-mono text-sm">
      <span>sap.s4:apiResource:Order_v1:v1</span>
      <LinkButton href="/products/sap.s4:apiResource:Order_v1:v1" size="sm" label="Open resource" />
    </div>
  ),
};
