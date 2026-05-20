import type { Meta, StoryObj } from '@storybook/react-vite';
import { HttpLogEntry } from '../src/components/http-log-entry';

const meta = {
  title: 'Components/HttpLogEntry',
  component: HttpLogEntry,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 500 }}>
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

export const Multiple: Story = {
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
