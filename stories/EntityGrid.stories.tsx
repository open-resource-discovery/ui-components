import type { Meta, StoryObj } from '@storybook/react-vite';
import { EntityGrid } from '../src/components/entity-grid';
import { EntityCard } from '../src/components/entity-card';
import { EmptyState } from '../src/components/empty-state';

const meta = {
  title: 'Metadata UI/EntityGrid',
  component: EntityGrid,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof EntityGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

interface Resource {
  id: string;
  kind: string;
  title: string;
  version: string;
}

const resources: Resource[] = [
  { id: '1', kind: 'API Resource', title: 'Sales Order API', version: 'v1' },
  { id: '2', kind: 'Event Resource', title: 'Order Changed', version: 'v2' },
  { id: '3', kind: 'Entity Type', title: 'Business Partner', version: 'v1' },
  { id: '4', kind: 'API Resource', title: 'Product Catalog API', version: 'v3' },
];

export const WithItems: StoryObj = {
  render: () => (
    <EntityGrid<Resource>
      items={resources}
      renderCount={(n) => `${n} resources`}
      renderItem={(r) => <EntityCard kind={r.kind} title={r.title} version={r.version} href="#" />}
    />
  ),
};

export const Empty: StoryObj = {
  render: () => (
    <EntityGrid<Resource>
      items={[]}
      renderCount={(n) => `${n} resources`}
      empty={<EmptyState title="No resources found" description="Try adjusting your filters." />}
      renderItem={(r) => <EntityCard kind={r.kind} title={r.title} href="#" />}
    />
  ),
};

export const WithChildren: StoryObj = {
  render: () => (
    <EntityGrid items={resources} renderCount={(n) => `${n} items`}>
      {resources.map((r) => (
        <EntityCard key={r.id} kind={r.kind} title={r.title} version={r.version} />
      ))}
    </EntityGrid>
  ),
};
