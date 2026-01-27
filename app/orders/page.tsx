"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import { useOrder } from "@entities/order";
import { QuantitySelector } from "@features/cart/ui/quantity-selector";
import { Button, Input, MainWrapper } from "@shared/ui";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { toast } from "sonner";

export default function OrderPage() {
  const [promoCode, setPromoCode] = useState("");
  const {
    orders,
    orderDishes,
    removeDishFromOrder,
    updateDishQuantity,
    clearOrder,
  } = useOrder();
  const { isSignedIn } = useUser();
  const clerk = useClerk();

  // Filter out any orders where we don't have the dish data (shouldn't happen ideally)
  const validOrders = orders.filter((order) =>
    orderDishes.some((d) => d.id === order.dishId),
  );

  const totalPrice = validOrders.reduce((total, order) => {
    const dish = orderDishes.find((d) => d.id === order.dishId);
    return total + (dish ? dish.price * order.quantity : 0);
  }, 0);

  const handleRemove = (dishId: string) => {
    removeDishFromOrder(dishId);
    toast.success("Produit retiré du panier");
  };

  const handleApplyPromo = () => {
    if (!promoCode) return;
    toast.success("Code promo appliqué !");
    setPromoCode("");
  };

  const handleOrderSubmit = () => {
    if (!isSignedIn) {
      clerk.openSignIn();
      return;
    }
    toast.success("Votre commande a été envoyée et sera livrée bientôt.");
    clearOrder();
  };

  return (
    <MainWrapper>
      <div className="container mx-auto px-4 py-8 mt-20">
        <h1 className="text-3xl font-bold mb-8">Votre Panier</h1>

        {validOrders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">Votre panier est vide.</p>
            <Button asChild>
              <Link href="/dishes">Découvrir nos plats</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-4">
              {validOrders.map((order) => {
                const dish = orderDishes.find((d) => d.id === order.dishId);
                if (!dish) return null;

                return (
                  <div
                    key={order.id}
                    className="flex gap-4 p-4 border rounded-lg bg-card shadow-sm"
                  >
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md border bg-muted">
                      <Image
                        src={dish.imgUrl}
                        alt={dish.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-semibold">{dish.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {dish.description}
                          </p>
                        </div>
                        <p className="font-bold">
                          {new Intl.NumberFormat("fr-FR", {
                            style: "currency",
                            currency: "EUR",
                          }).format(dish.price * order.quantity)}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="w-32">
                          <QuantitySelector
                            quantity={order.quantity}
                            onIncrease={() =>
                              updateDishQuantity(
                                order.dishId,
                                order.quantity + 1,
                              )
                            }
                            onDecrease={() =>
                              updateDishQuantity(
                                order.dishId,
                                Math.max(1, order.quantity - 1),
                              )
                            }
                          />
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive/90"
                          onClick={() => handleRemove(dish.id)}
                        >
                          <FaTrash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 p-6 border rounded-lg bg-card shadow-sm space-y-4">
                <h2 className="text-xl font-semibold">Récapitulatif</h2>

                <div className="flex justify-between py-2 border-b">
                  <span>Sous-total</span>
                  <span>
                    {new Intl.NumberFormat("fr-FR", {
                      style: "currency",
                      currency: "EUR",
                    }).format(totalPrice)}
                  </span>
                </div>

                <div className="flex gap-2 py-4 border-b">
                  <Input
                    placeholder="Code promo"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <Button variant="outline" onClick={handleApplyPromo}>
                    Appliquer
                  </Button>
                </div>

                <div className="flex justify-between py-2 font-bold text-lg">
                  <span>Total</span>
                  <span>
                    {new Intl.NumberFormat("fr-FR", {
                      style: "currency",
                      currency: "EUR",
                    }).format(totalPrice)}
                  </span>
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleOrderSubmit}
                >
                  Passer la commande
                </Button>

                <Button variant="outline" className="w-full" asChild>
                  <Link href="/dishes">Continuer mes achats</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainWrapper>
  );
}
