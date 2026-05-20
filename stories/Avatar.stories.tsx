import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from '../src/components/avatar';

const meta = {
  title: 'Components/Avatar',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithImage: Story = {
  render: () => (
    <Avatar.Root>
      <Avatar.Image src="https://i.pravatar.cc/150?u=a" alt="User" />
      <Avatar.Fallback>JD</Avatar.Fallback>
    </Avatar.Root>
  ),
};

export const WithFallback: Story = {
  render: () => (
    <Avatar.Root>
      <Avatar.Image src="https://invalid-url.example/broken.jpg" alt="User" />
      <Avatar.Fallback>JD</Avatar.Fallback>
    </Avatar.Root>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar.Root size="sm">
        <Avatar.Fallback>SM</Avatar.Fallback>
      </Avatar.Root>
      <Avatar.Root size="default">
        <Avatar.Fallback>MD</Avatar.Fallback>
      </Avatar.Root>
      <Avatar.Root size="lg">
        <Avatar.Fallback>LG</Avatar.Fallback>
      </Avatar.Root>
    </div>
  ),
};
