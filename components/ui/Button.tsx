import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "white" | "whatsapp";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-orange-500 text-navy-950 shadow-button hover:bg-orange-400 hover:-translate-y-0.5 active:translate-y-0 active:bg-orange-600",
  secondary:
    "bg-navy-700 text-white shadow-soft hover:bg-navy-800 hover:-translate-y-0.5 active:translate-y-0",
  outline:
    "border border-navy-200 bg-white text-navy-800 hover:border-navy-300 hover:bg-navy-50",
  ghost: "text-navy-700 hover:bg-navy-50",
  white: "bg-white text-navy-800 shadow-soft hover:bg-navy-50 hover:-translate-y-0.5",
  whatsapp: "bg-[#0f7440] text-white shadow-soft hover:bg-[#0b5f34] hover:-translate-y-0.5",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-6 text-[0.95rem] sm:px-7",
};

type Common = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  fullWidth?: boolean;
};

type ButtonProps = Common &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

type LinkProps = Common &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children" | "href"> & {
    href: string;
  };

export type Props = ButtonProps | LinkProps;

export function Button(props: Props) {
  const { variant = "primary", size = "md", className, children, fullWidth } = props;
  const classes = cn(
    base,
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    className,
  );

  if ("href" in props && props.href) {
    const {
      href,
      variant: _variant,
      size: _size,
      className: _className,
      children: _children,
      fullWidth: _fullWidth,
      ...rest
    } = props;
    void _variant;
    void _size;
    void _className;
    void _children;
    void _fullWidth;

    const external = /^(https?:|tel:|mailto:)/.test(href);
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          {...rest}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const {
    variant: _variant,
    size: _size,
    className: _className,
    children: _children,
    fullWidth: _fullWidth,
    ...rest
  } = props as ButtonProps;
  void _variant;
  void _size;
  void _className;
  void _children;
  void _fullWidth;

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
