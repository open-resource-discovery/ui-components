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

// Simple inline icons so the stories stay dependency-free.
const BoxIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <path d="m3.3 7 8.7 5 8.7-5M12 22V12" />
  </svg>
);
const ChevronRight = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="m9 18 6-6-6-6" />
  </svg>
);

// Default: the prototype product card — 18px title, mono namespace subtitle, count-chip metrics,
// footer with version · owner and an "Explore ›" affordance. No `kind` eyebrow.
export const Default: Story = {
  args: {
    title: 'Sales Order',
    subtitle: <span style={{ fontFamily: 'ui-monospace, Menlo, monospace' }}>sap.s4:product:SalesOrder</span>,
    description: 'Read and manage sales orders across the connected landscapes.',
    statuses: [
      { label: 'Released', tone: 'success' },
      { label: '92% compliant', tone: 'success' },
    ],
    metrics: [
      { label: 'APIs', value: 6 },
      { label: 'Events', value: 3 },
      { label: 'Entity types', value: 8 },
    ],
    footer: (
      <>
        <span>v1 · 3 versions</span>
        <span style={{ margin: '0 2px' }}>·</span>
        <span>Core Platform</span>
      </>
    ),
    footerAction: <>Explore ›</>,
  },
};

// The prototype resource card: compact size, per-type tinted icon square, "type · vN" subtitle,
// a trailing chevron, dot status pills, and a mono format pill (via the free-form `pills` slot).
export const ResourceCard: Story = {
  args: {
    size: 'sm',
    icon: BoxIcon,
    iconClassName: 'ordu:bg-[#eff6ff] ordu:text-[#2563eb]',
    title: 'Sales Order API',
    subtitle: 'API Resource · v1.2',
    action: ChevronRight,
    description: 'Create, read and update sales orders.',
    statuses: [
      { label: 'Public', tone: 'info' },
      { label: 'Active', tone: 'success' },
    ],
    pills: (
      <span
        style={{
          fontFamily: 'ui-monospace, Menlo, monospace',
          background: '#f1f5f9',
          color: '#475569',
          borderRadius: 9999,
          padding: '2px 9px',
          fontSize: 11,
        }}>
        OData v4
      </span>
    ),
    onClick: () => {},
    ariaLabel: 'Open Sales Order API',
  },
};

export const AsLink: Story = {
  args: {
    ...Default.args,
    href: '#',
    ariaLabel: 'Open Sales Order',
  },
};

export const WithRenderProp: Story = {
  args: {
    ...Default.args,
    // In an app: `(props) => <Link href="/products/sales-order" {...props} />`.
    render: (props) => <a href="#" {...props} />,
  },
};

// Legacy two-column definition-list layout for metrics.
export const MetricsGrid: Story = {
  args: {
    ...Default.args,
    metricsVariant: 'grid',
    footer: undefined,
    footerAction: undefined,
  },
};

export const Disabled: Story = {
  args: {
    ...ResourceCard.args,
    disabled: true,
  },
};

export const Minimal: Story = {
  args: {
    title: 'Order Changed',
    subtitle: 'Event Resource',
  },
};

export const DarkMode: Story = {
  parameters: { disableThemeRoot: true, backgrounds: { value: 'dark' } },
  render: () => (
    <ThemeRoot defaultTheme="dark" style={{ padding: 24, width: 360 }}>
      <EntityCard
        title="Sales Order"
        subtitle={
          <span style={{ fontFamily: 'ui-monospace, Menlo, monospace' }}>sap.s4:product:SalesOrder</span>
        }
        description="Read and manage sales orders across the connected landscapes."
        statuses={[
          { label: 'Released', tone: 'success' },
          { label: '92% compliant', tone: 'success' },
        ]}
        metrics={[
          { label: 'APIs', value: 6 },
          { label: 'Events', value: 3 },
          { label: 'Entity types', value: 8 },
        ]}
        footer={<span>v1 · 3 versions · Core Platform</span>}
        footerAction={<>Explore ›</>}
      />
    </ThemeRoot>
  ),
};

// Renders inside a `.ord-root`-style token override (Explorer's bridge: 6px radius, SAP-blue
// primary) to prove the `--ord-entitycard-*` layer retunes with zero component changes.
export const HostThemeBridge: Story = {
  parameters: { disableThemeRoot: true },
  render: () => (
    <ThemeRoot
      style={
        {
          padding: 24,
          width: 340,
          '--ord-radius': '0.375rem',
          '--ord-primary': '#0070d2',
        } as React.CSSProperties
      }>
      <EntityCard
        size="sm"
        icon={BoxIcon}
        iconClassName="ordu:bg-[#eff6ff] ordu:text-[#0070d2]"
        title="Sales Order API"
        subtitle="API Resource · v1.2"
        action={ChevronRight}
        description="Create, read and update sales orders."
        statuses={[{ label: 'Active', tone: 'success' }]}
        footer={<span style={{ fontFamily: 'ui-monospace, Menlo, monospace' }}>sap.s4:apiResource:SalesOrder</span>}
        footerDivider={false}
        onClick={() => {}}
        ariaLabel="Open Sales Order API"
      />
    </ThemeRoot>
  ),
};
