import type { Meta, StoryObj } from '@storybook/react-vite';
import { CodeBlock } from '../src/components/code-block';
import { createHighlighter } from 'shiki';

let highlighterInstance: Awaited<ReturnType<typeof createHighlighter>> | null = null;

async function getHighlighter() {
  if (!highlighterInstance) {
    highlighterInstance = await createHighlighter({
      themes: ['github-light', 'github-dark'],
      langs: ['typescript', 'json', 'bash', 'html'],
    });
  }
  return highlighterInstance;
}

const meta = {
  title: 'Components/CodeBlock',
  component: CodeBlock,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 550 }}>
        <Story />
      </div>
    ),
  ],
  loaders: [async () => ({ highlighter: await getHighlighter() })],
} satisfies Meta<typeof CodeBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

const tsCode = `import { createHighlighter } from 'shiki';

const highlighter = await createHighlighter({
  themes: ['github-light', 'github-dark'],
  langs: ['typescript'],
});

const html = highlighter.codeToHtml(code, {
  lang: 'typescript',
  themes: { light: 'github-light', dark: 'github-dark' },
});`;

const jsonCode = `{
  "name": "@open-resource-discovery/ui-components",
  "version": "0.1.0",
  "dependencies": {
    "@base-ui/react": "^1.4.0",
    "class-variance-authority": "^0.7.0"
  }
}`;

const bashCode = `#!/bin/bash
npm install @open-resource-discovery/ui-components
npm install shiki

echo "Done!"`;

export const Default: Story = {
  args: {
    code: tsCode,
    language: 'typescript',
  },
  render: (args, { loaded }) => <CodeBlock {...args} highlighter={loaded.highlighter} />,
};

export const PlainText: Story = {
  args: {
    code: tsCode,
  },
};

export const WithFilename: Story = {
  args: {
    code: tsCode,
    language: 'typescript',
    filename: 'highlight.ts',
  },
  render: (args, { loaded }) => <CodeBlock {...args} highlighter={loaded.highlighter} />,
};

export const JSON_Example: Story = {
  name: 'JSON',
  args: {
    code: jsonCode,
    language: 'json',
    filename: 'package.json',
  },
  render: (args, { loaded }) => <CodeBlock {...args} highlighter={loaded.highlighter} />,
};

export const Bash: Story = {
  args: {
    code: bashCode,
    language: 'bash',
    filename: 'install.sh',
  },
  render: (args, { loaded }) => <CodeBlock {...args} highlighter={loaded.highlighter} />,
};

export const WithLineNumbers: Story = {
  args: {
    code: tsCode,
    language: 'typescript',
    showLineNumbers: true,
    filename: 'example.ts',
  },
  render: (args, { loaded }) => <CodeBlock {...args} highlighter={loaded.highlighter} />,
};

export const NoCopyButton: Story = {
  args: {
    code: jsonCode,
    language: 'json',
    showCopyButton: false,
  },
  render: (args, { loaded }) => <CodeBlock {...args} highlighter={loaded.highlighter} />,
};

export const LongCode: Story = {
  args: {
    code: Array.from({ length: 50 }, (_, i) => `const line${i + 1} = "This is line ${i + 1}";`).join('\n'),
    language: 'typescript',
    maxHeight: '200px',
    showLineNumbers: true,
  },
  render: (args, { loaded }) => <CodeBlock {...args} highlighter={loaded.highlighter} />,
};

export const Multiple: Story = {
  render: (_, { loaded }) => (
    <div className="flex flex-col gap-4">
      <CodeBlock code={tsCode} language="typescript" filename="app.ts" highlighter={loaded.highlighter} />
      <CodeBlock code={jsonCode} language="json" filename="config.json" highlighter={loaded.highlighter} />
      <CodeBlock code={bashCode} language="bash" highlighter={loaded.highlighter} />
    </div>
  ),
};
