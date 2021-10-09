import * as React from 'react';
import {getValue, setValue} from '../../utilities';

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
  getTotalCost: () => number;
  repeatOrder: (items: any) => void;
  fetchLastSavedCartInfo: () => Promise<void>;
}

export const ResourceContext = React.createContext<contextProps | null>(null);
export const useResource = () => React.useContext(ResourceContext);

export const ResourceProvider: React.FunctionComponent = ({children}) => {
  const [cart, setCart] = React.useState<Array<any>>([]);
  const [restaurantDetails, setRestaurantDetails] = React.useState<any>();
  const [resource, setResource] = React.useState<any>(null);
  const [restaurantList, setRestaurantList] = React.useState<any>(null);
  const [menuList, setMenuList] = React.useState<any>(null);
  let totalCost = React.useRef<number>(0);
  let getPreviousCartValue = async () => {
    try {
      let res = await getValue('cart');
      if (res !== null) return res;
      return [];
    } catch (error) {
      throw error;
    }
  };

  const fetchLastSavedCartInfo = async () => {
    try {
      setCart(await getPreviousCartValue());
      let lastSavedRestaurant = await getValue('lastRestaurant');
      if (lastSavedRestaurant !== null) {
        setRestaurantDetails(lastSavedRestaurant);
      } else {
        setRestaurantDetails(null);
      }
    } catch (error) {
      throw error;
    }
  };

  let saveCartToAsync = async (value: any) => {
    try {
      await setValue(value, 'cart');
    } catch (error) {
      throw error;
    }
  };
  // --------------------------------- MODIFY CART  ---------------------------------- \\
  function addToCart(item: any) {
    try {
      const product = cart?.findIndex(el => el.id === item.id);
      if (product === -1) {
        const otherProducts = cart?.filter(el => el.id !== item.id);
        saveCartToAsync([...otherProducts, item]).catch(error => {
          throw error;
        });
        setCart(prev => {
          let total: number = 0;
          [...otherProducts, item].forEach((val: any) => {
            total = total + val.cost * val.count;
          });
          // //console.log(total);
          totalCost.current = total;
          return [...otherProducts, item];
        });
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
        setCart(prev => {
          let total = 0;
          let current = [
            ...prev.slice(0, product),
            {...props},
            ...prev.slice(product + 1),
          ];
          current.map((val: any) => {
            total = total + val.cost * val.count;
          });
          totalCost.current = total;
          saveCartToAsync(current).catch(error => {
            throw error;
          });
          return current;
        });
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
        setCart(prev => {
          let total = 0;
          let current = [...prev.slice(productIndex + 1)];
          current.map((val: any) => {
            total = total + val.cost * val.count;
          });
          totalCost.current = total;
          saveCartToAsync(current).catch(error => {
            throw error;
          });
          if (current.length == 0) {
            saveRestaurantDetils(null);
          }
          return current;
        });
      } else {
        setCart(prev => {
          let total = 0;
          let current = [
            ...prev.slice(0, productIndex),
            ...prev.slice(productIndex + 1),
          ];
          current.map((item: any) => {
            total = total + item.cost * item.count;
          });
          totalCost.current = total;
          saveCartToAsync(current).catch(error => {
            throw error;
          });
          if (current.length == 0) {
            saveRestaurantDetils(null);
          }
          return current;
        });
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
  const saveRestaurantDetils = (details: any) => {
    setRestaurantDetails(details);
    setValue(details, 'lastRestaurant');
  };
  const setRestaurants = (restaurantList: any) =>
    setRestaurantList(restaurantList);
  const setMenu = (menuList: any) => setMenuList(menuList);
  const EmptyCart = () => {
    setCart([]);
    saveCartToAsync([]).catch(error => {
      throw error;
    });
  };

  const getTotalCost = () => totalCost.current;
  function repeatOrder(items: any) {
    setCart(items);
    saveCartToAsync(items);
  }
  // React.useEffect(() => {
  //   fetchLastSavedCartInfo().catch(error => {
  //     throw error;
  //   });
  // });
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
        repeatOrder,
        fetchLastSavedCartInfo,
      }}>
      {children}
    </ResourceContext.Provider>
  );
};
