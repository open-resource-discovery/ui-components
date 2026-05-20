import type { Meta, StoryObj } from '@storybook/react-vite';
import { CollapsibleSection } from '../src/components/collapsible-section';
import { Badge } from '../src/components/badge';

const meta = {
  title: 'Components/CollapsibleSection',
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
} satisfies Meta<typeof CollapsibleSection.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

const WrenchIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);

const CodeIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

export const Default: Story = {
  render: () => (
    <CollapsibleSection.Root>
      <CollapsibleSection.Trigger>Input Schema</CollapsibleSection.Trigger>
      <CollapsibleSection.Content>
        <pre className="text-xs bg-muted p-2 rounded-md">
          {JSON.stringify({ type: 'object', properties: { name: { type: 'string' } } }, null, 2)}
        </pre>
      </CollapsibleSection.Content>
    </CollapsibleSection.Root>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <CollapsibleSection.Root>
      <CollapsibleSection.Trigger icon={WrenchIcon}>Tools (3)</CollapsibleSection.Trigger>
      <CollapsibleSection.Content>
        <div className="space-y-1 pl-[18px]">
          <div className="text-sm">get_weather</div>
          <div className="text-sm">search_docs</div>
          <div className="text-sm">run_query</div>
        </div>
      </CollapsibleSection.Content>
    </CollapsibleSection.Root>
  ),
};

export const WithBadges: Story = {
  render: () => (
    <CollapsibleSection.Root>
      <CollapsibleSection.Trigger
        icon={CodeIcon}
        badges={
          <>
            <Badge variant="secondary" size="sm">required</Badge>
            <Badge variant="outline" size="sm">v2</Badge>
          </>
        }
      >
        Input Schema
      </CollapsibleSection.Trigger>
      <CollapsibleSection.Content>
        <pre className="text-xs bg-muted p-2 rounded-md mt-1">
          {JSON.stringify({ type: 'object', properties: { query: { type: 'string' } }, required: ['query'] }, null, 2)}
        </pre>
      </CollapsibleSection.Content>
    </CollapsibleSection.Root>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <CollapsibleSection.Root>
      <CollapsibleSection.Trigger
        icon={WrenchIcon}
        description="Fetches current weather data for a given city using the OpenWeather API."
      >
        get_weather
      </CollapsibleSection.Trigger>
      <CollapsibleSection.Content>
        <div className="pl-[18px] space-y-2">
          <p className="text-sm text-muted-foreground">Fetches current weather data for a given city using the OpenWeather API.</p>
          <pre className="text-xs bg-muted p-2 rounded-md">
            {JSON.stringify({ type: 'object', properties: { city: { type: 'string' } }, required: ['city'] }, null, 2)}
          </pre>
        </div>
      </CollapsibleSection.Content>
    </CollapsibleSection.Root>
  ),
};

export const Full: Story = {
  render: () => (
    <CollapsibleSection.Root>
      <CollapsibleSection.Trigger
        icon={WrenchIcon}
        badges={<Badge variant="success" size="sm">active</Badge>}
        description="Search documentation and return relevant snippets."
      >
        search_docs
      </CollapsibleSection.Trigger>
      <CollapsibleSection.Content>
        <div className="pl-[18px] space-y-2">
          <p className="text-sm">Search documentation and return relevant snippets.</p>
          <pre className="text-xs bg-muted p-2 rounded-md">
            {JSON.stringify({ type: 'object', properties: { query: { type: 'string' }, limit: { type: 'number', default: 5 } } }, null, 2)}
          </pre>
        </div>
      </CollapsibleSection.Content>
    </CollapsibleSection.Root>
  ),
};

export const DefaultOpen: Story = {
  render: () => (
    <CollapsibleSection.Root defaultOpen>
      <CollapsibleSection.Trigger icon={CodeIcon} description="This description is hidden when open.">
        Open by default
      </CollapsibleSection.Trigger>
      <CollapsibleSection.Content>
        <p className="text-sm pl-[18px]">This section is open by default. The description should be hidden.</p>
      </CollapsibleSection.Content>
    </CollapsibleSection.Root>
  ),
};

export const Bordered: Story = {
  render: () => (
    <CollapsibleSection.Root bordered>
      <CollapsibleSection.Trigger
        icon={WrenchIcon}
        badges={<Badge variant="success" size="sm">active</Badge>}
        description="Search documentation and return relevant snippets."
      >
        search_docs
      </CollapsibleSection.Trigger>
      <CollapsibleSection.Content>
        <pre className="text-xs bg-muted p-2 rounded-md">
          {JSON.stringify({ type: 'object', properties: { query: { type: 'string' }, limit: { type: 'number' } } }, null, 2)}
        </pre>
      </CollapsibleSection.Content>
    </CollapsibleSection.Root>
  ),
};
