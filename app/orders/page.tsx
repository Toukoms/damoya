"use client";

import { useOrder } from "@/src/entities/order";
import { QuantitySelector } from "@/src/features/cart/ui/quantity-selector";
import { Button, MainWrapper } from "@/src/shared/ui";
import { useClerk, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

export default function OrderPage() {
  const {
    orders,
    orderDishes,
    removeDishFromOrder,
    updateDishQuantity,
    clearOrder,
  } = useOrder();
  const { isSignedIn } = useUser();
  const clerk = useClerk();

  // Filter out any orders where we don't have the dish data
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

  const handleRemove = (dishId: string) => {
    removeDishFromOrder(dishId);
    toast.success("Produit retiré du panier");
  };

  const handleOrderSubmit = () => {
    if (!isSignedIn) {
      clerk.openSignIn();
      return;
    }
    toast.success("Votre commande a été envoyée et sera livrée bientôt.");
    clearOrder();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(price);
  };

  return (
    <MainWrapper>
      <div className="bg-background min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Column - Cart Items */}
            <div className="lg:col-span-3 bg-card p-6 shadow-sm rounded-sm">
              <h1 className="text-2xl font-medium mb-1 border-b pb-4">
                Votre Panier
              </h1>

              {validOrders.length === 0 ? (
                <div className="py-8">
                  <p className="text-foreground mb-4 text-lg">
                    Votre panier est vide.
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Le prix et la disponibilité des articles sur Damoya sont
                    sujets à changement. Le panier est un lieu temporaire pour
                    stocker une liste de vos articles et reflète le prix le plus
                    récent de chaque article.
                  </p>
                  <Button
                    asChild
                    className="bg-accent hover:bg-accent/90 text-accent-foreground border border-accent rounded-lg shadow-sm"
                  >
                    <Link href="/dishes">Découvrir nos plats</Link>
                  </Button>
                </div>
              ) : (
                <>
                  <div className="text-right text-sm text-muted-foreground mb-2 hidden lg:block">
                    Prix
                  </div>
                  <div className="divide-y">
                    {validOrders.map((order) => {
                      const dish = orderDishes.find(
                        (d) => d.id === order.dishId,
                      );
                      if (!dish) return null;

                      return (
                        <div
                          key={order.id}
                          className="py-6 flex flex-col sm:flex-row gap-4"
                        >
                          {/* Image */}
                          <Link
                            href={`/dishes/${dish.id}`}
                            className="shrink-0 mx-auto sm:mx-0"
                          >
                            <div className="relative h-44 w-44 overflow-hidden">
                              <Image
                                src={dish.imgUrl}
                                alt={dish.title}
                                fill
                                className="object-contain"
                              />
                            </div>
                          </Link>

                          {/* Details */}
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div className="space-y-1">
                                <Link
                                  href={`/dishes/${dish.id}`}
                                  className="text-lg font-medium text-foreground hover:underline leading-snug line-clamp-2"
                                >
                                  {dish.title}
                                </Link>
                                <div className="text-xs text-primary mt-1">
                                  En stock
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  Expédié par Damoya
                                </div>
                                <div className="text-xs text-muted-foreground font-bold">
                                  Options :{" "}
                                  <span className="font-normal text-muted-foreground">
                                    {dish.description.substring(0, 30)}...
                                  </span>
                                </div>
                              </div>
                              <div className="text-lg font-bold text-foreground text-right sm:hidden">
                                {formatPrice(dish.price)}
                              </div>
                            </div>

                            <div className="flex items-center gap-4 mt-4 flex-wrap">
                              <QuantitySelector
                                quantity={order.quantity}
                                onIncrease={() =>
                                  updateDishQuantity(
                                    dish.id,
                                    order.quantity + 1,
                                  )
                                }
                                onDecrease={() =>
                                  updateDishQuantity(
                                    dish.id,
                                    Math.max(1, order.quantity - 1),
                                  )
                                }
                              />
                              <div className="h-4 w-px bg-border hidden sm:block"></div>
                              <button
                                onClick={() => handleRemove(dish.id)}
                                className="text-primary text-sm hover:underline"
                              >
                                Supprimer
                              </button>
                            </div>
                          </div>

                          {/* Price Desktop */}
                          <div className="text-lg font-bold text-foreground text-right hidden sm:block w-32">
                            {formatPrice(dish.price)}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="text-right text-xl py-4 border-t">
                    Sous-total ({totalItems} articles):{" "}
                    <span className="font-bold">{formatPrice(totalPrice)}</span>
                  </div>
                </>
              )}
            </div>

            {/* Right Column - Summary */}
            <div className="lg:col-span-1">
              {validOrders.length > 0 && (
                <div className="bg-card p-4 shadow-sm rounded-sm sticky top-16 sm:top-24 lg:top-32">
                  <div className="text-lg mb-4">
                    Sous-total ({totalItems} articles):{" "}
                    <span className="font-bold">{formatPrice(totalPrice)}</span>
                  </div>
                  <Button
                    onClick={handleOrderSubmit}
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground border border-accent rounded-full shadow-sm h-9"
                  >
                    Passer la commande
                  </Button>
                </div>
              )}

              {validOrders.length > 0 && (
                <div className="bg-muted p-4 shadow-sm rounded-sm mt-4 text-xs text-muted-foreground border border-border">
                  <p className="mb-2">
                    Les articles dans votre panier ne sont pas réservés.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainWrapper>
  );
}
