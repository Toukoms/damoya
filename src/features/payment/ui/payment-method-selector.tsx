"use client";

import { PaymentMethod } from "@/src/entities/payment/model/types";
import { PaymentCardIcon } from "@/src/entities/payment/ui/payment-card-icon";
import { Button } from "@/src/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/shared/ui/card";
import { Input } from "@/src/shared/ui/input";
import { Label } from "@/src/shared/ui/label";
import { RadioGroup, RadioGroupItem } from "@/src/shared/ui/radio-group";
import { cn } from "@shared/lib";
import { Plus } from "lucide-react";
import { useState } from "react";

export interface NewCardData {
  cardNumber: string;
  holderName: string;
  expiry: string;
  cvc: string;
}

interface PaymentMethodSelectorProps {
  savedCards: PaymentMethod[];
  onSelect?: (methodId: string) => void;
  onAddCard?: (card: NewCardData) => void;
  className?: string;
}

export function PaymentMethodSelector({
  savedCards,
  onSelect,
  onAddCard,
  className,
}: PaymentMethodSelectorProps) {
  const [selectedId, setSelectedId] = useState<string>(
    savedCards.find((c) => c.isDefault)?.id || savedCards[0]?.id || "add_new",
  );

  // New Card Form State
  const [newCard, setNewCard] = useState<NewCardData>({
    cardNumber: "",
    holderName: "",
    expiry: "",
    cvc: "",
  });

  const handleValueChange = (value: string) => {
    if (value === "add_new") {
      setSelectedId("add_new");
    } else {
      setSelectedId(value);
      onSelect?.(value);
    }
  };

  const handleAddCardSubmit = () => {
    if (onAddCard) {
      onAddCard(newCard);
    }
  };

  return (
    <Card
      className={cn(
        "w-full max-w-2xl border-none shadow-none bg-transparent",
        className,
      )}
    >
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-xl font-bold">
          Vos moyens de paiement
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <RadioGroup
          value={selectedId}
          onValueChange={handleValueChange}
          className="flex flex-col gap-4"
        >
          {/* Saved Cards */}
          {savedCards.map((card) => (
            <div
              key={card.id}
              className={cn(
                "relative flex items-start space-x-4 rounded-lg border p-4 transition-colors",
                selectedId === card.id
                  ? "border-ring bg-accent/10 ring-1 ring-ring"
                  : "border-input hover:bg-accent/5 hover:text-accent-foreground",
              )}
            >
              <RadioGroupItem value={card.id} id={card.id} className="mt-1" />
              <div className="flex-1 space-y-1">
                <Label
                  htmlFor={card.id}
                  className="flex w-full cursor-pointer items-center justify-between font-normal"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-base">
                      {card.cardType === "visa"
                        ? "Visa"
                        : card.cardType === "mastercard"
                          ? "Mastercard"
                          : "American Express"}
                    </span>
                    <span className="text-muted-foreground">
                      se terminant par {card.last4}
                    </span>
                  </div>
                  <PaymentCardIcon
                    type={card.cardType}
                    className="h-6 w-10 text-muted-foreground"
                  />
                </Label>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{card.holderName}</span>
                  <span>Exp: {card.expiry}</span>
                </div>
                {card.isDefault && (
                  <span className="inline-block mt-2 text-xs text-primary font-medium">
                    Mode de paiement par défaut
                  </span>
                )}
              </div>
            </div>
          ))}

          {/* Add New Card Option */}
          <div
            className={cn(
              "relative flex flex-col space-y-4 rounded-lg border p-4 transition-colors",
              selectedId === "add_new"
                ? "border-ring bg-accent/10 ring-1 ring-ring"
                : "border-input hover:bg-accent/5 hover:text-accent-foreground",
            )}
          >
            <div className="flex items-center space-x-4">
              <RadioGroupItem value="add_new" id="add_new" className="mt-1" />
              <Label
                htmlFor="add_new"
                className="flex cursor-pointer items-center gap-2 font-semibold text-base"
              >
                <Plus className="h-4 w-4" />
                Ajouter une carte de crédit ou de débit
              </Label>
            </div>

            {/* Expanded Form */}
            {selectedId === "add_new" && (
              <div className="mt-4 grid gap-4 pl-9 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="grid gap-2">
                  <Label htmlFor="cardNumber">Numéro de carte</Label>
                  <Input
                    id="cardNumber"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="cc-number"
                    placeholder="0000 0000 0000 0000"
                    value={newCard.cardNumber}
                    onChange={(e) =>
                      setNewCard({ ...newCard, cardNumber: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="name">Nom sur la carte</Label>
                  <Input
                    id="name"
                    autoComplete="cc-name"
                    placeholder="Jean Dupont"
                    value={newCard.holderName}
                    onChange={(e) =>
                      setNewCard({ ...newCard, holderName: e.target.value })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="expiry">Date d&apos;expiration</Label>
                    <Input
                      id="expiry"
                      type="tel"
                      inputMode="numeric"
                      autoComplete="cc-exp"
                      placeholder="MM/AA"
                      value={newCard.expiry}
                      onChange={(e) =>
                        setNewCard({ ...newCard, expiry: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input
                      id="cvc"
                      type="tel"
                      inputMode="numeric"
                      autoComplete="cc-csc"
                      placeholder="123"
                      value={newCard.cvc}
                      onChange={(e) =>
                        setNewCard({ ...newCard, cvc: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="flex justify-end pt-2">
                  <Button onClick={handleAddCardSubmit}>
                    Ajouter votre carte
                  </Button>
                </div>
              </div>
            )}
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
