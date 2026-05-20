import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChatMessage } from '../src/components/chat-message';
import { Badge } from '../src/components/badge';

const meta = {
  title: 'Components/ChatMessage',
  component: ChatMessage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 400 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ChatMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

const BotIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
    <path d="M12 8V4H8" />
    <rect width="16" height="12" x="4" y="8" rx="2" />
    <path d="M2 14h2" />
    <path d="M20 14h2" />
    <path d="M15 13v2" />
    <path d="M9 13v2" />
  </svg>
);

const UserIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
    <circle cx="12" cy="8" r="5" />
    <path d="M20 21a8 8 0 0 0-16 0" />
  </svg>
);

export const UserMessage: Story = {
  args: {
    role: 'user',
    timestamp: new Date(),
    children: <p>Hello! Can you help me with my project?</p>,
  },
};

export const AgentMessage: Story = {
  args: {
    role: 'agent',
    timestamp: new Date(),
    children: <p>Of course! I'd be happy to help. What are you working on?</p>,
  },
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <ChatMessage role="user" icon={UserIcon} timestamp={new Date(Date.now() - 60000)}>
        <p>What's the weather like today?</p>
      </ChatMessage>
      <ChatMessage role="agent" icon={BotIcon} timestamp={new Date()}>
        <p>It's 22°C and sunny with light winds from the west.</p>
      </ChatMessage>
    </div>
  ),
};

export const WithActions: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <ChatMessage
        role="user"
        icon={UserIcon}
        timestamp={new Date(Date.now() - 60000)}
        onCopy={() => console.log('Copy user message')}
        onRetry={() => console.log('Retry message')}
      >
        <p>What's the weather like today?</p>
      </ChatMessage>
      <ChatMessage
        role="agent"
        icon={BotIcon}
        timestamp={new Date()}
        onCopy={() => console.log('Copy agent message')}
      >
        <p>It's 22°C and sunny with light winds from the west. No umbrella needed!</p>
      </ChatMessage>
    </div>
  ),
};

export const Conversation: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <ChatMessage role="user" timestamp={new Date(Date.now() - 120000)} onCopy={() => {}} onRetry={() => {}}>
        <p>What's the weather like today?</p>
      </ChatMessage>
      <ChatMessage role="agent" timestamp={new Date(Date.now() - 60000)} onCopy={() => {}}>
        <p>Based on the current data, it's 22°C and sunny with light winds from the west.</p>
      </ChatMessage>
      <ChatMessage role="user" timestamp={new Date(Date.now() - 30000)} onCopy={() => {}} onRetry={() => {}}>
        <p>Thanks! Should I bring an umbrella?</p>
      </ChatMessage>
      <ChatMessage role="agent" timestamp={new Date()} onCopy={() => {}}>
        <p>No umbrella needed today! The forecast shows clear skies through the evening.</p>
      </ChatMessage>
    </div>
  ),
};

export const WithStatus: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <ChatMessage
        role="agent"
        icon={BotIcon}
        timestamp={new Date()}
        onCopy={() => {}}
        status={<Badge variant="success" size="sm">Compliant</Badge>}
      >
        <p>The response has been validated against the A2A protocol specification.</p>
      </ChatMessage>
      <ChatMessage
        role="agent"
        icon={BotIcon}
        timestamp={new Date()}
        onCopy={() => {}}
        status={
          <>
            <Badge variant="warning" size="sm">Non-compliant</Badge>
            <Badge variant="outline" size="sm">2 issues</Badge>
          </>
        }
      >
        <p>The response had some protocol validation issues.</p>
      </ChatMessage>
    </div>
  ),
};
