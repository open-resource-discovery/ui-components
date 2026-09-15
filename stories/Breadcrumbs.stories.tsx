import type { Meta, StoryObj } from '@storybook/react-vite';
import { Breadcrumbs } from '../src/components/breadcrumbs';
import { ThemeRoot } from '../src/theme/ThemeRoot';

const meta = {
  title: 'Metadata UI/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Breadcrumb',
    items: [
      { label: 'Products', href: '/products' },
      { label: 'Customer Order', href: '/products/customer-order' },
      { label: 'Order API' },
    ],
  },
};

export const WithLinkRenderer: Story = {
  args: {
    label: 'Breadcrumb',
    // In an app this is `(props) => <Link href={item.href!} {...props} />`.
    linkRender: (props) => <a href="#" {...props} />,
    items: [
      { label: 'Landscapes', href: '#' },
      { label: 'Canary', href: '#' },
      { label: 'Overview' },
    ],
  },
};

export const Collapsed: Story = {
  args: {
    label: 'Breadcrumb',
    maxItems: 3,
    collapseLabel: 'Show hidden levels',
    items: [
      { label: 'Products', href: '#' },
      { label: 'Sales', href: '#' },
      { label: 'Customer Order', href: '#' },
      { label: 'APIs', href: '#' },
      { label: 'Order API' },
    ],
  },
};

export const DarkMode: Story = {
  parameters: { disableThemeRoot: true, backgrounds: { value: 'dark' } },
  render: () => (
    <ThemeRoot defaultTheme="dark" style={{ padding: 24 }}>
      <Breadcrumbs
        label="Breadcrumb"
        items={[
          { label: 'Products', href: '#' },
          { label: 'Customer Order', href: '#' },
          { label: 'Order API' },
        ]}
      />
    </ThemeRoot>
  ),
};
