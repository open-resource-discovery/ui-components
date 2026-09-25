import type { Meta, StoryObj } from '@storybook/react-vite';
import { MetricCard } from '../src/components/metric-card';
import { ThemeRoot } from '../src/theme/ThemeRoot';

const meta = {
  title: 'Metadata UI/MetricCard',
  component: MetricCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MetricCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Compliance score',
    value: '87%',
    detail: 'across 142 resources',
  },
};

export const TrendUp: Story = {
  args: {
    label: 'Conformant resources',
    value: '124',
    trend: { direction: 'up', value: '+8', label: 'Up 8 since last crawl' },
    detail: 'vs. last crawl',
  },
};

export const TrendDown: Story = {
  args: {
    label: 'Open violations',
    value: '31',
    trend: { direction: 'down', value: '-5', label: 'Down 5 since last crawl' },
    detail: 'vs. last crawl',
  },
};

export const Grid: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4" style={{ width: 520 }}>
      <MetricCard label="Landscapes" value="3" />
      <MetricCard label="Products" value="42" trend={{ direction: 'up', value: '+2' }} />
      <MetricCard label="Compliance score" value="87%" detail="across 142 resources" />
      <MetricCard label="Open violations" value="31" trend={{ direction: 'down', value: '-5' }} />
    </div>
  ),
};

export const DarkMode: Story = {
  parameters: { disableThemeRoot: true, backgrounds: { value: 'dark' } },
  render: () => (
    <ThemeRoot defaultTheme="dark" style={{ padding: 24 }}>
      <div className="grid grid-cols-2 gap-4" style={{ width: 520 }}>
        <MetricCard label="Products" value="42" trend={{ direction: 'up', value: '+2' }} />
        <MetricCard label="Open violations" value="31" trend={{ direction: 'down', value: '-5' }} />
      </div>
    </ThemeRoot>
  ),
};
