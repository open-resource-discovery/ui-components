import {
  forwardRef,
  useRef,
  useCallback,
  type ComponentPropsWithoutRef,
  type KeyboardEvent,
} from 'react';
import { cn } from '@/utils/cn';
import { Button } from '@/components/button';

export type ChatInputProps = Omit<ComponentPropsWithoutRef<'form'>, 'onSubmit'> & {
  onSubmit?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  onCancel?: () => void;
};

export const ChatInput = forwardRef<HTMLFormElement, ChatInputProps>(
  (
    {
      onSubmit,
      placeholder = 'Type a message...',
      disabled,
      loading,
      onCancel,
      className,
      ...props
    },
    ref,
  ) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const resetHeight = useCallback(() => {
      const el = textareaRef.current;
      if (el) {
        el.style.height = 'auto';
        el.style.height = '40px';
      }
    }, []);

    const handleInput = useCallback(() => {
      const el = textareaRef.current;
      if (el) {
        el.style.height = 'auto';
        el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
      }
    }, []);

    const handleSubmit = useCallback(
      (e?: React.FormEvent) => {
        e?.preventDefault();
        const el = textareaRef.current;
        if (!el) return;
        const value = el.value.trim();
        if (!value) return;
        onSubmit?.(value);
        el.value = '';
        resetHeight();
      },
      [onSubmit, resetHeight],
    );

    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleSubmit();
        }
      },
      [handleSubmit],
    );

    return (
      <form
        ref={ref}
        className={cn('border-t border-border p-3 flex items-end gap-2', className)}
        onSubmit={handleSubmit}
        {...props}
      >
        <textarea
          ref={textareaRef}
          rows={1}
          placeholder={placeholder}
          disabled={disabled || loading}
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          className="flex-1 resize-none bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none min-h-[40px] max-h-[120px] py-2.5"
        />
        {loading ? (
          <Button type="button" variant="ghost" size="icon" onClick={onCancel} aria-label="Stop">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <rect x="6" y="6" width="12" height="12" rx="2" />
            </svg>
          </Button>
        ) : (
          <Button type="submit" variant="ghost" size="icon" disabled={disabled} aria-label="Send">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 19V5" />
              <path d="m5 12 7-7 7 7" />
            </svg>
          </Button>
        )}
      </form>
    );
  },
);
ChatInput.displayName = 'ChatInput';
