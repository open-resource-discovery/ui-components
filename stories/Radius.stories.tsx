import type { Meta, StoryObj } from '@storybook/react-vite';

const RADII: { className: string; label: string }[] = [
  { className: 'rounded-none', label: '0' },
  { className: 'rounded-sm', label: 'sm' },
  { className: 'rounded', label: 'default' },
  { className: 'rounded-md', label: 'md' },
  { className: 'rounded-lg', label: 'lg' },
  { className: 'rounded-xl', label: 'xl' },
  { className: 'rounded-full', label: 'full' },
];

const SPACING: { className: string; size: string }[] = [
  { className: 'p-1', size: '0.25rem · 4px' },
  { className: 'p-2', size: '0.5rem · 8px' },
  { className: 'p-3', size: '0.75rem · 12px' },
  { className: 'p-4', size: '1rem · 16px' },
  { className: 'p-6', size: '1.5rem · 24px' },
  { className: 'p-8', size: '2rem · 32px' },
  { className: 'p-12', size: '3rem · 48px' },
];

function Page() {
  return (
    <div className="px-8 py-10 space-y-12 max-w-6xl mx-auto">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Radius &amp; Spacing</h1>
        <p className="text-sm text-muted-foreground max-w-2xl">
          Corner radii are derived from <code>--radius</code> (= <code>--ord-radius</code>,
          default 0.625rem). Spacing uses Tailwind's default scale.
        </p>
      </header>

      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">Radius</h2>
          <p className="text-sm text-muted-foreground max-w-2xl">
            Use the smaller radii for inline controls (inputs, badges) and larger radii for
            elevated surfaces (cards, popovers). Reserve <code>rounded-full</code> for avatars
            and pill buttons.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-6">
          {RADII.map((r) => (
            <div key={r.className} className="flex flex-col items-center gap-3">
              <div className={`${r.className} bg-primary h-20 w-20`} />
              <div className="text-center space-y-0.5">
                <code className="block text-xs text-muted-foreground">{r.className}</code>
                <span className="block text-[11px] text-muted-foreground">{r.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">Spacing</h2>
          <p className="text-sm text-muted-foreground max-w-2xl">
            The padding ruler below visualises common steps. Stick to multiples of 4px so
            content aligns predictably across components.
          </p>
        </div>
        <div className="rounded-md border bg-card text-card-foreground divide-y">
          {SPACING.map((s) => (
            <div
              key={s.className}
              className="grid grid-cols-[6rem_10rem_1fr] items-center gap-6 px-5 py-4"
            >
              <code className="text-xs text-muted-foreground">{s.className}</code>
              <code className="text-xs text-muted-foreground">{s.size}</code>
              <div className="flex items-center">
                <div className={`${s.className} bg-primary/20 border border-primary/40`}>
                  <div className="h-4 w-12 bg-primary/60" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const meta = {
  title: 'Styleguide/Radius & Spacing',
  component: Page,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
