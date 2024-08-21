
import { createContext, useState, ReactNode, useContext } from "react";

// interface User {
//   username: string;
//   email: string;
// }

interface CartContextType {
  productCount: number | 1;
  setProductCount : (productCount : number) => void;
  selectedSize : string | '';
  setSelectedSize : (selectedSize : string) => void;
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
  return (
    <CartContext.Provider
      value={{
        productCount,
        setProductCount,
        selectedSize,
        setSelectedSize
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
