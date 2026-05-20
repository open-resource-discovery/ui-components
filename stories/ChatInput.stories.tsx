import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChatInput } from '../src/components/chat-input';

const meta = {
  title: 'Components/ChatInput',
  component: ChatInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 400 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ChatInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Type a message...',
    onSubmit: (value) => console.log('Submitted:', value),
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Connect to start chatting...',
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    onCancel: () => console.log('Cancelled'),
  },
};
