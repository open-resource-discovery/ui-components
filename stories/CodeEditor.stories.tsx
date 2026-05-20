import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { CodeEditor } from '../src/components/code-editor';

const meta = {
  title: 'Components/CodeEditor',
  component: CodeEditor,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 600, height: 400 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CodeEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleJson = JSON.stringify(
  {
    name: 'get_weather',
    description: 'Fetches current weather data for a given city.',
    inputSchema: {
      type: 'object',
      properties: {
        city: { type: 'string', description: 'City name' },
        units: { type: 'string', enum: ['metric', 'imperial'], default: 'metric' },
      },
      required: ['city'],
    },
  },
  null,
  2,
);

function ControlledEditor(props: { readOnly?: boolean; showToolbar?: boolean }) {
  const [value, setValue] = useState(sampleJson);
  return (
    <CodeEditor
      value={value}
      onChange={setValue}
      defaultValue={sampleJson}
      minHeight="350px"
      {...props}
    />
  );
}

export const Default: Story = {
  render: () => <ControlledEditor />,
};

export const ReadOnly: Story = {
  render: () => <ControlledEditor readOnly />,
};

export const NoToolbar: Story = {
  render: () => <ControlledEditor showToolbar={false} />,
};
