// import { createContext, useState } from "react";

// export const AuthContext = createContext();

// interface User {
//     username: string;
//     email: string;
//   }

// export const AuthContextProvider = ({children}) => {
//     const [token, setToken] = useState(localStorage.getItem('token') || null);
//     const [loginStatus, setLoginStatus] = useState(JSON.parse(localStorage.getItem('loginStatus')) || false);
//     const [userData, setUserData] = useState<User[]>([]);

//     return (
//         <AuthContext.Provider value={{token, setToken, loginStatus, setLoginStatus}}>{children}</AuthContext.Provider>
//     )
// }

import { createContext, useState, ReactNode, useContext } from "react";

interface User {
  username: string;
  email: string;
  amount : string;
  id : string;
}

interface ProductDetail {
  productId: string;
  productName: string;
  productDesc: string;
  productPrice: string;
  productImage: string;
  productRating : number;
  productCategory : string;
  [key: string]: any; // Add other fields as necessary
}

interface Review {
  name: string;
  comment: string;
  rating: number;
}
interface Product {
  _id: string;
  productName: string;
  productDesc: string;
  productPrice: string;
  productImage: string;
  productRating: number;
  productCategory: string;
  reviews?: Review[]; // Add reviews field
  [key: string]: any; // Allow additional fields
}

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  amount : Number | null;
  setAmount : (amount : Number | null) => void;
  loginStatus: boolean;
  setLoginStatus: (status: boolean) => void;
  userData: User;
  setUserData: (users: User) => void;
  isAdmin : boolean;
  setIsAdmin : (admin : boolean) => void;
  paymentSuccessfull : boolean;
  setPaymentSuccessfull : (paymentSuccessfull : boolean) => void;
  productDetail: ProductDetail | null;
  setProductDetail: (productDetail: ProductDetail | null) => void;
  productsData : Product[] | null;
  setProductsData: (update: ((prevProductsData: Product[] | null) => Product[] | null) | Product[] | null) => void;
  searchQuery : string | "";
  setSearchQuery : (searchQuery : string | "") => void;

}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [amount, setAmount] = useState<Number | null>(
    Number(localStorage.getItem("amount"))
  )
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    const savedStatus = localStorage.getItem("isAdmin");
    return savedStatus ? JSON.parse(savedStatus) : false;
  });

  const [productsData, setProductsData] = useState<Product[] | null>(null);

  //   const [loginStatus, setLoginStatus] = useState<boolean>(
  //     JSON.parse(localStorage.getItem("loginStatus") || "false")
  //   );
  const [loginStatus, setLoginStatus] = useState<boolean>(() => {
    const savedStatus = localStorage.getItem("loginStatus");
    return savedStatus ? JSON.parse(savedStatus) : false;
  });
  const [userData, setUserData] = useState<User>({ username: "", email: "", amount: "", id: "" });
  const [productDetail, setProductDetail] = useState<ProductDetail | null>(null);

  const [paymentSuccessfull, setPaymentSuccessfull] = useState<boolean>(() => {
    const savedStatus = localStorage.getItem("paymentSuccessfull");
    return savedStatus ? JSON.parse(savedStatus) : false;
  });

  const [searchQuery, setSearchQuery] = useState<string | "">("");

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        loginStatus,
        setLoginStatus,
        userData,
        setUserData,
        isAdmin,
        setIsAdmin,
        productDetail,
        setProductDetail,
        amount,
        setAmount,
        paymentSuccessfull,
        setPaymentSuccessfull,
        productsData,
        setProductsData,
        searchQuery,
        setSearchQuery
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};
