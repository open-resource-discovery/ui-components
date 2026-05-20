import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { SplitPane } from '../src/components/split-pane';
import { ConnectionCard } from '../src/components/connection-card';
import { CodeEditor } from '../src/components/code-editor';
import { InfoCard } from '../src/components/info-card';
import { Tabs } from '../src/components/tabs';
import { Badge } from '../src/components/badge';
import { CollapsibleSection } from '../src/components/collapsible-section';
import { MarkdownText } from '../src/components/markdown-text';
import { HttpLogEntry } from '../src/components/http-log-entry';
import { ValidationEntry } from '../src/components/validation-entry';
import { Input } from '../src/components/input';
import { Button } from '../src/components/button';
import { Select } from '../src/components/select';
import { Switch } from '../src/components/switch';
import { Separator } from '../src/components/separator';

const MOCK_MCP_JSON = JSON.stringify(
  {
    $schema:
      'https://raw.githubusercontent.com/anthropics/model-context-protocol/refs/heads/main/schema/2025-03-26/schema.json',
    name: 'mock/echo',
    title: 'Echo Server',
    version: '1.0.0',
    supportedProtocolVersions: ['2025-03-26'],
    description:
      'Server card auto-generated from live MCP connection to mock/echo',
    remotes: [
      { type: 'streamable-http', url: 'mock://echo' },
    ],
    capabilities: {
      tools: { listChanged: false },
    },
    tools: [
      {
        name: 'echo',
        description: 'Echoes back the input text',
        inputSchema: {
          type: 'object',
          properties: {
            text: { type: 'string', description: 'Text to echo' },
          },
          required: ['text'],
        },
      },
    ],
  },
  null,
  2,
);

const meta = {
  title: 'Compositions/MCP Playground',
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ height: '100vh', overflow: 'hidden' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function Sidebar() {
  const [connected, setConnected] = useState(true);
  const [selectedServer, setSelectedServer] = useState('echo');

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-card">
      {/* Header */}
      <div className="p-3 flex items-center gap-3">
        <span className="text-sm font-bold">MCP Server Card UI</span>
        <nav className="flex gap-2 ml-auto">
          <span className="text-xs text-muted-foreground cursor-pointer hover:text-foreground">Documentation</span>
          <span className="text-xs font-medium text-primary cursor-pointer">Playground</span>
        </nav>
      </div>
      <Separator />
      {/* Settings */}
      <div className="p-3 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Settings</span>
        </div>
        {/* Connection toggle */}
        <div className="flex items-center justify-between">
          <span className="text-sm">Connection</span>
          <label className="flex items-center gap-2 text-xs">
            <Switch.Root checked={connected} onCheckedChange={setConnected}>
              <Switch.Thumb />
            </Switch.Root>
            {connected ? 'Connected' : 'Disconnected'}
          </label>
        </div>
        {/* Server URL */}
        <Input value="mock/echo" readOnly className="h-8 text-xs" />
        {/* Transport select */}
        <Select.Root defaultValue="Streamable HTTP">
          <Select.Trigger className="h-8 text-xs">
            <Select.Value placeholder="Transport..." />
            <Select.Icon />
          </Select.Trigger>
          <Select.Portal>
            <Select.Positioner>
              <Select.Popup>
                <Select.Item value="Streamable HTTP">
                  <Select.ItemIndicator />
                  <Select.ItemText>Streamable HTTP</Select.ItemText>
                </Select.Item>
                <Select.Item value="SSE">
                  <Select.ItemIndicator />
                  <Select.ItemText>SSE</Select.ItemText>
                </Select.Item>
                <Select.Item value="stdio">
                  <Select.ItemIndicator />
                  <Select.ItemText>stdio</Select.ItemText>
                </Select.Item>
              </Select.Popup>
            </Select.Positioner>
          </Select.Portal>
        </Select.Root>
        {/* Auth select */}
        <Select.Root defaultValue="No Authentication">
          <Select.Trigger className="h-8 text-xs">
            <Select.Value placeholder="Authentication..." />
            <Select.Icon />
          </Select.Trigger>
          <Select.Portal>
            <Select.Positioner>
              <Select.Popup>
                <Select.Item value="No Authentication">
                  <Select.ItemIndicator />
                  <Select.ItemText>No Authentication</Select.ItemText>
                </Select.Item>
                <Select.Item value="Bearer Token">
                  <Select.ItemIndicator />
                  <Select.ItemText>Bearer Token</Select.ItemText>
                </Select.Item>
                <Select.Item value="Basic Auth">
                  <Select.ItemIndicator />
                  <Select.ItemText>Basic Auth</Select.ItemText>
                </Select.Item>
              </Select.Popup>
            </Select.Positioner>
          </Select.Portal>
        </Select.Root>
        {/* Disconnect button */}
        <Button variant="outline" size="sm" className="w-full text-xs">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
            <path d="M15 7h3a5 5 0 0 1 0 10h-3m-6 0H6A5 5 0 0 1 6 7h3" />
          </svg>
          Disconnect
        </Button>
      </div>
      <Separator />
      {/* Server info */}
      <div className="px-3 py-2">
        <p className="text-xs text-muted-foreground">mock/echo v1.0.0</p>
        <div className="mt-1">
          <Badge variant="secondary" size="sm">Tools</Badge>
        </div>
      </div>
      <Separator />
      {/* Servers list */}
      <div className="p-3 flex flex-col gap-2">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Servers</span>
        <ConnectionCard selected={selectedServer === 'echo'} onClick={() => setSelectedServer('echo')}>
          <ConnectionCard.Header>
            <ConnectionCard.Title>Echo Server</ConnectionCard.Title>
          </ConnectionCard.Header>
          <ConnectionCard.Description>mock/echo</ConnectionCard.Description>
          <ConnectionCard.Tags>
            <Badge variant="highlight" size="sm">Mock</Badge>
            <Badge variant="secondary" size="sm">test</Badge>
          </ConnectionCard.Tags>
        </ConnectionCard>
        <ConnectionCard selected={selectedServer === 'weather'} onClick={() => setSelectedServer('weather')}>
          <ConnectionCard.Header>
            <ConnectionCard.Title>Weather</ConnectionCard.Title>
          </ConnectionCard.Header>
          <ConnectionCard.Description>mock/weather</ConnectionCard.Description>
          <ConnectionCard.Tags>
            <Badge variant="highlight" size="sm">Mock</Badge>
            <Badge variant="secondary" size="sm">weather</Badge>
          </ConnectionCard.Tags>
        </ConnectionCard>
      </div>
    </div>
  );
}

function DetailPanel() {
  return (
    <Tabs.Root defaultValue="overview" className="h-full flex flex-col">
      <div className="px-3 pt-2">
        <Tabs.List>
          <Tabs.Tab value="overview">Overview</Tabs.Tab>
          <Tabs.Tab value="tools">Tools</Tabs.Tab>
          <Tabs.Tab value="http">
            Raw HTTP
            <Badge variant="outline" size="sm">3</Badge>
          </Tabs.Tab>
          <Tabs.Tab value="validation">Validation</Tabs.Tab>
        </Tabs.List>
      </div>
      {/* Overview panel */}
      <Tabs.Panel value="overview" className="flex-1 overflow-y-auto">
        <div className="p-3">
          <InfoCard>
            <InfoCard.Header>
              <InfoCard.Icon />
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <InfoCard.Title>Echo Server</InfoCard.Title>
                  <Badge variant="outline" size="sm">1.0.0</Badge>
                </div>
                <InfoCard.Subtitle>mock/echo</InfoCard.Subtitle>
              </div>
            </InfoCard.Header>
            <InfoCard.Content>
              <InfoCard.Section>
                <MarkdownText text="Server card auto-generated from live MCP connection to **mock/echo**." />
              </InfoCard.Section>
              <InfoCard.Section>
                <Badge variant="secondary" size="sm">Protocol 2025-03-26</Badge>
              </InfoCard.Section>
              <InfoCard.Section>
                <CollapsibleSection.Root defaultOpen>
                  <CollapsibleSection.Trigger>Remote Transports</CollapsibleSection.Trigger>
                  <CollapsibleSection.Content>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" size="sm">streamable-http</Badge>
                        <span className="text-xs text-muted-foreground">http://localhost:3000/mcp</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" size="sm">mock</Badge>
                        <span className="text-xs text-muted-foreground">mock://echo</span>
                      </div>
                    </div>
                  </CollapsibleSection.Content>
                </CollapsibleSection.Root>
              </InfoCard.Section>
              <InfoCard.Section>
                <CollapsibleSection.Root defaultOpen>
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
                <CollapsibleSection.Root defaultOpen>
                  <CollapsibleSection.Trigger>Tools (3)</CollapsibleSection.Trigger>
                  <CollapsibleSection.Content>
                    <div className="flex flex-col gap-2">
                      <div className="rounded-md border p-2">
                        <p className="text-xs font-medium">echo</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Echoes back the input text</p>
                        <p className="text-xs text-muted-foreground/70 mt-0.5">params: text (string, required)</p>
                      </div>
                      <div className="rounded-md border p-2">
                        <p className="text-xs font-medium">reverse</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Reverses the input string</p>
                        <p className="text-xs text-muted-foreground/70 mt-0.5">params: text (string, required)</p>
                      </div>
                      <div className="rounded-md border p-2">
                        <p className="text-xs font-medium">uppercase</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Converts text to uppercase</p>
                        <p className="text-xs text-muted-foreground/70 mt-0.5">params: text (string, required)</p>
                      </div>
                    </div>
                  </CollapsibleSection.Content>
                </CollapsibleSection.Root>
              </InfoCard.Section>
            </InfoCard.Content>
          </InfoCard>
        </div>
      </Tabs.Panel>
      {/* Tools panel */}
      <Tabs.Panel value="tools" className="flex-1 overflow-y-auto">
        <div className="p-3 flex flex-col gap-3">
          <div className="rounded-md border p-3">
            <p className="text-sm font-medium">echo</p>
            <p className="text-xs text-muted-foreground mt-1">Echoes back the input text</p>
            <div className="mt-2">
              <p className="text-xs font-medium text-muted-foreground">Parameters:</p>
              <p className="text-xs text-muted-foreground mt-0.5">text (string, required) — Text to echo</p>
            </div>
          </div>
        </div>
      </Tabs.Panel>
      {/* HTTP log panel */}
      <Tabs.Panel value="http" className="flex-1 overflow-y-auto">
        <div className="p-3 flex flex-col gap-2">
          <HttpLogEntry
            method="POST"
            url="http://localhost:3000/mcp"
            statusCode={200}
            duration={45}
            requestBody={JSON.stringify({ jsonrpc: '2.0', method: 'initialize', id: 1 })}
            responseBody={JSON.stringify({ jsonrpc: '2.0', result: { protocolVersion: '2025-03-26', capabilities: {} }, id: 1 })}
          />
          <HttpLogEntry
            method="POST"
            url="http://localhost:3000/mcp"
            statusCode={200}
            duration={32}
            requestBody={JSON.stringify({ jsonrpc: '2.0', method: 'tools/list', id: 2 })}
            responseBody={JSON.stringify({ jsonrpc: '2.0', result: { tools: [{ name: 'echo' }] }, id: 2 })}
          />
          <HttpLogEntry
            method="POST"
            url="http://localhost:3000/mcp"
            statusCode={200}
            duration={18}
            requestBody={JSON.stringify({ jsonrpc: '2.0', method: 'tools/call', params: { name: 'echo', arguments: { text: 'hello' } }, id: 3 })}
            responseBody={JSON.stringify({ jsonrpc: '2.0', result: { content: [{ type: 'text', text: 'hello' }] }, id: 3 })}
          />
        </div>
      </Tabs.Panel>
      {/* Validation panel */}
      <Tabs.Panel value="validation" className="flex-1 overflow-y-auto">
        <div className="p-3 flex flex-col gap-2">
          <ValidationEntry
            status="pass"
            rule="schema-valid"
            message="Server descriptor matches JSON schema"
          />
          <ValidationEntry
            status="warning"
            rule="tool-description-length"
            message='Tool "echo" description is shorter than recommended (< 20 chars)'
            path="tools[0].description"
          />
          <ValidationEntry
            status="fail"
            rule="required-contact"
            message='Missing required "contact" field in server descriptor'
            path="contact"
          />
        </div>
      </Tabs.Panel>
    </Tabs.Root>
  );
}

function PlaygroundLayout() {
  return (
    <SplitPane.Root orientation="horizontal">
      {/* Sidebar */}
      <SplitPane.Panel defaultSize={20} minSize={15}>
        <Sidebar />
      </SplitPane.Panel>
      <SplitPane.Handle />
      {/* Editor */}
      <SplitPane.Panel defaultSize={45} minSize={30}>
        <div className="h-full">
          <CodeEditor value={MOCK_MCP_JSON} defaultValue={MOCK_MCP_JSON} minHeight="calc(100vh - 40px)" className="h-full border-0 rounded-none" />
        </div>
      </SplitPane.Panel>
      <SplitPane.Handle />
      {/* Detail panel */}
      <SplitPane.Panel defaultSize={35} minSize={20}>
        <DetailPanel />
      </SplitPane.Panel>
    </SplitPane.Root>
  );
}

export const Default: Story = {
  render: () => <PlaygroundLayout />,
};
