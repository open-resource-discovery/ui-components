import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { Avatar as BaseAvatar } from "@base-ui/react/avatar";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

/* ----- Root ----- */
const avatarRootVariants = cva("relative inline-flex shrink-0 overflow-hidden rounded-full", {
  variants: {
    size: {
      sm: "h-8 w-8",
      default: "h-10 w-10",
      lg: "h-12 w-12",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export type AvatarRootProps = ComponentPropsWithoutRef<typeof BaseAvatar.Root> &
  VariantProps<typeof avatarRootVariants>;

const AvatarRoot = forwardRef<HTMLSpanElement, AvatarRootProps>(({ className, size, ...props }, ref) => (
  <BaseAvatar.Root ref={ref} className={cn(avatarRootVariants({ size, className }))} {...props} />
));
AvatarRoot.displayName = "Avatar.Root";

/* ----- Image ----- */
export type AvatarImageProps = ComponentPropsWithoutRef<typeof BaseAvatar.Image>;

const AvatarImage = forwardRef<HTMLImageElement, AvatarImageProps>(({ className, ...props }, ref) => (
  <BaseAvatar.Image ref={ref} className={cn("aspect-square h-full w-full object-cover", className)} {...props} />
));
AvatarImage.displayName = "Avatar.Image";

/* ----- Fallback ----- */
export type AvatarFallbackProps = ComponentPropsWithoutRef<typeof BaseAvatar.Fallback>;

const AvatarFallback = forwardRef<HTMLSpanElement, AvatarFallbackProps>(({ className, ...props }, ref) => (
  <BaseAvatar.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-avatar-fallback-bg text-avatar-fallback-fg text-sm font-medium",
      className,
    )}
    {...props}
  />
));
AvatarFallback.displayName = "Avatar.Fallback";

/* ----- Namespace Export ----- */
export const Avatar = Object.assign(
  {},
  {
    Root: AvatarRoot,
    Image: AvatarImage,
    Fallback: AvatarFallback,
  },
);
