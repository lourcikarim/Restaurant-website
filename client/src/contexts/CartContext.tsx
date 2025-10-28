import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: number;
  menuItemId: number;
  name: string;
  nameAr: string;
  nameEn: string;
  nameFr: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  notes?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (menuItemId: number) => void;
  updateQuantity: (menuItemId: number, quantity: number) => void;
  updateNotes: (menuItemId: number, notes: string) => void;
  clearCart: () => void;
  getTotal: () => number;
  getSubtotal: () => number;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load cart from localStorage", e);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addItem = (item: Omit<CartItem, "id">) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.menuItemId === item.menuItemId);
      if (existingItem) {
        return prevItems.map((i) =>
          i.menuItemId === item.menuItemId
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prevItems, { ...item, id: Date.now() }];
    });
  };

  const removeItem = (menuItemId: number) => {
    setItems((prevItems) => prevItems.filter((i) => i.menuItemId !== menuItemId));
  };

  const updateQuantity = (menuItemId: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(menuItemId);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((i) =>
        i.menuItemId === menuItemId ? { ...i, quantity } : i
      )
    );
  };

  const updateNotes = (menuItemId: number, notes: string) => {
    setItems((prevItems) =>
      prevItems.map((i) =>
        i.menuItemId === menuItemId ? { ...i, notes } : i
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getSubtotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotal = () => {
    return getSubtotal();
  };

  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        updateNotes,
        clearCart,
        getTotal,
        getSubtotal,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}

