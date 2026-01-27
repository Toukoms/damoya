"use client";

import { OrderCard, useOrder } from "@/src/entities/order";
import { Button, MainWrapper } from "@/src/shared/ui";
import { useClerk, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function OrderPage() {
  const { orders, orderDishes, removeDishFromOrder, updateDishQuantity } =
    useOrder();
  const { isSignedIn } = useUser();
  const clerk = useClerk();
  const router = useRouter();

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
    router.push("/checkout");
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
                        <OrderCard
                          key={order.id}
                          order={order}
                          dish={dish}
                          onRemove={handleRemove}
                          onUpdateQuantity={updateDishQuantity}
                        />
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
