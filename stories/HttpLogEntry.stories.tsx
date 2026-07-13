import type { Meta, StoryObj } from '@storybook/react-vite';
import { HttpLogEntry } from '../src/components/http-log-entry';
import { Badge, CodeBlock } from '../src/index';

const meta = {
  title: 'Components/HttpLogEntry',
  component: HttpLogEntry,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: "100%", maxWidth: 500 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof HttpLogEntry>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    method: 'tools/call',
    url: 'http://localhost:3000/mcp',
    statusCode: 200,
    responseStatus: 'OK',
    duration: 62,
    timestamp: new Date(),
    requestBody: JSON.stringify({ jsonrpc: '2.0', method: 'tools/call', params: { name: 'get_weather', arguments: { city: 'Berlin' } }, id: 1 }),
    requestHeaders: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    responseBody: JSON.stringify({ jsonrpc: '2.0', result: { content: [{ type: 'text', text: '22°C, sunny' }] }, id: 1 }),
    onResend: () => console.log('Resend'),
    onCopy: () => console.log('Copy as cURL'),
  },
};

export const Error: Story = {
  args: {
    method: 'tools/call',
    url: 'http://localhost:3000/mcp',
    statusCode: 500,
    responseStatus: 'Internal Server Error',
    duration: 145,
    timestamp: new Date(),
    requestBody: JSON.stringify({ jsonrpc: '2.0', method: 'tools/call', params: { name: 'invalid_tool' }, id: 2 }),
    responseBody: JSON.stringify({ jsonrpc: '2.0', error: { code: -32601, message: 'Method not found' }, id: 2 }),
    error: 'Server returned an error response',
    onCopy: () => console.log('Copy as cURL'),
  },
};

export const Pending: Story = {
  args: {
    method: 'initialize',
    url: 'http://localhost:3000/mcp',
    timestamp: new Date(),
    requestBody: JSON.stringify({ jsonrpc: '2.0', method: 'initialize', params: { capabilities: {} }, id: 3 }),
  },
};

export const Highlighted: Story = {
  args: {
    method: 'tools/call',
    url: 'http://localhost:3000/mcp',
    statusCode: 200,
    responseStatus: 'OK',
    duration: 35,
    timestamp: new Date(),
    highlighted: true,
    defaultOpen: true,
    requestBody: JSON.stringify({ jsonrpc: '2.0', method: 'tools/call', params: { name: 'echo', arguments: { text: 'hello' } }, id: 4 }),
    responseBody: JSON.stringify({ jsonrpc: '2.0', result: { content: [{ type: 'text', text: 'hello' }] }, id: 4 }),
    onResend: () => console.log('Resend'),
    onCopy: () => console.log('Copy as cURL'),
  },
};

export const WithEdit: Story = {
  args: {
    method: 'tools/call',
    url: 'http://localhost:3000/mcp',
    statusCode: 200,
    responseStatus: 'OK',
    duration: 62,
    timestamp: new Date(),
    defaultOpen: true,
    requestBody: JSON.stringify({ jsonrpc: '2.0', method: 'tools/call', params: { name: 'get_weather', arguments: { city: 'Berlin' } }, id: 1 }),
    requestHeaders: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    responseBody: JSON.stringify({ jsonrpc: '2.0', result: { content: [{ type: 'text', text: '22°C, sunny' }] }, id: 1 }),
    onResend: () => console.log('Resend'),
    onCopy: () => console.log('Copy as cURL'),
    onEdit: (payload) => console.log('Edit & Send', payload),
  },
};

const sseEvents = [
  { index: 0, label: 'Event 1', dataJson: JSON.stringify({ jsonrpc: '2.0', result: { status: { state: 'submitted' } }, id: 5 }, null, 2) },
  { index: 1, label: 'Event 2', dataJson: JSON.stringify({ jsonrpc: '2.0', result: { status: { state: 'working' }, artifact: { parts: [{ type: 'text', text: 'Fetching weather…' }] } }, id: 5 }, null, 2) },
  { index: 2, label: 'Event 3', dataJson: JSON.stringify({ jsonrpc: '2.0', result: { status: { state: 'completed' }, artifact: { parts: [{ type: 'text', text: '22°C, sunny' }] } }, id: 5 }, null, 2) },
];

const sseResponseBodyContent = (
  <div className="space-y-1">
    <p className="text-[11px] text-muted-foreground">{sseEvents.length} events</p>
    {sseEvents.map((evt) => (
      <details key={evt.index} className="text-xs">
        <summary className="cursor-pointer text-muted-foreground hover:text-foreground">{evt.label}</summary>
        <CodeBlock code={evt.dataJson} language="json" className="mt-1 text-[11px]" />
      </details>
    ))}
  </div>
);

export const SSEStream: Story = {
  args: {
    method: 'message/stream',
    url: 'http://localhost:3000/a2a',
    statusCode: 200,
    responseStatus: 'OK',
    duration: 340,
    timestamp: new Date(),
    defaultOpen: true,
    requestBody: JSON.stringify({ jsonrpc: '2.0', method: 'message/stream', params: { message: { role: 'user', parts: [{ type: 'text', text: 'What is the weather in Berlin?' }] } }, id: 5 }),
    requestHeaders: { 'Content-Type': 'application/json', Accept: 'text/event-stream' },
    extraBadges: (
      <Badge variant="outline" size="sm" className="font-mono shrink-0">
        SSE
      </Badge>
    ),
    responseBodyContent: sseResponseBodyContent,
    onResend: () => console.log('Resend'),
    onCopy: () => console.log('Copy as cURL'),
  },
};

export const Multiple: Story = {
  args: { method: '', url: '' },
  render: () => (
    <div className="flex flex-col gap-2">
      <HttpLogEntry
        method="initialize"
        url="http://localhost:3000/mcp"
        statusCode={200}
        responseStatus="OK"
        duration={12}
        timestamp={new Date(Date.now() - 5000)}
        requestBody={JSON.stringify({ jsonrpc: '2.0', method: 'initialize', id: 1 })}
        responseBody={JSON.stringify({ jsonrpc: '2.0', result: { capabilities: { tools: {} } }, id: 1 })}
      />
      <HttpLogEntry
        method="tools/list"
        url="http://localhost:3000/mcp"
        statusCode={200}
        responseStatus="OK"
        duration={8}
        timestamp={new Date(Date.now() - 3000)}
        requestBody={JSON.stringify({ jsonrpc: '2.0', method: 'tools/list', id: 2 })}
        responseBody={JSON.stringify({ jsonrpc: '2.0', result: { tools: [{ name: 'get_weather' }] }, id: 2 })}
      />
      <HttpLogEntry
        method="tools/call"
        url="http://localhost:3000/mcp"
        statusCode={200}
        responseStatus="OK"
        duration={62}
        timestamp={new Date()}
        requestBody={JSON.stringify({ jsonrpc: '2.0', method: 'tools/call', params: { name: 'get_weather', arguments: { city: 'Berlin' } }, id: 3 })}
        responseBody={JSON.stringify({ jsonrpc: '2.0', result: { content: [{ type: 'text', text: '22°C' }] }, id: 3 })}
        onResend={() => {}}
        onCopy={() => {}}
      />
    </div>
  ),
};
