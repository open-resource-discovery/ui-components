import type { Meta, StoryObj } from '@storybook/react-vite';
import { EmptyState } from '../src/components/empty-state';
import { Button } from '../src/components/button';
import { ThemeRoot } from '../src/theme/ThemeRoot';

const SearchIcon = (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const meta = {
  title: 'Metadata UI/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: SearchIcon,
    title: 'No results found',
    description: 'Try adjusting your search or filters to find what you are looking for.',
  },
};

export const WithAction: Story = {
  args: {
    icon: SearchIcon,
    title: 'No products yet',
    description: 'Products discovered in your landscapes will appear here.',
    actions: <Button variant="outline">Reset filters</Button>,
  },
};

export const TitleOnly: Story = {
  args: {
    title: 'Nothing to show',
  },
};

export const DarkMode: Story = {
  parameters: { disableThemeRoot: true, backgrounds: { value: 'dark' } },
  render: () => (
    <ThemeRoot defaultTheme="dark" style={{ padding: 24 }}>
      <EmptyState
        icon={SearchIcon}
        title="No results found"
        description="Try adjusting your search or filters."
        actions={<Button variant="outline">Reset filters</Button>}
      />
    </ThemeRoot>
  ),
};
