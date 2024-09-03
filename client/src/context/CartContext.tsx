
import { createContext, useState, ReactNode, useContext } from "react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}
interface CartContextType {
  productCount: number | 1;
  setProductCount : (productCount : number) => void;
  selectedSize : string | '';
  setSelectedSize : (selectedSize : string) => void;
  cartItems: CartItem[];
  setCartItems: (cartItems: CartItem[]) => void;
  orderHistory: CartItem[];
  setOrderHistory: (update: ((prevOrderHistory: CartItem[]) => CartItem[]) | CartItem[]) => void;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

interface CartContextProviderProps {
  children: ReactNode;
}

export const CartContextProvider = ({ children}: CartContextProviderProps ) => {
  const [productCount, setProductCount] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orderHistory, setOrderHistory] = useState<CartItem[]>([]);
  return (
    <CartContext.Provider
      value={{
        productCount,
        setProductCount,
        selectedSize,
        setSelectedSize,
        cartItems,
        setCartItems,
        orderHistory,
        setOrderHistory
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within an CartContextProvider");
  }
  return context;
};
