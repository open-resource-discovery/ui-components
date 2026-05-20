import type { Meta, StoryObj } from '@storybook/react-vite';
import { SectionCard } from '../src/components/section-card';
import { Badge } from '../src/components/badge';

const meta = {
  title: 'Components/SectionCard',
  component: SectionCard.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: "100%", maxWidth: 400 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SectionCard.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

const WrenchIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);

const ShieldIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
  </svg>
);

export const Basic: Story = {
  render: () => (
    <SectionCard.Root>
      <SectionCard.Header title="Tools (3)" />
      <SectionCard.Content>
        <p className="text-sm text-muted-foreground">Content goes here.</p>
      </SectionCard.Content>
    </SectionCard.Root>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <SectionCard.Root>
      <SectionCard.Header icon={WrenchIcon} title="Tools (3)" />
      <SectionCard.Content>
        <div className="space-y-2">
          <div className="text-sm p-2 rounded bg-muted">get_weather</div>
          <div className="text-sm p-2 rounded bg-muted">search_docs</div>
          <div className="text-sm p-2 rounded bg-muted">run_query</div>
        </div>
      </SectionCard.Content>
    </SectionCard.Root>
  ),
};

export const WithBadges: Story = {
  render: () => (
    <SectionCard.Root>
      <SectionCard.Header
        icon={ShieldIcon}
        title="Authentication"
        badges={
          <>
            <Badge variant="success" size="sm">Verified</Badge>
            <Badge variant="outline" size="sm">OAuth 2.0</Badge>
          </>
        }
      />
      <SectionCard.Content>
        <p className="text-sm text-muted-foreground">This server uses OAuth 2.0 with PKCE for authentication.</p>
      </SectionCard.Content>
    </SectionCard.Root>
  ),
};

export const Multiple: Story = {
  render: () => (
    <div className="space-y-3">
      <SectionCard.Root>
        <SectionCard.Header icon={WrenchIcon} title="Tools (3)" />
        <SectionCard.Content>
          <p className="text-sm text-muted-foreground">get_weather, search_docs, run_query</p>
        </SectionCard.Content>
      </SectionCard.Root>
      <SectionCard.Root>
        <SectionCard.Header
          icon={ShieldIcon}
          title="Security"
          badges={<Badge variant="success" size="sm">Enabled</Badge>}
        />
        <SectionCard.Content>
          <p className="text-sm text-muted-foreground">TLS 1.3 with mutual authentication.</p>
        </SectionCard.Content>
      </SectionCard.Root>
    </div>
  ),
};
