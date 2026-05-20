import type { Meta, StoryObj } from '@storybook/react-vite';
import { SplitPane } from '../src/components/split-pane';

const meta = {
  title: 'Components/SplitPane',
  component: SplitPane.Root,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ height: 400 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SplitPane.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

function PaneContent({ label, color }: { label: string; color: string }) {
  return (
    <div className={`h-full flex items-center justify-center text-sm font-medium ${color}`}>
      {label}
    </div>
  );
}

export const TwoPanes: Story = {
  render: () => (
    <SplitPane.Root orientation="horizontal">
      <SplitPane.Panel defaultSize={50} minSize={20}>
        <PaneContent label="Left Panel" color="bg-muted" />
      </SplitPane.Panel>
      <SplitPane.Handle />
      <SplitPane.Panel defaultSize={50} minSize={20}>
        <PaneContent label="Right Panel" color="bg-card" />
      </SplitPane.Panel>
    </SplitPane.Root>
  ),
};

export const ThreePanes: Story = {
  render: () => (
    <SplitPane.Root orientation="horizontal">
      <SplitPane.Panel defaultSize={20} minSize={15}>
        <PaneContent label="Sidebar" color="bg-muted" />
      </SplitPane.Panel>
      <SplitPane.Handle />
      <SplitPane.Panel defaultSize={45} minSize={30}>
        <PaneContent label="Editor" color="bg-card" />
      </SplitPane.Panel>
      <SplitPane.Handle />
      <SplitPane.Panel defaultSize={35} minSize={20}>
        <PaneContent label="Preview" color="bg-muted" />
      </SplitPane.Panel>
    </SplitPane.Root>
  ),
};

export const Vertical: Story = {
  render: () => (
    <SplitPane.Root orientation="vertical">
      <SplitPane.Panel defaultSize={60} minSize={20}>
        <PaneContent label="Top Panel" color="bg-card" />
      </SplitPane.Panel>
      <SplitPane.Handle />
      <SplitPane.Panel defaultSize={40} minSize={20}>
        <PaneContent label="Bottom Panel" color="bg-muted" />
      </SplitPane.Panel>
    </SplitPane.Root>
  ),
};

export const Nested: Story = {
  render: () => (
    <SplitPane.Root orientation="horizontal">
      <SplitPane.Panel defaultSize={30} minSize={15}>
        <PaneContent label="Sidebar" color="bg-muted" />
      </SplitPane.Panel>
      <SplitPane.Handle />
      <SplitPane.Panel defaultSize={70} minSize={30}>
        <SplitPane.Root orientation="vertical">
          <SplitPane.Panel defaultSize={60} minSize={20}>
            <PaneContent label="Main Content" color="bg-card" />
          </SplitPane.Panel>
          <SplitPane.Handle />
          <SplitPane.Panel defaultSize={40} minSize={15}>
            <PaneContent label="Terminal" color="bg-muted" />
          </SplitPane.Panel>
        </SplitPane.Root>
      </SplitPane.Panel>
    </SplitPane.Root>
  ),
};

export const Collapsible: Story = {
  render: () => (
    <SplitPane.Root orientation="horizontal">
      <SplitPane.Panel defaultSize={20} minSize={10} collapsible collapsedSize={0}>
        <PaneContent label="Collapsible Sidebar" color="bg-muted" />
      </SplitPane.Panel>
      <SplitPane.Handle />
      <SplitPane.Panel defaultSize={50} minSize={30}>
        <PaneContent label="Editor" color="bg-card" />
      </SplitPane.Panel>
      <SplitPane.Handle />
      <SplitPane.Panel defaultSize={30} minSize={15}>
        <PaneContent label="Preview" color="bg-muted" />
      </SplitPane.Panel>
    </SplitPane.Root>
  ),
};

export const NoGrip: Story = {
  render: () => (
    <SplitPane.Root orientation="horizontal">
      <SplitPane.Panel defaultSize={50} minSize={20}>
        <PaneContent label="Left" color="bg-muted" />
      </SplitPane.Panel>
      <SplitPane.Handle showGrip={false} />
      <SplitPane.Panel defaultSize={50} minSize={20}>
        <PaneContent label="Right" color="bg-card" />
      </SplitPane.Panel>
    </SplitPane.Root>
  ),
};
