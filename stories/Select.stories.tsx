import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from '../src/components/select';
import { SimpleSelect } from '../src/components/select';

const meta = {
  title: 'Components/Select',
  component: Select.Root,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="p-8" style={{ width: 300 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Select.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Select.Root defaultValue="streamable-http" items={{ 'streamable-http': 'Streamable HTTP', sse: 'SSE', stdio: 'stdio' }}>
      <Select.Trigger>
        <Select.Value placeholder="Select transport..." />
        <Select.Icon />
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner>
          <Select.Popup>
            <Select.Item value="streamable-http">
              <Select.ItemIndicator />
              <Select.ItemText>Streamable HTTP</Select.ItemText>
            </Select.Item>
            <Select.Item value="sse">
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
  ),
};

export const WithGroups: Story = {
  render: () => (
    <Select.Root defaultValue="streamable-http" items={{ 'streamable-http': 'Streamable HTTP', sse: 'SSE', stdio: 'stdio' }}>
      <Select.Trigger>
        <Select.Value placeholder="Select transport..." />
        <Select.Icon />
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner>
          <Select.Popup>
            <Select.Group>
              <Select.GroupLabel>Remote</Select.GroupLabel>
              <Select.Item value="streamable-http">
                <Select.ItemIndicator />
                <Select.ItemText>Streamable HTTP</Select.ItemText>
              </Select.Item>
              <Select.Item value="sse">
                <Select.ItemIndicator />
                <Select.ItemText>SSE</Select.ItemText>
              </Select.Item>
            </Select.Group>
            <Select.Group>
              <Select.GroupLabel>Local</Select.GroupLabel>
              <Select.Item value="stdio">
                <Select.ItemIndicator />
                <Select.ItemText>stdio</Select.ItemText>
              </Select.Item>
            </Select.Group>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Select.Root defaultValue="streamable-http" disabled items={{ 'streamable-http': 'Streamable HTTP' }}>
      <Select.Trigger>
        <Select.Value placeholder="Select transport..." />
        <Select.Icon />
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner>
          <Select.Popup>
            <Select.Item value="streamable-http">
              <Select.ItemIndicator />
              <Select.ItemText>Streamable HTTP</Select.ItemText>
            </Select.Item>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  ),
};

const transportItems = [
  { value: 'streamable-http', label: 'Streamable HTTP' },
  { value: 'sse', label: 'SSE' },
  { value: 'stdio', label: 'stdio' },
];

export const Simple: Story = {
  render: () => (
    <SimpleSelect
      items={transportItems}
      placeholder="Select transport..."
      defaultValue="streamable-http"
    />
  ),
};

const groupedItems = [
  {
    label: 'Remote',
    items: [
      { value: 'streamable-http', label: 'Streamable HTTP' },
      { value: 'sse', label: 'SSE' },
    ],
  },
  {
    label: 'Local',
    items: [{ value: 'stdio', label: 'stdio' }],
  },
];

export const SimpleWithGroups: Story = {
  render: () => (
    <SimpleSelect
      items={groupedItems}
      placeholder="Select transport..."
    />
  ),
};
