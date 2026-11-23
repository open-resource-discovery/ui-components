import React, { type ComponentPropsWithoutRef, forwardRef, type ReactNode } from "react";
import { cn } from "@/utils/cn";
import { Card } from "./Card";

export interface SimpleCardProps extends Omit<ComponentPropsWithoutRef<"div">, "title" | "content"> {
  title?: ReactNode;
  description?: ReactNode;
  content?: ReactNode;
  buttons?: ReactNode;
}

export const SimpleCard = forwardRef<HTMLDivElement, SimpleCardProps>(
  ({ title, description, content, buttons, className, ...props }, ref): React.JSX.Element => (
    <Card ref={ref} className={cn(className)} {...props}>
      {(title || description) && (
        <Card.Header>
          {title && <Card.Title>{title}</Card.Title>}
          {description && <Card.Description>{description}</Card.Description>}
        </Card.Header>
      )}
      {content && <Card.Content>{content}</Card.Content>}
      {buttons && <Card.Footer>{buttons}</Card.Footer>}
    </Card>
  ),
);
SimpleCard.displayName = "SimpleCard";
