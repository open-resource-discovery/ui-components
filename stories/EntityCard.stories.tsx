import type { Meta, StoryObj } from '@storybook/react-vite';
import { EntityCard } from '../src/components/entity-card';
import { ThemeRoot } from '../src/theme/ThemeRoot';

const meta = {
  title: 'Metadata UI/EntityCard',
  component: EntityCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof EntityCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    kind: 'API Resource',
    title: 'Sales Order API',
    subtitle: 'sap.s4:apiResource:SalesOrder:v1',
    description: 'Read and manage sales orders across the connected landscapes.',
    version: 'v1',
    statuses: [
      { label: 'Active', tone: 'success' },
      { label: 'Public', tone: 'info' },
    ],
    metrics: [
      { label: 'Compliance', value: '92%' },
      { label: 'Entity types', value: 8 },
    ],
  },
};

export const AsLink: Story = {
  args: {
    ...Default.args,
    href: '#',
    ariaLabel: 'Open Sales Order API',
  },
};

export const WithRenderProp: Story = {
  args: {
    ...Default.args,
    // In an app: `(props) => <Link href="/resources/sales-order" {...props} />`.
    render: (props) => <a href="#" {...props} />,
  },
};

export const Minimal: Story = {
  args: {
    kind: 'Event Resource',
    title: 'Order Changed',
  },
};

export const DarkMode: Story = {
  parameters: { disableThemeRoot: true, backgrounds: { value: 'dark' } },
  render: () => (
    <ThemeRoot defaultTheme="dark" style={{ padding: 24, width: 340 }}>
      <EntityCard
        kind="API Resource"
        title="Sales Order API"
        subtitle="sap.s4:apiResource:SalesOrder:v1"
        version="v1"
        statuses={[
          { label: 'Active', tone: 'success' },
          { label: 'Public', tone: 'info' },
        ]}
        metrics={[
          { label: 'Compliance', value: '92%' },
          { label: 'Entity types', value: 8 },
        ]}
      />
    </ThemeRoot>
  ),
};
