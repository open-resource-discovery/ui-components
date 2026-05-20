import React, { forwardRef, useState, useMemo, type ComponentPropsWithoutRef } from "react";
import { Combobox } from "./Combobox";
import { cn } from "@/utils/cn";

export interface ComboboxItem {
  value: string;
  label: string;
}

export interface SimpleComboboxProps extends Omit<ComponentPropsWithoutRef<"div">, "onChange"> {
  items: ComboboxItem[];
  placeholder?: string;
  maxVisibleItems?: number;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

export const SimpleCombobox = forwardRef<HTMLDivElement, SimpleComboboxProps>(
  (
    { items, placeholder, maxVisibleItems = 8, value, defaultValue, onChange, disabled, className, ...props },
    ref,
  ): React.JSX.Element => {
    const [inputValue, setInputValue] = useState("");

    const filteredItems = useMemo(
      (): ComboboxItem[] => items.filter((item) => item.label.toLowerCase().includes(inputValue.toLowerCase())),
      [items, inputValue],
    );

    const maxHeight = `${maxVisibleItems * 36}px`;

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        <Combobox.Root
          value={value}
          defaultValue={defaultValue}
          onValueChange={(val) => {
            onChange?.(val as string);
          }}
          onInputValueChange={(val) => {
            setInputValue(val);
          }}
          disabled={disabled}>
          <Combobox.Input placeholder={placeholder} />
          <Combobox.Portal>
            <Combobox.Positioner>
              <Combobox.Popup className="overflow-y-auto" style={{ maxHeight }}>
                {filteredItems.length === 0 ? (
                  <Combobox.Empty>No results</Combobox.Empty>
                ) : (
                  filteredItems.map((item) => (
                    <Combobox.Item key={item.value} value={item.value}>
                      <Combobox.ItemIndicator />
                      {item.label}
                    </Combobox.Item>
                  ))
                )}
              </Combobox.Popup>
            </Combobox.Positioner>
          </Combobox.Portal>
        </Combobox.Root>
      </div>
    );
  },
);
SimpleCombobox.displayName = "SimpleCombobox";
