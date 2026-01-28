"use client";

import { useOrder } from "@/src/entities/order";
import { MOCK_SAVED_CARDS } from "@/src/entities/payment/api/mock-data";
import {
  PaymentMethodSelector,
  type NewCardData,
} from "@/src/features/payment";
import { MainWrapper, Price } from "@/src/shared/ui";
import { Button } from "@/src/shared/ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function CheckoutPage() {
  const { orders, orderDishes, clearOrder } = useOrder();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  // Filter valid orders
  const validOrders = orders.filter((order) =>
    orderDishes.some((d) => d.id === order.dishId),
  );

  const totalPrice = validOrders.reduce((total, order) => {
    const dish = orderDishes.find((d) => d.id === order.dishId);
    return total + (dish ? dish.price * order.quantity : 0);
  }, 0);

  const totalItems = validOrders.reduce(
    (acc, order) => acc + order.quantity,
    0,
  );

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    clearOrder();
    toast.success("Paiement effectué avec succès !");
    setIsProcessing(false);
    router.push("/dishes");
  };

  const handleAddCard = (cardData: NewCardData) => {
    toast.success("Carte ajoutée avec succès (simulation)");
    console.log("New card:", cardData);
  };

  return (
    <MainWrapper className="px-4 sm:px-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Paiement</h1>

      <div className="grid gap-8 md:grid-cols-[1fr_300px]">
        <div className="space-y-8">
          <section className="space-y-4">
            <h2 className="text-xl font-semibold border-b pb-2">
              1. Adresse de livraison
            </h2>
            <p className="text-muted-foreground">
              Jean Dupont
              <br />
              12 Rue de la Paix
              <br />
              75000 Paris, France
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold border-b pb-2 text-primary">
              2. Mode de paiement
            </h2>
            <PaymentMethodSelector
              savedCards={MOCK_SAVED_CARDS}
              onAddCard={handleAddCard}
            />
          </section>
        </div>

        <div className="space-y-4">
          <div className="rounded-lg border bg-card p-6 shadow-sm sticky top-4">
            <h3 className="font-semibold mb-4">Récapitulatif</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Articles ({totalItems}):</span>
                <Price amount={totalPrice} />
              </div>
              <div className="flex justify-between">
                <span>Livraison:</span>
                <Price amount={0} />
              </div>
              <div className="border-t pt-2 mt-2 font-bold flex justify-between text-lg">
                <span>Total:</span>
                <Price amount={totalPrice} />
              </div>
            </div>

            <Button
              className="w-full mt-6 bg-accent hover:bg-accent/90 text-accent-foreground"
              onClick={handlePayment}
              disabled={isProcessing || validOrders.length === 0}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Traitement...
                </>
              ) : (
                "Payer et commander"
              )}
            </Button>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              En validant, vous acceptez les conditions générales de vente.
            </p>
          </div>
        </div>
      </div>
    </MainWrapper>
  );
}
