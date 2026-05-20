import type { Meta, StoryObj } from '@storybook/react-vite';
import { Sheet } from '../src/components/sheet';
import { SimpleSheet } from '../src/components/sheet';
import { Button } from '../src/components/button';
import { Input } from '../src/components/input';
import { Field } from '../src/components/field';

const meta = {
  title: 'Components/Sheet',
  component: Sheet.Root,
  parameters: {
    layout: 'centered',
    docs: { story: { inline: false, height: '480px' } },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Sheet.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

function SheetExample({ side }: { side: 'top' | 'right' | 'bottom' | 'left' }) {
  return (
    <Sheet.Root>
      <Sheet.Trigger render={<Button>Open from {side}</Button>} />
      <Sheet.Portal>
        <Sheet.Backdrop />
        <Sheet.Popup side={side}>
          <div>
            <Sheet.Title>Edit profile</Sheet.Title>
            <Sheet.Description>Make changes to your profile here.</Sheet.Description>
          </div>
          <div className="flex-1 overflow-y-auto px-1 -mx-1 flex flex-col gap-4">
            <Field.Root>
              <Field.Label>Name</Field.Label>
              <Input defaultValue="Jane Doe" />
            </Field.Root>
            <Field.Root>
              <Field.Label>Username</Field.Label>
              <Input defaultValue="@janedoe" />
            </Field.Root>
          </div>
          <div className="flex justify-end gap-2">
            <Sheet.Close render={<Button variant="outline">Cancel</Button>} />
            <Sheet.Close render={<Button>Save</Button>} />
          </div>
        </Sheet.Popup>
      </Sheet.Portal>
    </Sheet.Root>
  );
}

export const Right: Story = {
  render: () => <SheetExample side="right" />,
};

export const Left: Story = {
  render: () => <SheetExample side="left" />,
};

export const Top: Story = {
  render: () => <SheetExample side="top" />,
};

export const Bottom: Story = {
  render: () => <SheetExample side="bottom" />,
};

export const Simple: Story = {
  render: () => (
    <SimpleSheet
      side="right"
      trigger={<Button>Open filters</Button>}
      title="Filters"
      description="Refine the list of resources."
      footer={
        <>
          <Sheet.Close render={<Button variant="outline">Reset</Button>} />
          <Sheet.Close render={<Button>Apply</Button>} />
        </>
      }
    >
      <div className="flex flex-col gap-3 text-sm">
        <p>Status, type, owner, and more.</p>
      </div>
    </SimpleSheet>
  ),
};
