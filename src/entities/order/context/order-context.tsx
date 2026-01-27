"use client";

import { Dish } from "@entities/dish";
import { useLocalStorage } from "@shared/lib/hooks/use-local-storage";
import { createContext, ReactNode, useContext } from "react";
import { Order } from "../model/order";

interface OrderContextType {
  orders: Order[];
  orderDishes: Dish[];
  addDishToOrder: (dish: Dish, quantity: number) => void;
  removeDishFromOrder: (dishId: string) => void;
  updateDishQuantity: (dishId: string, quantity: number) => void;
  clearOrder: () => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useLocalStorage<Order[]>("damoya-orders", []);
  const [orderDishes, setOrderDishes] = useLocalStorage<Dish[]>(
    "damoya-order-dishes",
    [],
  );

  const addDishToOrder = (dish: Dish, quantity: number) => {
    setOrders((prev) => {
      const existing = prev.find((o) => o.dishId === dish.id);
      if (existing) {
        return prev.map((o) =>
          o.dishId === dish.id
            ? { ...o, quantity: o.quantity + quantity, updatedAt: new Date() }
            : o,
        );
      }
      return [
        ...prev,
        {
          id: crypto.randomUUID(),
          dishId: dish.id,
          quantity,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
    });

    setOrderDishes((prev) => {
      if (prev.find((d) => d.id === dish.id)) return prev;
      return [...prev, dish];
    });
  };

  const removeDishFromOrder = (dishId: string) => {
    setOrders((prev) => prev.filter((o) => o.dishId !== dishId));
    setOrderDishes((prev) => prev.filter((d) => d.id !== dishId));
  };

  const updateDishQuantity = (dishId: string, quantity: number) => {
    if (quantity <= 0) {
      removeDishFromOrder(dishId);
      return;
    }
    setOrders((prev) =>
      prev.map((o) =>
        o.dishId === dishId ? { ...o, quantity, updatedAt: new Date() } : o,
      ),
    );
  };

  const clearOrder = () => {
    setOrders([]);
    setOrderDishes([]);
  };

  const value = {
    orders,
    orderDishes,
    addDishToOrder,
    removeDishFromOrder,
    updateDishQuantity,
    clearOrder,
  };

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
}
