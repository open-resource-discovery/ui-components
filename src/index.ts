import "./styles/base.css";

export { ThemeRoot, usePortalContainer } from "./theme/ThemeRoot";
export { useTheme } from "./theme/useTheme";
export { cn } from "./utils/cn";

// Form Components
export { Button, buttonVariants } from "./components/button";
export type { ButtonProps } from "./components/button";

export { Input } from "./components/input";
export type { InputProps } from "./components/input";

export { Textarea } from "./components/textarea";
export type { TextareaProps } from "./components/textarea";

export { PasswordInput } from "./components/password-input";
export type { PasswordInputProps } from "./components/password-input";

export { Checkbox } from "./components/checkbox";
export type { CheckboxProps } from "./components/checkbox";

export { RadioGroup } from "./components/radio-group";
export type { RadioGroupProps } from "./components/radio-group";

export { Field } from "./components/field";
export type { FieldRootProps, FieldLabelProps, FieldDescriptionProps, FieldErrorProps } from "./components/field";

// Complex Form Components
export { Combobox } from "./components/combobox";
export type {
  ComboboxRootProps,
  ComboboxInputProps,
  ComboboxPortalProps,
  ComboboxPositionerProps,
  ComboboxPopupProps,
  ComboboxItemProps,
  ComboboxItemIndicatorProps,
  ComboboxEmptyProps,
  ComboboxGroupProps,
  ComboboxGroupLabelProps,
} from "./components/combobox";

export { SimpleCombobox } from "./components/combobox";
export type { SimpleComboboxProps, ComboboxItem } from "./components/combobox";

export { Select } from "./components/select";
export type {
  SelectRootProps,
  SelectTriggerProps,
  SelectValueProps,
  SelectIconProps,
  SelectPortalProps,
  SelectPositionerProps,
  SelectPopupProps,
  SelectItemProps,
  SelectItemIndicatorProps,
  SelectItemTextProps,
  SelectGroupProps,
  SelectGroupLabelProps,
  SelectScrollUpArrowProps,
  SelectScrollDownArrowProps,
} from "./components/select";

export { SimpleSelect } from "./components/select";
export type { SimpleSelectProps, SelectItem, SelectGroup } from "./components/select";

export { Switch } from "./components/switch";
export type { SwitchRootProps, SwitchThumbProps } from "./components/switch";

// Overlay Components
export { Dialog } from "./components/dialog";
export type {
  DialogRootProps,
  DialogTriggerProps,
  DialogPortalProps,
  DialogBackdropProps,
  DialogPopupProps,
  DialogTitleProps,
  DialogDescriptionProps,
  DialogCloseProps,
} from "./components/dialog";

export { SimpleDialog } from "./components/dialog";
export type { SimpleDialogProps } from "./components/dialog";

export { Sheet, sheetPopupVariants } from "./components/sheet";
export type {
  SheetRootProps,
  SheetTriggerProps,
  SheetPortalProps,
  SheetBackdropProps,
  SheetPopupProps,
  SheetTitleProps,
  SheetDescriptionProps,
  SheetCloseProps,
} from "./components/sheet";

export { SimpleSheet } from "./components/sheet";
export type { SimpleSheetProps } from "./components/sheet";

// Layout Components
export { Card } from "./components/card";
export type {
  CardRootProps,
  CardHeaderProps,
  CardTitleProps,
  CardDescriptionProps,
  CardContentProps,
  CardFooterProps,
} from "./components/card";

export { SimpleCard } from "./components/card";
export type { SimpleCardProps } from "./components/card";

export { Tabs } from "./components/tabs";
export type { TabsRootProps, TabsListProps, TabsTabProps, TabsPanelProps, TabsIndicatorProps } from "./components/tabs";

export { Separator } from "./components/separator";
export type { SeparatorProps } from "./components/separator";

// Display Components
export { Badge, badgeVariants } from "./components/badge";
export type { BadgeProps } from "./components/badge";

export { Tooltip } from "./components/tooltip";
export type {
  TooltipProviderProps,
  TooltipRootProps,
  TooltipTriggerProps,
  TooltipPortalProps,
  TooltipPositionerProps,
  TooltipPopupProps,
  TooltipArrowProps,
} from "./components/tooltip";

export { Avatar } from "./components/avatar";
export type { AvatarRootProps, AvatarImageProps, AvatarFallbackProps } from "./components/avatar";

// Feedback Components
export { Progress } from "./components/progress";
export type { ProgressRootProps, ProgressTrackProps, ProgressIndicatorProps } from "./components/progress";

export { Spinner, spinnerVariants } from "./components/spinner";
export type { SpinnerProps } from "./components/spinner";

// Composite Components
export { ConnectionCard } from "./components/connection-card";
export type {
  ConnectionCardRootProps,
  ConnectionCardHeaderProps,
  ConnectionCardTitleProps,
  ConnectionCardDescriptionProps,
  ConnectionCardTagsProps,
} from "./components/connection-card";

export { InfoCard } from "./components/info-card";
export type {
  InfoCardRootProps,
  InfoCardHeaderProps,
  InfoCardIconProps,
  InfoCardTitleProps,
  InfoCardSubtitleProps,
  InfoCardContentProps,
  InfoCardSectionProps,
} from "./components/info-card";

export { CollapsibleSection } from "./components/collapsible-section";
export type {
  CollapsibleSectionRootProps,
  CollapsibleSectionTriggerProps,
  CollapsibleSectionContentProps,
} from "./components/collapsible-section";

export { SectionCard } from "./components/section-card";
export type { SectionCardRootProps, SectionCardHeaderProps, SectionCardContentProps } from "./components/section-card";

export { MarkdownText } from "./components/markdown-text";
export type { MarkdownTextProps } from "./components/markdown-text";

// Chat Components
export { ChatMessage } from "./components/chat-message";
export type { ChatMessageProps } from "./components/chat-message";

export { ChatInput } from "./components/chat-input";
export type { ChatInputProps } from "./components/chat-input";

export { TypingIndicator } from "./components/typing-indicator";
export type { TypingIndicatorProps } from "./components/typing-indicator";

export { ScrollArea } from "./components/scroll-area";
export type { ScrollAreaProps } from "./components/scroll-area";

export { HttpLogEntry } from "./components/http-log-entry";
export type { HttpLogEntryProps } from "./components/http-log-entry";

export { CodeBlock } from "./components/code-block";
export type { CodeBlockProps } from "./components/code-block";

// Layout Components
export { SplitPane } from "./components/split-pane";
export type { SplitPaneRootProps, SplitPanelProps, SplitPaneHandleProps } from "./components/split-pane";

export { ValidationEntry } from "./components/validation-entry";
export type { ValidationEntryProps, ValidationStatus } from "./components/validation-entry";

export { CodeEditor } from "./components/code-editor";
export type { CodeEditorProps } from "./components/code-editor";
