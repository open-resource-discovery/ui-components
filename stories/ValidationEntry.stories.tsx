import type { Meta, StoryObj } from '@storybook/react-vite';
import { ValidationEntry } from '../src/components/validation-entry';

const meta = {
  title: 'Components/ValidationEntry',
  component: ValidationEntry,
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
} satisfies Meta<typeof ValidationEntry>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Pass: Story = {
  render: () => (
    <ValidationEntry
      status="pass"
      rule="valid-tool-name"
      message="All tool names follow the naming convention."
    />
  ),
};

export const Warning: Story = {
  render: () => (
    <ValidationEntry
      status="warning"
      rule="description-length"
      message="Tool description exceeds recommended 200 character limit."
      path="/tools/0/description"
    />
  ),
};

export const Fail: Story = {
  render: () => (
    <ValidationEntry
      status="fail"
      rule="required-field"
      message='Missing required field "inputSchema" in tool definition.'
      path="/tools/1/inputSchema"
    />
  ),
};

export const Multiple: Story = {
  render: () => (
    <div className="space-y-2">
      <ValidationEntry
        status="fail"
        rule="required-field"
        message='Missing required field "inputSchema" in tool definition.'
        path="/tools/1/inputSchema"
      />
      <ValidationEntry
        status="warning"
        rule="description-length"
        message="Tool description exceeds recommended 200 character limit."
        path="/tools/0/description"
      />
      <ValidationEntry
        status="pass"
        rule="valid-tool-name"
        message="All tool names follow the naming convention."
      />
      <ValidationEntry
        status="pass"
        rule="unique-ids"
        message="All resource IDs are unique."
      />
    </div>
  ),
};
