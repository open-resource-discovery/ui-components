import type { Meta, StoryObj } from '@storybook/react-vite';
import { InfoCard } from '../src/components/info-card';
import { CollapsibleSection } from '../src/components/collapsible-section';
import { MarkdownText } from '../src/components/markdown-text';
import { Badge } from '../src/components/badge';

const meta = {
  title: 'Components/InfoCard',
  component: InfoCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 450 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof InfoCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <InfoCard>
      <InfoCard.Header>
        <InfoCard.Icon />
        <div className="flex flex-col gap-0.5">
          <InfoCard.Title>Echo Server</InfoCard.Title>
          <InfoCard.Subtitle>mock/echo v1.0.0</InfoCard.Subtitle>
        </div>
      </InfoCard.Header>
      <InfoCard.Content>
        <InfoCard.Section>
          <MarkdownText text="Server card auto-generated from live MCP connection to **mock/echo**." />
        </InfoCard.Section>
        <InfoCard.Section>
          <CollapsibleSection.Root>
            <CollapsibleSection.Trigger>Capabilities</CollapsibleSection.Trigger>
            <CollapsibleSection.Content>
              <div className="flex flex-wrap gap-1.5">
                <Badge variant="secondary" size="sm">Tools</Badge>
                <Badge variant="secondary" size="sm">Resources</Badge>
                <Badge variant="secondary" size="sm">Prompts</Badge>
              </div>
            </CollapsibleSection.Content>
          </CollapsibleSection.Root>
        </InfoCard.Section>
        <InfoCard.Section>
          <CollapsibleSection.Root>
            <CollapsibleSection.Trigger>
              <Badge variant="outline" size="sm">3</Badge>
              Tools
            </CollapsibleSection.Trigger>
            <CollapsibleSection.Content>
              <div className="flex flex-col gap-2">
                <p className="text-xs text-muted-foreground">echo — Echoes back the input text</p>
                <p className="text-xs text-muted-foreground">reverse — Reverses the input string</p>
                <p className="text-xs text-muted-foreground">uppercase — Converts to uppercase</p>
              </div>
            </CollapsibleSection.Content>
          </CollapsibleSection.Root>
        </InfoCard.Section>
      </InfoCard.Content>
    </InfoCard>
  ),
};

export const WithCustomIcon: Story = {
  render: () => (
    <InfoCard>
      <InfoCard.Header>
        <InfoCard.Icon>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          </svg>
        </InfoCard.Icon>
        <div className="flex flex-col gap-0.5">
          <InfoCard.Title>Weather Service</InfoCard.Title>
          <InfoCard.Subtitle>Provides real-time weather data</InfoCard.Subtitle>
        </div>
      </InfoCard.Header>
      <InfoCard.Content>
        <InfoCard.Section>
          <MarkdownText text={'Get current weather, forecasts, and historical data for any location worldwide.\n\n- Temperature\n- Humidity\n- Wind speed'} />
        </InfoCard.Section>
      </InfoCard.Content>
    </InfoCard>
  ),
};

export const MarkdownOnly: Story = {
  render: () => (
    <InfoCard>
      <InfoCard.Header>
        <div className="flex flex-col gap-0.5">
          <InfoCard.Title>Documentation</InfoCard.Title>
          <InfoCard.Subtitle>API Reference</InfoCard.Subtitle>
        </div>
      </InfoCard.Header>
      <InfoCard.Content>
        <InfoCard.Section>
          <MarkdownText text={`## Getting Started

Install the package:

\`\`\`bash
npm install @open-resource-discovery/ui-components
\`\`\`

Then import and use:

\`\`\`tsx
import { InfoCard } from '@open-resource-discovery/ui-components';
\`\`\``} />
        </InfoCard.Section>
      </InfoCard.Content>
    </InfoCard>
  ),
};
