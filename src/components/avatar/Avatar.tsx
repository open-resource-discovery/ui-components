import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { Avatar as BaseAvatar } from "@base-ui/react/avatar";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

/* ----- Root ----- */
const avatarRootVariants = cva("ordu:relative ordu:inline-flex ordu:shrink-0 ordu:overflow-hidden ordu:rounded-full", {
  variants: {
    size: {
      sm: "ordu:h-8 ordu:w-8",
      default: "ordu:h-10 ordu:w-10",
      lg: "ordu:h-12 ordu:w-12",
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
  <BaseAvatar.Image
    ref={ref}
    className={cn("ordu:aspect-square ordu:h-full ordu:w-full ordu:object-cover", className)}
    {...props}
  />
));
AvatarImage.displayName = "Avatar.Image";

/* ----- Fallback ----- */
export type AvatarFallbackProps = ComponentPropsWithoutRef<typeof BaseAvatar.Fallback>;

const AvatarFallback = forwardRef<HTMLSpanElement, AvatarFallbackProps>(({ className, ...props }, ref) => (
  <BaseAvatar.Fallback
    ref={ref}
    className={cn(
      "ordu:flex ordu:h-full ordu:w-full ordu:items-center ordu:justify-center ordu:rounded-full ordu:bg-avatar-fallback-bg ordu:text-avatar-fallback-fg ordu:text-sm ordu:font-medium",
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
