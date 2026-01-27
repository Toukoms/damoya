export type CardType = "visa" | "mastercard" | "amex";

export interface PaymentMethod {
  id: string;
  type: "card";
  cardType: CardType;
  last4: string;
  expiry: string; // MM/YY
  holderName: string;
  isDefault?: boolean;
}
