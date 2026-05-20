import type { Meta, StoryObj } from '@storybook/react-vite';
import { Field } from '../src/components/field';
import { Input } from '../src/components/input';

const meta = {
  title: 'Components/Field',
  component: Field.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-full max-w-[320px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Field.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Field.Root>
      <Field.Label>Email</Field.Label>
      <Input placeholder="name@example.com" />
    </Field.Root>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <Field.Root>
      <Field.Label>Username</Field.Label>
      <Input placeholder="johndoe" />
      <Field.Description>This is your public display name.</Field.Description>
    </Field.Root>
  ),
};

export const WithError: Story = {
  render: () => (
    <Field.Root invalid>
      <Field.Label>Email</Field.Label>
      <Input placeholder="name@example.com" />
      <Field.Error>Please enter a valid email address.</Field.Error>
    </Field.Root>
  ),
};

export const Complete: Story = {
  render: () => (
    <Field.Root invalid>
      <Field.Label>Password</Field.Label>
      <Input type="password" placeholder="Enter password" />
      <Field.Description>Must be at least 8 characters.</Field.Description>
      <Field.Error>Password is too short.</Field.Error>
    </Field.Root>
  ),
};
