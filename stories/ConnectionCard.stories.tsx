import type { Meta, StoryObj } from '@storybook/react-vite';
import { ConnectionCard } from '../src/components/connection-card';
import { Badge } from '../src/components/badge';

const meta = {
  title: 'Components/ConnectionCard',
  component: ConnectionCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: "100%", maxWidth: 350 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ConnectionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ConnectionCard>
      <ConnectionCard.Header>
        <ConnectionCard.Title>Echo Server</ConnectionCard.Title>
        <Badge variant="highlight" size="sm">New</Badge>
      </ConnectionCard.Header>
      <ConnectionCard.Description>
        A simple echo server for testing MCP connections and tool calls.
      </ConnectionCard.Description>
      <ConnectionCard.Tags>
        <Badge variant="secondary" size="sm">MCP</Badge>
        <Badge variant="secondary" size="sm">Testing</Badge>
        <Badge variant="outline" size="sm">v1.0.0</Badge>
      </ConnectionCard.Tags>
    </ConnectionCard>
  ),
};

export const Simple: Story = {
  render: () => (
    <ConnectionCard>
      <ConnectionCard.Header>
        <ConnectionCard.Title>Weather API</ConnectionCard.Title>
      </ConnectionCard.Header>
      <ConnectionCard.Description>
        Provides real-time weather data for any location.
      </ConnectionCard.Description>
      <ConnectionCard.Tags>
        <Badge variant="secondary" size="sm">Weather</Badge>
        <Badge variant="secondary" size="sm">API</Badge>
      </ConnectionCard.Tags>
    </ConnectionCard>
  ),
};

export const WithHighlight: Story = {
  render: () => (
    <ConnectionCard>
      <ConnectionCard.Header>
        <ConnectionCard.Title>Database Connector</ConnectionCard.Title>
        <Badge variant="highlight" size="sm">Featured</Badge>
      </ConnectionCard.Header>
      <ConnectionCard.Description>
        Connect to PostgreSQL, MySQL, and SQLite databases with read/write access.
      </ConnectionCard.Description>
      <ConnectionCard.Tags>
        <Badge variant="success" size="sm">Stable</Badge>
        <Badge variant="secondary" size="sm">Database</Badge>
        <Badge variant="outline" size="sm">v2.3.1</Badge>
      </ConnectionCard.Tags>
    </ConnectionCard>
  ),
};
