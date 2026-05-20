import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dialog } from '../src/components/dialog';
import { SimpleDialog } from '../src/components/dialog';
import { Button } from '../src/components/button';
import { Input } from '../src/components/input';
import { Textarea } from '../src/components/textarea';
import { Field } from '../src/components/field';

const meta = {
  title: 'Components/Dialog',
  component: Dialog.Root,
  parameters: {
    layout: 'centered',
    docs: { story: { inline: false, height: '420px' } },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Dialog.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Dialog.Root>
      <Dialog.Trigger render={<Button>Open dialog</Button>} />
      <Dialog.Portal>
        <Dialog.Backdrop />
        <Dialog.Popup>
          <Dialog.Title>Are you sure?</Dialog.Title>
          <Dialog.Description>
            This action cannot be undone. This will permanently delete the connection.
          </Dialog.Description>
          <div className="mt-6 flex justify-end gap-2">
            <Dialog.Close render={<Button variant="outline">Cancel</Button>} />
            <Dialog.Close render={<Button variant="destructive">Delete</Button>} />
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  ),
};

export const WithForm: Story = {
  render: () => (
    <Dialog.Root>
      <Dialog.Trigger render={<Button>Edit profile</Button>} />
      <Dialog.Portal>
        <Dialog.Backdrop />
        <Dialog.Popup>
          <Dialog.Title>Edit profile</Dialog.Title>
          <Dialog.Description>Update your profile details and click save.</Dialog.Description>
          <div className="mt-4 flex flex-col gap-4">
            <Field.Root>
              <Field.Label>Name</Field.Label>
              <Input defaultValue="Jane Doe" />
            </Field.Root>
            <Field.Root>
              <Field.Label>Bio</Field.Label>
              <Textarea defaultValue="Building things on the open web." rows={3} />
            </Field.Root>
          </div>
          <div className="mt-6 flex justify-end gap-2">
            <Dialog.Close render={<Button variant="outline">Cancel</Button>} />
            <Dialog.Close render={<Button>Save</Button>} />
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  ),
};

export const Simple: Story = {
  render: () => (
    <SimpleDialog
      trigger={<Button>Open simple</Button>}
      title="Welcome"
      description="A SimpleDialog wraps the compound parts with a clean API."
      footer={
        <>
          <Dialog.Close render={<Button variant="outline">Cancel</Button>} />
          <Dialog.Close render={<Button>Continue</Button>} />
        </>
      }
    >
      <p className="text-sm">Anything you put inside renders in the body.</p>
    </SimpleDialog>
  ),
};

export const SimpleConfirm: Story = {
  render: () => (
    <SimpleDialog
      trigger={<Button variant="destructive">Delete account</Button>}
      title="Delete account?"
      description="This action is permanent. Your data will be unrecoverable."
      footer={
        <>
          <Dialog.Close render={<Button variant="outline">Cancel</Button>} />
          <Dialog.Close render={<Button variant="destructive">Delete</Button>} />
        </>
      }
    />
  ),
};
