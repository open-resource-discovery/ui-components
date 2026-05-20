import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useRef, useState } from 'react';

interface Token {
  name: string;
  variable: string;
  className: string;
  textClassName: string;
}

interface NeutralToken {
  name: string;
  variable: string;
  className: string;
}

interface Section {
  title: string;
  description: string;
  tokens: Token[];
}

interface NeutralSection {
  title: string;
  description: string;
  tokens: NeutralToken[];
}

const SECTIONS: Section[] = [
  {
    title: 'Surface',
    description:
      'Background and card surfaces define the page hierarchy. Background sits at the root; card and popover lift content above it.',
    tokens: [
      { name: 'Background', variable: '--ord-background', className: 'bg-background', textClassName: 'text-foreground' },
      { name: 'Foreground', variable: '--ord-foreground', className: 'bg-foreground', textClassName: 'text-background' },
      { name: 'Card', variable: '--ord-card', className: 'bg-card', textClassName: 'text-card-foreground' },
      { name: 'Card Foreground', variable: '--ord-card-foreground', className: 'bg-card-foreground', textClassName: 'text-card' },
      { name: 'Popover', variable: '--ord-popover', className: 'bg-popover', textClassName: 'text-popover-foreground' },
      { name: 'Popover Foreground', variable: '--ord-popover-foreground', className: 'bg-popover-foreground', textClassName: 'text-popover' },
    ],
  },
  {
    title: 'Brand',
    description:
      'Primary drives interactive accents — buttons, links, focus rings. Secondary, accent, and muted are surface tints used to differentiate panels without competing with primary.',
    tokens: [
      { name: 'Primary', variable: '--ord-primary', className: 'bg-primary', textClassName: 'text-primary-foreground' },
      { name: 'Primary Foreground', variable: '--ord-primary-foreground', className: 'bg-primary-foreground', textClassName: 'text-primary' },
      { name: 'Secondary', variable: '--ord-secondary', className: 'bg-secondary', textClassName: 'text-secondary-foreground' },
      { name: 'Secondary Foreground', variable: '--ord-secondary-foreground', className: 'bg-secondary-foreground', textClassName: 'text-secondary' },
      { name: 'Accent', variable: '--ord-accent', className: 'bg-accent', textClassName: 'text-accent-foreground' },
      { name: 'Accent Foreground', variable: '--ord-accent-foreground', className: 'bg-accent-foreground', textClassName: 'text-accent' },
      { name: 'Muted', variable: '--ord-muted', className: 'bg-muted', textClassName: 'text-muted-foreground' },
      { name: 'Muted Foreground', variable: '--ord-muted-foreground', className: 'bg-muted-foreground', textClassName: 'text-muted' },
    ],
  },
  {
    title: 'State',
    description:
      'State colours signal outcome. Use destructive for errors and irreversible actions, success for confirmations, warning for non-blocking caution.',
    tokens: [
      { name: 'Destructive', variable: '--ord-destructive', className: 'bg-destructive', textClassName: 'text-destructive-foreground' },
      { name: 'Destructive Foreground', variable: '--ord-destructive-foreground', className: 'bg-destructive-foreground', textClassName: 'text-destructive' },
      { name: 'Success', variable: '--ord-success', className: 'bg-success', textClassName: 'text-success-foreground' },
      { name: 'Success Foreground', variable: '--ord-success-foreground', className: 'bg-success-foreground', textClassName: 'text-success' },
      { name: 'Warning', variable: '--ord-warning', className: 'bg-warning', textClassName: 'text-warning-foreground' },
      { name: 'Warning Foreground', variable: '--ord-warning-foreground', className: 'bg-warning-foreground', textClassName: 'text-warning' },
    ],
  },
];

const NEUTRAL: NeutralSection = {
  title: 'Borders & Rings',
  description:
    'Subtle separators between elements. Border outlines panels and inputs at rest, input emphasises form controls, ring marks the active focus state.',
  tokens: [
    { name: 'Border', variable: '--ord-border', className: 'bg-border' },
    { name: 'Input', variable: '--ord-input', className: 'bg-input' },
    { name: 'Ring', variable: '--ord-ring', className: 'bg-ring' },
  ],
};

function useResolvedHex(variable: string) {
  const ref = useRef<HTMLDivElement>(null);
  const [hex, setHex] = useState('');

  useEffect(() => {
    if (!ref.current) return;
    const update = () => {
      const value = getComputedStyle(ref.current!).getPropertyValue(variable).trim();
      setHex(value || '—');
    };
    update();
    const observer = new MutationObserver(update);
    const root = ref.current.closest('.ord-ui');
    if (root) observer.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, [variable]);

  return [ref, hex] as const;
}

function Swatch({ token }: { token: Token }) {
  const [ref, hex] = useResolvedHex(token.variable);
  return (
    <div ref={ref} className="space-y-2">
      <div className={`${token.className} ${token.textClassName} rounded-md min-h-28 p-4 flex flex-col justify-end border`}>
        <span className="text-sm font-semibold">{token.name}</span>
        <span className="text-xs font-mono opacity-90">{hex}</span>
      </div>
      <div className="space-y-0.5 px-1">
        <code className="block text-[11px] text-muted-foreground">{token.variable}</code>
        <code className="block text-[11px] text-muted-foreground">{token.className}</code>
      </div>
    </div>
  );
}

function NeutralSwatch({ token }: { token: NeutralToken }) {
  const [ref, hex] = useResolvedHex(token.variable);
  return (
    <div ref={ref} className="space-y-2">
      <div className={`${token.className} rounded-md min-h-28 border`} />
      <div className="space-y-0.5 px-1">
        <span className="block text-sm font-semibold">{token.name}</span>
        <code className="block text-[11px] font-mono text-muted-foreground">{hex}</code>
        <code className="block text-[11px] text-muted-foreground">{token.variable}</code>
        <code className="block text-[11px] text-muted-foreground">{token.className}</code>
      </div>
    </div>
  );
}

function Page() {
  return (
    <div className="px-8 py-10 space-y-12 max-w-6xl mx-auto">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Colours</h1>
        <p className="text-sm text-muted-foreground max-w-2xl">
          Colour tokens exposed as CSS variables on the <code>.ord-ui</code> root and aliased
          through Tailwind utilities. Switch the theme in the toolbar to see the dark palette.
        </p>
      </header>

      {SECTIONS.map((section) => (
        <section key={section.title} className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">{section.title}</h2>
            <p className="text-sm text-muted-foreground max-w-2xl">{section.description}</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {section.tokens.map((token) => (
              <Swatch key={token.variable} token={token} />
            ))}
          </div>
        </section>
      ))}

      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">{NEUTRAL.title}</h2>
          <p className="text-sm text-muted-foreground max-w-2xl">{NEUTRAL.description}</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {NEUTRAL.tokens.map((token) => (
            <NeutralSwatch key={token.variable} token={token} />
          ))}
        </div>
      </section>
    </div>
  );
}

const meta = {
  title: 'Styleguide/Colours',
  component: Page,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
