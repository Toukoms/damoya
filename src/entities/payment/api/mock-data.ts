import { PaymentMethod } from "../model/types";

export const MOCK_SAVED_CARDS: PaymentMethod[] = [
  {
    id: "card_1",
    type: "card",
    cardType: "visa",
    last4: "4242",
    expiry: "12/26",
    holderName: "Jean Dupont",
    isDefault: true,
  },
  {
    id: "card_2",
    type: "card",
    cardType: "mastercard",
    last4: "8888",
    expiry: "09/25",
    holderName: "Jean Dupont",
    isDefault: false,
  },
];
