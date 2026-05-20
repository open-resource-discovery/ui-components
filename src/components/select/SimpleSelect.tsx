import React, { forwardRef, useMemo, type ComponentPropsWithoutRef } from "react";
import { Select } from "./Select";
import { cn } from "@/utils/cn";

export interface SelectItem {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectGroup {
  label: string;
  items: SelectItem[];
}

export interface SimpleSelectProps extends Omit<ComponentPropsWithoutRef<"div">, "onChange"> {
  items: (SelectItem | SelectGroup)[];
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

function isGroup(item: SelectItem | SelectGroup): item is SelectGroup {
  return "items" in item;
}

export const SimpleSelect = forwardRef<HTMLDivElement, SimpleSelectProps>(
  ({ items, placeholder, value, defaultValue, onChange, disabled, className, ...props }, ref): React.JSX.Element => {
    const itemsMap = useMemo((): Record<string, string> => {
      const map: Record<string, string> = {};
      for (const item of items) {
        if (isGroup(item)) {
          for (const groupItem of item.items) {
            map[groupItem.value] = groupItem.label;
          }
        } else {
          map[item.value] = item.label;
        }
      }
      return map;
    }, [items]);

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        <Select.Root
          value={value}
          defaultValue={defaultValue}
          onValueChange={(val) => {
            onChange?.(val as string);
          }}
          disabled={disabled}
          items={itemsMap}>
          <Select.Trigger>
            <Select.Value placeholder={placeholder} />
            <Select.Icon />
          </Select.Trigger>
          <Select.Portal>
            <Select.Positioner>
              <Select.Popup>
                <Select.ScrollUpArrow />
                {items.map((item) =>
                  isGroup(item) ? (
                    <Select.Group key={item.label}>
                      <Select.GroupLabel>{item.label}</Select.GroupLabel>
                      {item.items.map((groupItem) => (
                        <Select.Item key={groupItem.value} value={groupItem.value} disabled={groupItem.disabled}>
                          <Select.ItemIndicator />
                          <Select.ItemText>{groupItem.label}</Select.ItemText>
                        </Select.Item>
                      ))}
                    </Select.Group>
                  ) : (
                    <Select.Item key={item.value} value={item.value} disabled={item.disabled}>
                      <Select.ItemIndicator />
                      <Select.ItemText>{item.label}</Select.ItemText>
                    </Select.Item>
                  ),
                )}
                <Select.ScrollDownArrow />
              </Select.Popup>
            </Select.Positioner>
          </Select.Portal>
        </Select.Root>
      </div>
    );
  },
);
SimpleSelect.displayName = "SimpleSelect";
