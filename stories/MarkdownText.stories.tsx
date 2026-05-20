import type { Meta, StoryObj } from '@storybook/react-vite';
import { MarkdownText } from '../src/components/markdown-text';

const meta = {
  title: 'Components/MarkdownText',
  component: MarkdownText,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: "100%", maxWidth: 400 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MarkdownText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'This is a **bold** and *italic* markdown text with a [link](https://example.com).',
  },
};

export const WithClamp: Story = {
  args: {
    text: `# Heading

This is a longer markdown text that should be clamped after a few lines. It contains multiple paragraphs.

- Item one
- Item two
- Item three

Another paragraph with more content that will definitely overflow the clamp limit and trigger the "Show more" button.

Final paragraph with **bold text** and \`inline code\`.`,
    clampLines: 3,
  },
};

export const CodeBlock: Story = {
  args: {
    text: `Here is some code:

\`\`\`javascript
const hello = "world";
console.log(hello);
\`\`\`

And an inline \`code snippet\`.`,
  },
};
