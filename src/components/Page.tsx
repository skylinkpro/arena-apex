import { cn } from "@/lib/utils";

interface PageProps {
  children: React.ReactNode;
  className?: string;
  /** Skip top padding (e.g. when hero is full-bleed) */
  noPadTop?: boolean;
}

export default function Page({ children, className, noPadTop }: PageProps) {
  return (
    <div
      className={cn(
        "w-full min-h-screen",
        !noPadTop && "pt-[var(--navbar-h)]",
        className
      )}
    >
      {children}
    </div>
  );
}
