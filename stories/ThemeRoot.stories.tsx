import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeRoot } from '../src/theme/ThemeRoot';

const meta = {
  title: 'Theme/ThemeRoot',
  component: ThemeRoot,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ThemeRoot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    defaultTheme: 'light',
    children: (
      <div className="p-8 bg-background text-foreground">
        <h1 className="text-2xl font-bold text-primary">ORD UI</h1>
        <p className="text-muted-foreground mt-2">
          A component library for Open Resource Discovery.
        </p>
      </div>
    ),
  },
};

export const Dark: Story = {
  args: {
    defaultTheme: 'dark',
    children: (
      <div className="p-8 bg-background text-foreground">
        <h1 className="text-2xl font-bold text-primary">ORD UI</h1>
        <p className="text-muted-foreground mt-2">
          A component library for Open Resource Discovery.
        </p>
      </div>
    ),
  },
};
