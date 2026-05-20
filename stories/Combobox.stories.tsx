import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Combobox } from '../src/components/combobox';
import { SimpleCombobox } from '../src/components/combobox';

const meta = {
  title: 'Components/Combobox',
  component: Combobox.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Combobox.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

const fruits = ['Apple', 'Banana', 'Cherry', 'Grape', 'Kiwi', 'Mango', 'Orange', 'Peach', 'Pear', 'Strawberry'];

function ComboboxExample() {
  const [inputValue, setInputValue] = useState('');
  const filteredFruits = fruits.filter((fruit) =>
    fruit.toLowerCase().includes(inputValue.toLowerCase()),
  );

  return (
    <div style={{ width: 240 }}>
      <Combobox.Root onInputValueChange={(value: string) => setInputValue(value)}>
        <Combobox.Input placeholder="Search fruits..." />
        <Combobox.Portal>
          <Combobox.Positioner>
            <Combobox.Popup>
              {filteredFruits.length === 0 ? (
                <Combobox.Empty>No fruits found.</Combobox.Empty>
              ) : (
                filteredFruits.map((fruit) => (
                  <Combobox.Item key={fruit} value={fruit}>
                    <Combobox.ItemIndicator />
                    {fruit}
                  </Combobox.Item>
                ))
              )}
            </Combobox.Popup>
          </Combobox.Positioner>
        </Combobox.Portal>
      </Combobox.Root>
    </div>
  );
}

export const Default: Story = {
  render: () => <ComboboxExample />,
};

export const WithPlaceholder: Story = {
  render: () => (
    <div style={{ width: 240 }}>
      <Combobox.Root>
        <Combobox.Input placeholder="Type to search..." />
        <Combobox.Portal>
          <Combobox.Positioner>
            <Combobox.Popup>
              {fruits.map((fruit) => (
                <Combobox.Item key={fruit} value={fruit}>
                  <Combobox.ItemIndicator />
                  {fruit}
                </Combobox.Item>
              ))}
            </Combobox.Popup>
          </Combobox.Positioner>
        </Combobox.Portal>
      </Combobox.Root>
    </div>
  ),
};

const fruitItems = fruits.map((f) => ({ value: f.toLowerCase(), label: f }));

export const Simple: Story = {
  render: () => (
    <div style={{ width: 240 }}>
      <SimpleCombobox
        items={fruitItems}
        placeholder="Pick a fruit..."
        maxVisibleItems={5}
      />
    </div>
  ),
};
