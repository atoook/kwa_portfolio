import React from "react";
import clsx from "clsx";

type BoundedProps = React.HTMLAttributes<HTMLElement> & {
  as?: "section" | "article" | "footer" | "div";
  className?: string;
  children: React.ReactNode;
  ref?: React.Ref<HTMLElement>;
};

export default function Bounded({
  as: Comp = "section",
  className,
  children,
  ref,
  ...restProps
}: BoundedProps) {
  return (
    <Comp
      ref={ref as React.Ref<HTMLDivElement>}
      className={clsx("px-4 py-10 md:px-6 md:py-14 lg:py-16", className)}
      {...restProps}
    >
      <div className="mx-auto w-full max-w-7xl">{children}</div>
    </Comp>
  );
}
