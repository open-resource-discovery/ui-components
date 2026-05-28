import type { Meta, StoryObj } from '@storybook/react-vite';
import { ValidationPass } from '../src/components/validation-pass';

const meta = {
  title: 'Components/ValidationPass',
  component: ValidationPass,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: "100%", maxWidth: 450 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ValidationPass>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <ValidationPass />,
};

export const WithSuffix: Story = {
  render: () => (
    <ValidationPass title="Agent card is valid" suffix=" (v0.3)" />
  ),
};

export const InPanel: Story = {
  render: () => (
    <div style={{ width: 480, height: 360, border: "1px solid var(--color-border)", borderRadius: 8 }}>
      <div className="flex h-full w-full items-center justify-center p-4">
        <ValidationPass title="Agent card is valid" suffix=" (v0.3)" />
      </div>
    </div>
  ),
};
