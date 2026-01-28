import { cn } from "@/src/shared/lib/tailwind";

interface PriceProps {
  amount: number;
  currency?: string;
  locale?: string;
  variant?: "default" | "split";
  className?: string;
  currencyClassName?: string;
  integerClassName?: string;
  decimalClassName?: string;
}

export const Price = ({
  amount,
  currency = "EUR",
  locale = "fr-FR",
  variant = "default",
  className,
  currencyClassName,
  integerClassName,
  decimalClassName,
}: PriceProps) => {
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  });

  if (variant === "split") {
    const parts = formatter.formatToParts(amount);
    const currencySymbol = parts.find((p) => p.type === "currency")?.value;
    const integerPart = parts
      .filter((p) => p.type === "integer" || p.type === "group")
      .map((p) => p.value)
      .join("");
    const decimalPart = parts.find((p) => p.type === "fraction")?.value;

    return (
      <div className={cn("flex items-baseline", className)}>
        <span
          className={cn(
            "text-xl align-top relative top-[0.1em] font-medium",
            currencyClassName,
          )}
        >
          {currencySymbol}
        </span>
        <span
          className={cn("text-2xl font-medium leading-none", integerClassName)}
        >
          {integerPart}
        </span>
        <span
          className={cn(
            "text-xs align-top relative top-[0.1em] font-medium",
            decimalClassName,
          )}
        >
          {decimalPart}
        </span>
      </div>
    );
  }

  return <span className={className}>{formatter.format(amount)}</span>;
};
