import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from '../src/components/card';
import { SimpleCard } from '../src/components/card';
import { Button } from '../src/components/button';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card style={{ width: 350 }}>
      <Card.Header>
        <Card.Title>Card Title</Card.Title>
        <Card.Description>Card description goes here.</Card.Description>
      </Card.Header>
      <Card.Content>
        <p>Card content goes here. This is where the main body of the card would be displayed.</p>
      </Card.Content>
      <Card.Footer className="gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Submit</Button>
      </Card.Footer>
    </Card>
  ),
};

export const Simple: Story = {
  render: () => (
    <SimpleCard
      style={{ width: 350 }}
      title="Notifications"
      description="You have 3 unread messages."
      content={<p className="text-sm text-muted-foreground">Check your inbox for the latest updates.</p>}
      buttons={
        <>
          <Button variant="outline" size="sm">Dismiss</Button>
          <Button size="sm">View All</Button>
        </>
      }
    />
  ),
};

export const MinimalSimpleCard: Story = {
  render: () => (
    <SimpleCard
      style={{ width: 350 }}
      title="Simple Title Only"
    />
  ),
};
