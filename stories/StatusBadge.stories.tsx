import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatusBadge } from '../src/components/status-badge';
import { ThemeRoot } from '../src/theme/ThemeRoot';

const meta = {
  title: 'Metadata UI/StatusBadge',
  component: StatusBadge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof StatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tone: 'neutral',
    label: 'Draft',
  },
};

export const Info: Story = {
  args: {
    tone: 'info',
    label: 'Proposal',
  },
};

export const Success: Story = {
  args: {
    tone: 'success',
    label: 'Active',
  },
};

export const Warning: Story = {
  args: {
    tone: 'warning',
    label: 'Deprecated',
  },
};

export const Critical: Story = {
  args: {
    tone: 'critical',
    label: 'Failed',
  },
};

export const WithoutDot: Story = {
  args: {
    tone: 'info',
    label: 'No dot',
    dot: false,
  },
};

export const Small: Story = {
  args: {
    tone: 'success',
    size: 'sm',
    label: 'Active',
  },
};

export const AllTones: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <StatusBadge tone="neutral" label="Neutral" />
      <StatusBadge tone="info" label="Info" />
      <StatusBadge tone="success" label="Success" />
      <StatusBadge tone="warning" label="Warning" />
      <StatusBadge tone="critical" label="Critical" />
    </div>
  ),
};

export const DarkMode: Story = {
  parameters: { disableThemeRoot: true, backgrounds: { value: 'dark' } },
  render: () => (
    <ThemeRoot defaultTheme="dark" style={{ padding: 24 }}>
      <div className="flex flex-wrap gap-2">
        <StatusBadge tone="neutral" label="Neutral" />
        <StatusBadge tone="info" label="Info" />
        <StatusBadge tone="success" label="Success" />
        <StatusBadge tone="warning" label="Warning" />
        <StatusBadge tone="critical" label="Critical" />
      </div>
    </ThemeRoot>
  ),
};
