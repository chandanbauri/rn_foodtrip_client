import React, {createContext, useState} from 'react';
const ResourceContext = createContext();
const ResourceProvider = props => {
  const {children} = props;
  const [cart, setCart] = useState([]);
  const [restaurantDetails, setRestaurantDetails] = useState(null);
  const [resource, setResource] = useState(null);

  // --------------------------------- MODIFY CART  ---------------------------------- \\
  const addToCart = item => {
    try {
      const product = cart.findIndex(el => el.id === item.id);
      if (product === -1) {
        const otherProducts = cart.filter(el => el.id !== item.id);
        setCart(prev => [...otherProducts, item]);
      }
    } catch (error) {
      throw error;
    }
  };
  const updateItem = (id, count) => {
    try {
      const product = cart.findIndex(el => el.id === id);
      if (product.length != 0) {
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
  const deleteItemFromCart = id => {
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
  const findItemInTheCart = id => {
    const product = cart.filter(el => el.id === id);
    if (product.length >= 1) return product[0];
    else return false;
  };
  // --------------------------------- MODIFY CART  ---------------------------------- \\
  const saveRestaurantDetils = details => setRestaurantDetails(details);
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
