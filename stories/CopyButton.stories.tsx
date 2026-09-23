import type { Meta, StoryObj } from '@storybook/react-vite';
import { CopyButton } from '../src/components/copy-button';

const meta = {
  title: 'Metadata UI/CopyButton',
  component: CopyButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CopyButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 'sap.s4:apiResource:Order_v1:v1',
    label: 'Copy identifier',
    copiedAnnouncement: 'Copied to clipboard',
    errorAnnouncement: 'Copy failed',
  },
};

export const WithLabel: Story = {
  args: {
    value: 'https://example.com/resource',
    variant: 'outline',
    size: 'sm',
    label: 'Copy link',
    copiedAnnouncement: 'Link copied',
    errorAnnouncement: 'Copy failed',
    children: (
      <>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
        </svg>
        Copy link
      </>
    ),
  },
};

export const InlineWithCode: Story = {
  render: () => (
    <div className="flex items-center gap-2 rounded-md border px-3 py-1.5 font-mono text-sm">
      <span>sap.s4:apiResource:Order_v1:v1</span>
      <CopyButton
        value="sap.s4:apiResource:Order_v1:v1"
        size="sm"
        label="Copy identifier"
        copiedAnnouncement="Copied"
        errorAnnouncement="Copy failed"
      />
    </div>
  ),
};
