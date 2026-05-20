import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs } from '../src/components/tabs';
import { Badge } from '../src/components/badge';

const meta = {
  title: 'Components/Tabs',
  component: Tabs.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ width: "100%", maxWidth: 400 }}>
      <Tabs.Root defaultValue="account">
        <Tabs.List>
          <Tabs.Tab value="account">Account</Tabs.Tab>
          <Tabs.Tab value="password">Password</Tabs.Tab>
          <Tabs.Tab value="settings">Settings</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="account">
          <p style={{ padding: '16px 0' }}>Manage your account settings and preferences.</p>
        </Tabs.Panel>
        <Tabs.Panel value="password">
          <p style={{ padding: '16px 0' }}>Change your password here.</p>
        </Tabs.Panel>
        <Tabs.Panel value="settings">
          <p style={{ padding: '16px 0' }}>Configure your application settings.</p>
        </Tabs.Panel>
      </Tabs.Root>
    </div>
  ),
};

export const WithBadges: Story = {
  render: () => (
    <div style={{ width: "100%", maxWidth: 500 }}>
      <Tabs.Root defaultValue="preview">
        <Tabs.List>
          <Tabs.Tab value="preview">Preview</Tabs.Tab>
          <Tabs.Tab value="validation">
            Validation
            <Badge variant="destructive" size="sm">3</Badge>
          </Tabs.Tab>
          <Tabs.Tab value="tools">
            Tools
            <Badge variant="secondary" size="sm">5</Badge>
          </Tabs.Tab>
          <Tabs.Tab value="logs">
            HTTP Log
            <Badge variant="outline" size="sm">12</Badge>
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="preview">
          <p className="text-sm text-muted-foreground py-4">Server card preview content.</p>
        </Tabs.Panel>
        <Tabs.Panel value="validation">
          <p className="text-sm text-muted-foreground py-4">3 validation errors found.</p>
        </Tabs.Panel>
        <Tabs.Panel value="tools">
          <p className="text-sm text-muted-foreground py-4">5 tools available.</p>
        </Tabs.Panel>
        <Tabs.Panel value="logs">
          <p className="text-sm text-muted-foreground py-4">12 HTTP log entries.</p>
        </Tabs.Panel>
      </Tabs.Root>
    </div>
  ),
};
