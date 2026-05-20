import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, useCallback } from 'react';
import { ScrollArea } from '../src/components/scroll-area';

const meta = {
  title: 'Components/ScrollArea',
  component: ScrollArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 300, height: 200 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ScrollArea className="h-full border border-border rounded-md p-3">
      <div className="flex flex-col gap-2">
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i} className="text-sm">Message {i + 1}: This is a scrollable item.</p>
        ))}
      </div>
    </ScrollArea>
  ),
};

function AutoScrollDemo() {
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);

  const addItem = useCallback(() => {
    setItems((prev) => [...prev, `Item ${prev.length + 1}`]);
  }, []);

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 border border-border rounded-md p-3">
        <div className="flex flex-col gap-2">
          {items.map((item, i) => (
            <p key={i} className="text-sm">{item}</p>
          ))}
        </div>
      </ScrollArea>
      <button
        onClick={addItem}
        className="mt-2 px-3 py-1 text-xs bg-primary text-primary-foreground rounded-md"
      >
        Add Item (auto-scrolls)
      </button>
    </div>
  );
}

export const AutoScroll: Story = {
  render: () => <AutoScrollDemo />,
};
