import type { Meta, StoryObj } from '@storybook/react-vite';
import { ExternalLinkButton } from '../src/components/external-link-button';

const meta = {
  title: 'Metadata UI/ExternalLinkButton',
  component: ExternalLinkButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ExternalLinkButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: 'https://open-resource-discovery.github.io/specification/',
    label: 'Open specification in a new tab',
  },
};

export const Outline: Story = {
  args: {
    href: 'https://open-resource-discovery.github.io/specification/',
    label: 'Open specification in a new tab',
    variant: 'outline',
    size: 'sm',
  },
};

export const InlineWithCode: Story = {
  render: () => (
    <div className="flex items-center gap-2 rounded-md border px-3 py-1.5 font-mono text-sm">
      <span>https://example.com/resource</span>
      <ExternalLinkButton href="https://example.com/resource" size="sm" label="Open in a new tab" />
    </div>
  ),
};
