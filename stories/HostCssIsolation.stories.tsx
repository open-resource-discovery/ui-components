import type { CSSProperties } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../src/components/button";
import { Card } from "../src/components/card";
import { Input } from "../src/components/input";
import { ThemeRoot } from "../src/theme/ThemeRoot";
import { Tooltip } from "../src/components/tooltip";

const hostileHostCss = `
  :where(.host-page) * { box-sizing: content-box; }
  :where(.host-page) { color: #581c87; font-family: Georgia, serif; }
  :where(.host-page) h2, :where(.host-page) h3 { color: #be123c; font-size: 2.5rem; line-height: 1; margin: 1.5rem 0; }
  :where(.host-page) p { color: #7e22ce; font-size: 1.125rem; margin: 0 0 1.5rem; }
  :where(.host-page) button, :where(.host-page) input { background: #fef08a; border: 4px dashed #be123c; color: #581c87; font: inherit; padding: 1rem; }
  :where(.host-page) .container { max-width: 20rem; padding: 2rem; }
  :where(.host-page) .flex { display: block; }
  :where(.host-page) .hidden { display: block; }
`;

const brandOverrides = {
  "--ord-primary": "oklch(0.55 0.2 260)",
  "--ord-primary-foreground": "white",
  "--ord-ring": "oklch(0.55 0.2 260)",
  "--ord-tooltip-bg": "oklch(0.45 0.2 260)",
  "--ord-tooltip-fg": "white",
} as CSSProperties;

function HostCssIsolation(): React.JSX.Element {
  return (
    <>
      <style>{hostileHostCss}</style>
      <main className="host-page">
        <section className="container">
          <h2>Host site</h2>
          <p>This native content intentionally keeps the host site's conspicuous styling.</p>
          <button type="button">Host button</button>
        </section>

        <ThemeRoot defaultTheme="light" style={brandOverrides}>
          <div className="p-8">
            <Card className="max-w-xl">
              <Card.Header>
                <Card.Title>Isolated ORD components</Card.Title>
                <Card.Description>
                  Host element rules and generic utility names cannot replace these defaults.
                </Card.Description>
              </Card.Header>
              <Card.Content className="space-y-4">
                <Input aria-label="Example input" placeholder="Host input styles are neutralized" />
                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", margin: "10px 0px" }}>
                  <Button>Default button</Button>
                  <Button className="h-12 rounded-full px-8">Consumer utility override</Button>
                </div>
                <Tooltip.Provider>
                  <Tooltip.Root open>
                    <Tooltip.Trigger render={<Button variant="outline">Portaled token example</Button>} />
                    <Tooltip.Portal>
                      <Tooltip.Positioner side="right" sideOffset={12}>
                        <Tooltip.Popup>
                          This popup inherits the ThemeRoot token overrides.
                          <Tooltip.Arrow />
                        </Tooltip.Popup>
                      </Tooltip.Positioner>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                </Tooltip.Provider>
              </Card.Content>
            </Card>
          </div>
        </ThemeRoot>
      </main>
    </>
  );
}

const meta = {
  title: "Compositions/Host CSS Isolation",
  parameters: {
    layout: "fullscreen",
    disableThemeRoot: true,
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <HostCssIsolation />,
};
