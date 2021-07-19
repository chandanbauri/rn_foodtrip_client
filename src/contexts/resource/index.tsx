import * as React from 'react';

export interface foodObj {
  id: string;
  count?: number;
}

interface contextProps {
  cart: Array<foodObj>;
  addToCart: (item: foodObj) => void;
  updateItem: (id: string, count: number) => void;
  deleteItemFromCart: (id: string) => void;
  findItemInTheCart: (id: string) => foodObj | boolean;
  restaurantDetails: any;
  resource: any;
  saveRestaurantDetils: (restaurant: any) => void;
}

const ResourceContext = React.createContext<contextProps | null>(null);

const ResourceProvider: React.FunctionComponent = ({children}) => {
  const [cart, setCart] = React.useState<Array<foodObj>>([]);
  const [restaurantDetails, setRestaurantDetails] = React.useState<any>();
  const [resource, setResource] = React.useState<any>(null);

  // --------------------------------- MODIFY CART  ---------------------------------- \\
  const addToCart = (item: foodObj) => {
    try {
      const product = cart?.findIndex(el => el.id === item.id);
      if (product === -1) {
        const otherProducts = cart?.filter(el => el.id !== item.id);
        setCart(prev => [...otherProducts, item]);
      }
    } catch (error) {
      throw error;
    }
  };
  const updateItem = (id: string, count: number) => {
    try {
      const product = cart.findIndex(el => el.id === id);
      if (product != 0) {
        setCart(prev => {
          let tmp = prev;
          tmp[product].count = count;
          return tmp;
        });
      }
    } catch (error) {
      throw error;
    }
  };
  const deleteItemFromCart = (id: string) => {
    try {
      const productIndex = cart.findIndex(el => el.id === id);
      if (productIndex === 0) {
        setCart(prev => [...prev.slice(productIndex + 1)]);
      } else {
        setCart(prev => [
          ...prev.slice(0, productIndex),
          ...prev.slice(productIndex + 1),
        ]);
      }
    } catch (error) {
      throw error;
    }
  };
  const findItemInTheCart = (id: string) => {
    const product = cart.filter(el => el.id === id);
    if (product.length >= 1) return product[0];
    else return false;
  };
  // --------------------------------- MODIFY CART  ---------------------------------- \\
  const saveRestaurantDetils = (details: any) => setRestaurantDetails(details);
  return (
    <ResourceContext.Provider
      value={{
        cart,
        addToCart,
        updateItem,
        deleteItemFromCart,
        findItemInTheCart,
        restaurantDetails,
        resource,
        saveRestaurantDetils,
      }}>
      {children}
    </ResourceContext.Provider>
  );
};

export {ResourceContext, ResourceProvider};
