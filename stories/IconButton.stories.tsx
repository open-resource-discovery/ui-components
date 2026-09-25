import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconButton } from '../src/components/icon-button';

const StarIcon = (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    width="16"
    height="16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <path d="M11.5 2.8 14 8l5.7.8-4.1 4 1 5.7-5.1-2.7-5.1 2.7 1-5.7-4.1-4L9 8Z" />
  </svg>
);

const CheckIcon = (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    width="16"
    height="16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const meta = {
  title: 'Metadata UI/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: StarIcon,
    label: 'Favourite',
  },
};

export const TwoIcons: Story = {
  args: {
    icon: StarIcon,
    activeIcon: CheckIcon,
    active: true,
    label: 'Favourited',
  },
};

export const Outline: Story = {
  args: {
    icon: StarIcon,
    label: 'Favourite',
    variant: 'outline',
    size: 'sm',
  },
};
