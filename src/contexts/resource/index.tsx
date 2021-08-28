import * as React from 'react';

export interface foodObj {
  id: string;
  count?: number;
  price: number;
}

interface contextProps {
  cart: Array<any>;
  addToCart: (item: any) => void;
  updateItem: (props: any) => void;
  deleteItemFromCart: (id: string) => void;
  findItemInTheCart: (id: string) => any | boolean;
  restaurantDetails: any;
  resource: any;
  saveRestaurantDetils: (restaurant: any) => void;
  restaurantList: any;
  setRestaurants: (restaurantList: any) => void;
  menuList: any;
  setMenu: (menuList: any) => void;
  EmptyCart: () => void;
  getTotalCost: () => void;
}

export const ResourceContext = React.createContext<contextProps | null>(null);
export const useResource = () => React.useContext(ResourceContext);

export const ResourceProvider: React.FunctionComponent = ({children}) => {
  const [cart, setCart] = React.useState<Array<any>>([]);
  const [restaurantDetails, setRestaurantDetails] = React.useState<any>();
  const [resource, setResource] = React.useState<any>(null);
  const [restaurantList, setRestaurantList] = React.useState<any>(null);
  const [menuList, setMenuList] = React.useState<any>(null);

  // --------------------------------- MODIFY CART  ---------------------------------- \\
  function addToCart(item: any) {
    try {
      const product = cart?.findIndex(el => el.id === item.id);
      if (product === -1) {
        const otherProducts = cart?.filter(el => el.id !== item.id);
        setCart(prev => [...otherProducts, item]);
      }
    } catch (error) {
      throw error;
    }
  }
  function updateItem(props: any) {
    try {
      const product = cart.findIndex(el => el.id === props.id);
      if (product >= 0) {
        // setCart(prev => {
        //   let tmp = prev;
        //   tmp[product].count = count;
        //   return tmp;
        // });
        setCart(prev => [
          ...prev.slice(0, product),
          {...props},
          ...prev.slice(product + 1),
        ]);
        return;
      }
    } catch (error) {
      throw error;
    }
  }
  function deleteItemFromCart(id: string) {
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
  }
  function findItemInTheCart(id: string) {
    const product = cart.filter(el => el.id === id);
    if (product.length >= 1) return product[0];
    else return false;
  }

  // --------------------------------- MODIFY CART  ---------------------------------- \\
  const saveRestaurantDetils = (details: any) => setRestaurantDetails(details);
  const setRestaurants = (restaurantList: any) =>
    setRestaurantList(restaurantList);
  const setMenu = (menuList: any) => setMenuList(menuList);
  const EmptyCart = () => {
    setCart([]);
  };

  function getTotalCost() {
    let total: number;
    if (cart.length) {
      cart.map((item: foodObj) => {
        if (item.count) total = total + item.price * item.count;
      });
    }
  }
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
        restaurantList,
        setRestaurants,
        menuList,
        setMenu,
        EmptyCart,
        getTotalCost,
      }}>
      {children}
    </ResourceContext.Provider>
  );
};


