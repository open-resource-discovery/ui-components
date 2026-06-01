import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import { ThemeRoot } from '../src/theme/ThemeRoot';
import { Button } from '../src/components/button';
import { Input } from '../src/components/input';
import { Textarea } from '../src/components/textarea';
import { PasswordInput } from '../src/components/password-input';
import { Field } from '../src/components/field';
import { Switch } from '../src/components/switch';
import { Checkbox } from '../src/components/checkbox';
import { SimpleSelect } from '../src/components/select';
import { SimpleCombobox } from '../src/components/combobox';
import { Badge } from '../src/components/badge';
import { Spinner } from '../src/components/spinner';
import { Progress } from '../src/components/progress';
import { ValidationEntry } from '../src/components/validation-entry';
import { ValidationPass } from '../src/components/validation-pass';
import { Card } from '../src/components/card';
import { InfoCard } from '../src/components/info-card';
import { Tabs } from '../src/components/tabs';
import { Dialog } from '../src/components/dialog';
import { Sheet } from '../src/components/sheet';
import { Tooltip } from '../src/components/tooltip';
import { Avatar } from '../src/components/avatar';
import { Separator } from '../src/components/separator';
import { MarkdownText } from '../src/components/markdown-text';
import { CodeBlock } from '../src/components/code-block';
import { HttpLogEntry } from '../src/components/http-log-entry';

// Mirror of src/theme/tokens.css. Source of truth: that file.
const LIGHT_DEFAULTS = {
  '--ord-radius': '0.625rem',
  '--ord-background': '#ffffff',
  '--ord-foreground': '#0b1120',
  '--ord-primary': '#172554',
  '--ord-primary-foreground': '#f8fafc',
  '--ord-secondary': '#f1f5f9',
  '--ord-secondary-foreground': '#0b1120',
  '--ord-muted': '#f1f5f9',
  '--ord-muted-foreground': '#6b7280',
  '--ord-accent': '#f1f5f9',
  '--ord-accent-foreground': '#0b1120',
  '--ord-destructive': '#dc2626',
  '--ord-destructive-foreground': '#ffffff',
  '--ord-success': '#4a9696',
  '--ord-success-foreground': '#ffffff',
  '--ord-warning': '#f59e0b',
  '--ord-warning-foreground': '#ffffff',
  '--ord-border': '#e2e8f0',
  '--ord-input': '#e2e8f0',
  '--ord-ring': '#64748b',
  '--ord-card': '#ffffff',
  '--ord-card-foreground': '#0b1120',
  '--ord-popover': '#ffffff',
  '--ord-popover-foreground': '#0b1120',
} as const;

const DARK_DEFAULTS = {
  '--ord-radius': '0.625rem',
  '--ord-background': '#1e1e1e',
  '--ord-foreground': '#d4d4d4',
  '--ord-primary': '#0098ff',
  '--ord-primary-foreground': '#1e1e1e',
  '--ord-secondary': '#2d2d30',
  '--ord-secondary-foreground': '#d4d4d4',
  '--ord-muted': '#2d2d30',
  '--ord-muted-foreground': '#969696',
  '--ord-accent': '#2d2d30',
  '--ord-accent-foreground': '#d4d4d4',
  '--ord-destructive': '#f44747',
  '--ord-destructive-foreground': '#ffffff',
  '--ord-success': '#27e0d1',
  '--ord-success-foreground': '#ffffff',
  '--ord-warning': '#ff9800',
  '--ord-warning-foreground': '#ffffff',
  '--ord-border': '#3e3e42',
  '--ord-input': '#3e3e42',
  '--ord-ring': '#0098ff',
  '--ord-card': '#252526',
  '--ord-card-foreground': '#d4d4d4',
  '--ord-popover': '#252526',
  '--ord-popover-foreground': '#d4d4d4',
} as const;

type TokenKey = keyof typeof LIGHT_DEFAULTS;

const COLOR_PAIRS: Array<[TokenKey, TokenKey | null]> = [
  ['--ord-background', '--ord-foreground'],
  ['--ord-primary', '--ord-primary-foreground'],
  ['--ord-secondary', '--ord-secondary-foreground'],
  ['--ord-muted', '--ord-muted-foreground'],
  ['--ord-accent', '--ord-accent-foreground'],
  ['--ord-destructive', '--ord-destructive-foreground'],
  ['--ord-success', '--ord-success-foreground'],
  ['--ord-warning', '--ord-warning-foreground'],
  ['--ord-border', '--ord-input'],
  ['--ord-card', '--ord-card-foreground'],
  ['--ord-popover', '--ord-popover-foreground'],
  ['--ord-ring', null],
];

// Per-component tokens. Empty by default — each defaults to its semantic source via CSS cascade.
// The editor only writes a token here when the user explicitly overrides it.
const COMPONENT_TOKEN_GROUPS: Array<{ component: string; tokens: string[] }> = [
  {
    component: 'Card',
    tokens: ['--ord-card-bg', '--ord-card-fg', '--ord-card-border'],
  },
  {
    component: 'Button',
    tokens: [
      '--ord-button-primary-bg',
      '--ord-button-primary-fg',
      '--ord-button-primary-bg-hover',
      '--ord-button-primary-bg-active',
      '--ord-button-secondary-bg',
      '--ord-button-secondary-fg',
      '--ord-button-secondary-bg-hover',
      '--ord-button-destructive-bg',
      '--ord-button-destructive-fg',
      '--ord-button-destructive-bg-hover',
      '--ord-button-outline-border',
      '--ord-button-outline-bg',
      '--ord-button-outline-bg-hover',
      '--ord-button-outline-fg-hover',
      '--ord-button-ghost-bg-hover',
      '--ord-button-ghost-fg-hover',
      '--ord-button-link-fg',
    ],
  },
  {
    component: 'Badge',
    tokens: [
      '--ord-badge-default-bg',
      '--ord-badge-default-fg',
      '--ord-badge-secondary-bg',
      '--ord-badge-secondary-fg',
      '--ord-badge-destructive-bg',
      '--ord-badge-destructive-fg',
      '--ord-badge-success-bg',
      '--ord-badge-success-fg',
      '--ord-badge-warning-bg',
      '--ord-badge-warning-fg',
      '--ord-badge-outline-border',
      '--ord-badge-outline-fg',
      '--ord-badge-highlight-bg',
      '--ord-badge-highlight-fg',
      '--ord-badge-highlight-border',
    ],
  },
  {
    component: 'Input',
    tokens: ['--ord-input-bg', '--ord-input-fg', '--ord-input-border', '--ord-input-placeholder'],
  },
  {
    component: 'Tabs',
    tokens: ['--ord-tabs-fg', '--ord-tabs-active-bg', '--ord-tabs-active-fg', '--ord-tabs-indicator'],
  },
  {
    component: 'Tooltip',
    tokens: ['--ord-tooltip-bg', '--ord-tooltip-fg'],
  },
  {
    component: 'Dialog',
    tokens: [
      '--ord-dialog-backdrop',
      '--ord-dialog-bg',
      '--ord-dialog-fg',
      '--ord-dialog-border',
      '--ord-dialog-description-fg',
    ],
  },
  {
    component: 'Sheet',
    tokens: [
      '--ord-sheet-backdrop',
      '--ord-sheet-bg',
      '--ord-sheet-fg',
      '--ord-sheet-border',
      '--ord-sheet-description-fg',
    ],
  },
  {
    component: 'Combobox',
    tokens: [
      '--ord-combobox-popup-bg',
      '--ord-combobox-popup-fg',
      '--ord-combobox-popup-border',
      '--ord-combobox-item-bg-hover',
      '--ord-combobox-item-fg-hover',
    ],
  },
  {
    component: 'Select',
    tokens: [
      '--ord-select-trigger-bg',
      '--ord-select-trigger-fg',
      '--ord-select-trigger-border',
      '--ord-select-popup-bg',
      '--ord-select-popup-fg',
      '--ord-select-popup-border',
      '--ord-select-item-bg-hover',
      '--ord-select-item-fg-hover',
    ],
  },
  {
    component: 'Switch',
    tokens: ['--ord-switch-track-on', '--ord-switch-track-off', '--ord-switch-thumb'],
  },
  {
    component: 'Checkbox',
    tokens: ['--ord-checkbox-border', '--ord-checkbox-bg-checked', '--ord-checkbox-fg-checked'],
  },
  {
    component: 'Progress',
    tokens: ['--ord-progress-track', '--ord-progress-indicator'],
  },
  {
    component: 'Spinner',
    tokens: ['--ord-spinner-fg'],
  },
  {
    component: 'Avatar',
    tokens: ['--ord-avatar-fallback-bg', '--ord-avatar-fallback-fg'],
  },
];

const FONT_PRESETS = [
  { value: 'inherit', label: 'System default' },
  { value: 'Inter, ui-sans-serif, system-ui, sans-serif', label: 'Inter (sans)' },
  { value: 'Georgia, "Times New Roman", serif', label: 'Georgia (serif)' },
  { value: '"JetBrains Mono", ui-monospace, monospace', label: 'JetBrains Mono' },
];

function isHex(s: string): boolean {
  return /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(s);
}

interface EditorState {
  mode: 'light' | 'dark';
  colors: Partial<Record<TokenKey, string>>;
  componentColors: Record<string, string>;
  radius: number;
  fontFamily: string;
  fontSize: number;
}

const initialState = (mode: 'light' | 'dark'): EditorState => ({
  mode,
  colors: {},
  componentColors: {},
  radius: 10,
  fontFamily: 'inherit',
  fontSize: 14,
});

function buildOverrides(state: EditorState): CSSProperties {
  const defaults = state.mode === 'dark' ? DARK_DEFAULTS : LIGHT_DEFAULTS;
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(state.colors)) {
    if (v && v !== defaults[k as TokenKey]) out[k] = v;
  }
  for (const [k, v] of Object.entries(state.componentColors)) {
    if (v) out[k] = v;
  }
  out['--ord-radius'] = `${state.radius / 16}rem`;
  return out as CSSProperties;
}

function buildCss(state: EditorState): string {
  const defaults = state.mode === 'dark' ? DARK_DEFAULTS : LIGHT_DEFAULTS;
  const lines: string[] = [];
  for (const [k, v] of Object.entries(state.colors)) {
    if (v && v !== defaults[k as TokenKey]) lines.push(`  ${k}: ${v};`);
  }
  for (const [k, v] of Object.entries(state.componentColors)) {
    if (v) lines.push(`  ${k}: ${v};`);
  }
  if (state.radius !== 10) lines.push(`  --ord-radius: ${state.radius / 16}rem;`);
  if (state.fontFamily && state.fontFamily !== 'inherit') {
    lines.push(`  font-family: ${state.fontFamily};`);
  }
  if (state.fontSize !== 14) lines.push(`  font-size: ${state.fontSize}px;`);

  const selector = state.mode === 'dark' ? '.ord-ui.dark' : '.ord-ui';
  return `${selector} {\n${lines.join('\n') || '  /* no overrides yet */'}\n}\n`;
}

interface ColorRowProps {
  token: string;
  value: string;
  onChange: (next: string) => void;
}

function ColorRow({ token, value, onChange }: ColorRowProps) {
  const label = token.replace('--ord-', '').replace(/-/g, ' ');
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[11px] font-medium text-muted-foreground capitalize">
        {label}
      </label>
      <div className="flex items-center gap-1.5">
        <input
          type="color"
          value={isHex(value) ? value : '#000000'}
          onChange={(e) => onChange(e.target.value)}
          className="h-7 w-7 cursor-pointer rounded-md border border-border bg-transparent p-0"
          aria-label={`${label} color picker`}
        />
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-7 flex-1 text-[11px] font-mono px-2"
          spellCheck={false}
        />
      </div>
    </div>
  );
}

function EditorSidebar({
  state,
  setState,
}: {
  state: EditorState;
  setState: React.Dispatch<React.SetStateAction<EditorState>>;
}) {
  const defaults = state.mode === 'dark' ? DARK_DEFAULTS : LIGHT_DEFAULTS;
  const [copied, setCopied] = useState(false);

  const setColor = (k: TokenKey, v: string) =>
    setState((s) => ({ ...s, colors: { ...s.colors, [k]: v } }));

  const setComponentColor = (k: string, v: string) =>
    setState((s) => ({ ...s, componentColors: { ...s.componentColors, [k]: v } }));

  const clearComponentColor = (k: string) =>
    setState((s) => {
      const next = { ...s.componentColors };
      delete next[k];
      return { ...s, componentColors: next };
    });

  const reset = () =>
    setState((s) => ({
      ...s,
      colors: {},
      componentColors: {},
      radius: 10,
      fontFamily: 'inherit',
      fontSize: 14,
    }));

  const copy = async () => {
    const css = buildCss(state);
    try {
      await navigator.clipboard.writeText(css);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard not available; surface visually anyway.
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <aside className="flex h-full w-[340px] shrink-0 flex-col border-r border-border bg-card text-card-foreground">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <h2 className="text-sm font-semibold">Theme Editor</h2>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">{state.mode === 'dark' ? 'Dark' : 'Light'}</span>
          <Switch.Root
            checked={state.mode === 'dark'}
            onCheckedChange={(checked) =>
              setState((s) => ({ ...s, mode: checked ? 'dark' : 'light', colors: {}, componentColors: {} }))
            }
          >
            <Switch.Thumb />
          </Switch.Root>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-4">
        <section>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Colors
          </h3>
          <div className="flex flex-col gap-2">
            {COLOR_PAIRS.map(([a, b]) => (
              <div key={a} className="grid grid-cols-2 gap-2">
                <ColorRow
                  token={a}
                  value={state.colors[a] ?? defaults[a]}
                  onChange={(v) => setColor(a, v)}
                />
                {b ? (
                  <ColorRow
                    token={b}
                    value={state.colors[b] ?? defaults[b]}
                    onChange={(v) => setColor(b, v)}
                  />
                ) : (
                  <div />
                )}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Border radius
          </h3>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={0}
              max={24}
              value={state.radius}
              onChange={(e) => setState((s) => ({ ...s, radius: Number(e.target.value) }))}
              className="flex-1 accent-[var(--ord-primary)]"
            />
            <span className="w-12 text-right text-xs font-mono">{state.radius}px</span>
          </div>
        </section>

        <section>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Font
          </h3>
          <div className="flex flex-col gap-2">
            <Field.Root>
              <Field.Label className="text-[11px]">Family</Field.Label>
              <SimpleSelect
                items={FONT_PRESETS}
                value={state.fontFamily}
                onChange={(v) => setState((s) => ({ ...s, fontFamily: v || 'inherit' }))}
              />
            </Field.Root>
            <Field.Root>
              <Field.Label className="text-[11px]">
                Size <span className="font-mono text-muted-foreground">({state.fontSize}px)</span>
              </Field.Label>
              <input
                type="range"
                min={12}
                max={18}
                value={state.fontSize}
                onChange={(e) => setState((s) => ({ ...s, fontSize: Number(e.target.value) }))}
                className="accent-[var(--ord-primary)]"
              />
            </Field.Root>
          </div>
        </section>

        <section>
          <details>
            <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wide text-muted-foreground select-none">
              Component overrides (advanced)
            </summary>
            <p className="mt-2 mb-3 text-[11px] text-muted-foreground">
              Each token defaults to its semantic source. Set a value to override only that component.
            </p>
            <div className="flex flex-col gap-2">
              {COMPONENT_TOKEN_GROUPS.map((group) => (
                <details key={group.component} className="rounded-md border border-border p-2">
                  <summary className="cursor-pointer text-[11px] font-semibold select-none">
                    {group.component}
                    {group.tokens.some((t) => state.componentColors[t]) && (
                      <span className="ml-2 text-[10px] text-[var(--ord-primary)]">●</span>
                    )}
                  </summary>
                  <div className="mt-2 flex flex-col gap-2">
                    {group.tokens.map((token) => {
                      const set = Boolean(state.componentColors[token]);
                      return (
                        <div key={token} className="flex items-end gap-1">
                          <div className="flex-1">
                            <ColorRow
                              token={token}
                              value={state.componentColors[token] ?? ''}
                              onChange={(v) => setComponentColor(token, v)}
                            />
                          </div>
                          {set && (
                            <button
                              type="button"
                              onClick={() => clearComponentColor(token)}
                              className="h-7 px-1.5 text-[10px] text-muted-foreground hover:text-foreground"
                              aria-label={`Clear ${token}`}
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </details>
              ))}
            </div>
          </details>
        </section>
      </div>

      <div className="flex gap-2 border-t border-border px-4 py-3">
        <Button variant="outline" size="sm" className="flex-1" onClick={reset}>
          Reset
        </Button>
        <Button size="sm" className="flex-1" onClick={copy}>
          {copied ? 'Copied!' : 'Copy CSS'}
        </Button>
      </div>
    </aside>
  );
}

function GallerySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="mb-3 text-base font-semibold text-foreground">{title}</h2>
      <div className="rounded-[var(--ord-radius)] border border-border bg-card p-4">{children}</div>
    </section>
  );
}

function ButtonsRow() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
      <Button size="sm">Small</Button>
      <Button size="lg">Large</Button>
      <Button disabled>Disabled</Button>
    </div>
  );
}

const FRUITS = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'mango', label: 'Mango' },
];

function FormsRow() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <Field.Root>
        <Field.Label>Email</Field.Label>
        <Input placeholder="you@example.com" />
        <Field.Description>We&apos;ll never share it.</Field.Description>
      </Field.Root>

      <Field.Root invalid>
        <Field.Label>Password</Field.Label>
        <PasswordInput placeholder="••••••••" />
        <Field.Error>Required.</Field.Error>
      </Field.Root>

      <Field.Root>
        <Field.Label>Bio</Field.Label>
        <Textarea placeholder="Tell us about yourself" rows={3} />
      </Field.Root>

      <Field.Root>
        <Field.Label>Favourite fruit</Field.Label>
        <SimpleSelect items={FRUITS} placeholder="Pick one..." />
      </Field.Root>

      <Field.Root>
        <Field.Label>Search</Field.Label>
        <SimpleCombobox items={FRUITS} placeholder="Type to search..." />
      </Field.Root>

      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 text-sm">
          <Switch.Root defaultChecked>
            <Switch.Thumb />
          </Switch.Root>
          Notifications
        </label>
        <label className="flex items-center gap-2 text-sm">
          <Checkbox.Root defaultChecked>
            <Checkbox.Indicator />
          </Checkbox.Root>
          Remember me
        </label>
      </div>
    </div>
  );
}

function FeedbackRow() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <Spinner />
        <div className="w-48">
          <Progress.Root value={62}>
            <Progress.Track>
              <Progress.Indicator />
            </Progress.Track>
          </Progress.Root>
        </div>
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="highlight">Highlight</Badge>
      </div>
      <div className="flex flex-col gap-2">
        <ValidationEntry status="pass" rule="schema-valid" message="All checks pass." />
        <ValidationEntry
          status="warning"
          rule="description-length"
          message="Description exceeds recommended length."
          path="/tools/0/description"
        />
        <ValidationEntry
          status="fail"
          rule="required-field"
          message='Missing required field "inputSchema".'
          path="/tools/1"
        />
      </div>
      <div className="flex justify-center">
        <ValidationPass title="Agent card is valid" suffix=" (v0.3)" />
      </div>
    </div>
  );
}

function SurfacesRow() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <Card>
        <Card.Header>
          <Card.Title>Card title</Card.Title>
          <Card.Description>This is a card description.</Card.Description>
        </Card.Header>
        <Card.Content>
          <p className="text-sm">Cards use bg-card, text-card-foreground, and border tokens.</p>
        </Card.Content>
        <Card.Footer className="gap-2">
          <Button size="sm" variant="outline">Cancel</Button>
          <Button size="sm">Confirm</Button>
        </Card.Footer>
      </Card>

      <InfoCard>
        <InfoCard.Header>
          <InfoCard.Icon />
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <InfoCard.Title>Echo Server</InfoCard.Title>
              <Badge variant="outline" size="sm">1.0.0</Badge>
            </div>
            <InfoCard.Subtitle>mock/echo</InfoCard.Subtitle>
          </div>
        </InfoCard.Header>
        <InfoCard.Content>
          <InfoCard.Section>
            <p className="text-xs text-muted-foreground">A small auto-generated info card.</p>
          </InfoCard.Section>
        </InfoCard.Content>
      </InfoCard>

      <div className="md:col-span-2">
        <Tabs.Root defaultValue="overview">
          <Tabs.List>
            <Tabs.Tab value="overview">Overview</Tabs.Tab>
            <Tabs.Tab value="tools">Tools</Tabs.Tab>
            <Tabs.Tab value="settings">Settings</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="overview" className="pt-3 text-sm">
            Overview content. Tabs use primary/muted tokens for active state.
          </Tabs.Panel>
          <Tabs.Panel value="tools" className="pt-3 text-sm">
            Tools content.
          </Tabs.Panel>
          <Tabs.Panel value="settings" className="pt-3 text-sm">
            Settings content.
          </Tabs.Panel>
        </Tabs.Root>
      </div>

      <div className="flex flex-wrap gap-2">
        <Dialog.Root>
          <Dialog.Trigger render={<Button variant="outline">Open dialog</Button>} />
          <Dialog.Portal>
            <Dialog.Backdrop />
            <Dialog.Popup>
              <Dialog.Title>Dialog title</Dialog.Title>
              <Dialog.Description>
                The dialog reads from card/popover tokens and the overlay backdrop.
              </Dialog.Description>
              <div className="mt-6 flex justify-end gap-2">
                <Dialog.Close render={<Button variant="outline">Cancel</Button>} />
                <Dialog.Close render={<Button>Confirm</Button>} />
              </div>
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>

        <Sheet.Root>
          <Sheet.Trigger render={<Button variant="outline">Open sheet</Button>} />
          <Sheet.Portal>
            <Sheet.Backdrop />
            <Sheet.Popup side="right">
              <Sheet.Title>Sheet title</Sheet.Title>
              <Sheet.Description>Sheets slide in from a side.</Sheet.Description>
              <div className="mt-4 flex justify-end gap-2">
                <Sheet.Close render={<Button variant="outline">Close</Button>} />
              </div>
            </Sheet.Popup>
          </Sheet.Portal>
        </Sheet.Root>

        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger render={<Button variant="outline">Hover for tooltip</Button>} />
            <Tooltip.Portal>
              <Tooltip.Positioner>
                <Tooltip.Popup>
                  Tooltip uses popover tokens.
                  <Tooltip.Arrow />
                </Tooltip.Popup>
              </Tooltip.Positioner>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      </div>
    </div>
  );
}

function DataRow() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="flex items-center gap-3">
        <Avatar.Root>
          <Avatar.Image src="https://i.pravatar.cc/64?u=ord" alt="User" />
          <Avatar.Fallback>JD</Avatar.Fallback>
        </Avatar.Root>
        <Avatar.Root size="lg">
          <Avatar.Fallback>SM</Avatar.Fallback>
        </Avatar.Root>
        <Separator orientation="vertical" className="h-10" />
        <MarkdownText text="**Markdown** text with `inline code` and a [link](#)." />
      </div>

      <div className="md:col-span-2">
        <CodeBlock
          code={`function hello(name) {\n  return \`Hello, \${name}!\`;\n}`}
          language="javascript"
          showLineNumbers
        />
      </div>

      <div className="md:col-span-2">
        <HttpLogEntry
          method="POST"
          url="http://localhost:3000/mcp"
          statusCode={200}
          duration={42}
          requestBody={JSON.stringify({ jsonrpc: '2.0', method: 'initialize', id: 1 }, null, 2)}
          responseBody={JSON.stringify({ jsonrpc: '2.0', result: { ok: true }, id: 1 }, null, 2)}
        />
      </div>
    </div>
  );
}

function ComponentsGallery() {
  return (
    <main className="min-w-0 flex-1 overflow-y-auto bg-background p-6 text-foreground">
      <div className="mx-auto max-w-5xl">
        <header className="mb-6">
          <h1 className="text-2xl font-bold">Component gallery</h1>
          <p className="text-sm text-muted-foreground">
            Tweak the theme on the left — every component below updates live.
          </p>
        </header>
        <GallerySection title="Buttons">
          <ButtonsRow />
        </GallerySection>
        <GallerySection title="Forms">
          <FormsRow />
        </GallerySection>
        <GallerySection title="Feedback">
          <FeedbackRow />
        </GallerySection>
        <GallerySection title="Surfaces">
          <SurfacesRow />
        </GallerySection>
        <GallerySection title="Data display">
          <DataRow />
        </GallerySection>
      </div>
    </main>
  );
}

function ThemeEditorComposition() {
  const [state, setState] = useState<EditorState>(() => initialState('light'));
  const overrides = useMemo(() => buildOverrides(state), [state]);

  // Font lives on <html>: rem-based Tailwind sizes (text-sm = 0.875rem) only react
  // when the root font-size changes, and putting font-family here makes it cascade
  // through portaled popups too without specificity surprises. Restored on unmount.
  useEffect(() => {
    const root = document.documentElement;
    const prevSize = root.style.fontSize;
    const prevFamily = root.style.fontFamily;
    root.style.fontSize = `${state.fontSize}px`;
    root.style.fontFamily = state.fontFamily === 'inherit' ? '' : state.fontFamily;
    return () => {
      root.style.fontSize = prevSize;
      root.style.fontFamily = prevFamily;
    };
  }, [state.fontFamily, state.fontSize]);

  return (
    <ThemeRoot defaultTheme={state.mode} style={overrides}>
      <div className="flex h-screen w-screen">
        <EditorSidebar state={state} setState={setState} />
        <ComponentsGallery />
      </div>
    </ThemeRoot>
  );
}

const meta = {
  title: 'Compositions/Theme Editor',
  parameters: {
    layout: 'fullscreen',
  },
  // Disable the global ThemeRoot decorator from preview.tsx — this composition supplies its own.
  decorators: [(Story) => <Story />],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <ThemeEditorComposition />,
};
