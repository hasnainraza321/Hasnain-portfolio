import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContainerElement = "div" | "section" | "header" | "footer" | "nav";

export type ContainerProps<T extends ContainerElement = "div"> = {
  readonly as?: T;
  readonly children: ReactNode;
  readonly className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

/**
 * Reusable layout container providing consistent max-width (`max-w-7xl`)
 * and responsive horizontal padding without unnecessary wrapper nesting.
 */
export function Container<T extends ContainerElement = "div">({
  as,
  children,
  className,
  ...props
}: ContainerProps<T>) {
  const Component: ElementType = as ?? "div";

  return (
    <Component
      className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}
      {...props}
    >
      {children}
    </Component>
  );
}

