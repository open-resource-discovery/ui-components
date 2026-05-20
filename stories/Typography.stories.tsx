import type { Meta, StoryObj } from '@storybook/react-vite';

interface Sample {
  className: string;
  size: string;
  description: string;
}

const SCALE: Sample[] = [
  { className: 'text-xs', size: '12px / 1rem', description: 'Captions, helper text, badges' },
  { className: 'text-sm', size: '14px / 1.25rem', description: 'Body copy, default UI text' },
  { className: 'text-base', size: '16px / 1.5rem', description: 'Long-form content' },
  { className: 'text-lg', size: '18px / 1.75rem', description: 'Section headings' },
  { className: 'text-xl', size: '20px / 1.75rem', description: 'Page subtitles' },
  { className: 'text-2xl', size: '24px / 2rem', description: 'Page titles' },
];

const WEIGHTS: { className: string; label: string }[] = [
  { className: 'font-normal', label: 'Normal · 400' },
  { className: 'font-medium', label: 'Medium · 500' },
  { className: 'font-semibold', label: 'Semibold · 600' },
  { className: 'font-bold', label: 'Bold · 700' },
];

const COLORS: { className: string; label: string; description: string }[] = [
  { className: 'text-foreground', label: 'Foreground', description: 'Default body text' },
  { className: 'text-muted-foreground', label: 'Muted', description: 'Captions, secondary info' },
  { className: 'text-primary', label: 'Primary', description: 'Links, emphasis' },
  { className: 'text-destructive', label: 'Destructive', description: 'Errors, validation' },
  { className: 'text-success', label: 'Success', description: 'Confirmations' },
  { className: 'text-warning', label: 'Warning', description: 'Caution states' },
];

function Page() {
  return (
    <div className="px-8 py-10 space-y-12 max-w-6xl mx-auto">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Typography</h1>
        <p className="text-sm text-muted-foreground max-w-2xl">
          Type scale and weights drawn from Tailwind defaults, paired with the design system's
          colour tokens. Switch the theme in the toolbar to verify contrast.
        </p>
      </header>

      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">Scale</h2>
          <p className="text-sm text-muted-foreground max-w-2xl">
            The six steps consumers should reach for. Stay on the scale rather than introducing
            arbitrary sizes.
          </p>
        </div>
        <div className="rounded-md border bg-card text-card-foreground divide-y">
          {SCALE.map((sample) => (
            <div
              key={sample.className}
              className="grid grid-cols-[8rem_8rem_1fr] items-baseline gap-6 px-5 py-4"
            >
              <code className="text-xs text-muted-foreground">{sample.className}</code>
              <code className="text-xs text-muted-foreground">{sample.size}</code>
              <span className={sample.className}>The quick brown fox jumps over the lazy dog</span>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">Weight</h2>
          <p className="text-sm text-muted-foreground max-w-2xl">
            Lean on weight, not size, to add emphasis within a line of text.
          </p>
        </div>
        <div className="rounded-md border bg-card text-card-foreground divide-y">
          {WEIGHTS.map((w) => (
            <div
              key={w.className}
              className="grid grid-cols-[8rem_1fr] items-baseline gap-6 px-5 py-4"
            >
              <code className="text-xs text-muted-foreground">{w.className}</code>
              <span className={`text-base ${w.className}`}>{w.label} — Aa Bb Cc</span>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">Colour</h2>
          <p className="text-sm text-muted-foreground max-w-2xl">
            Text colours map to design tokens so contrast tracks the active theme.
          </p>
        </div>
        <div className="rounded-md border bg-card text-card-foreground divide-y">
          {COLORS.map((c) => (
            <div
              key={c.className}
              className="grid grid-cols-[10rem_12rem_1fr] items-baseline gap-6 px-5 py-4"
            >
              <code className="text-xs text-muted-foreground">{c.className}</code>
              <span className="text-xs text-muted-foreground">{c.description}</span>
              <span className={`text-sm font-medium ${c.className}`}>{c.label} sample text</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const meta = {
  title: 'Styleguide/Typography',
  component: Page,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
