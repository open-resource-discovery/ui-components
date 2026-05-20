import type { Meta, StoryObj } from '@storybook/react-vite';
import { TypingIndicator } from '../src/components/typing-indicator';

const meta = {
  title: 'Components/TypingIndicator',
  component: TypingIndicator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TypingIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InContext: Story = {
  render: () => (
    <div className="flex flex-col gap-2" style={{ width: 300 }}>
      <div className="mr-auto max-w-[85%] rounded-2xl rounded-bl-sm bg-muted px-4 py-2 text-sm">
        Let me think about that...
      </div>
      <TypingIndicator />
    </div>
  ),
};
