import { useState, createContext } from 'react';
import { DUMMY_PRODUCTS } from '../utils/dummy-products';

export const CartContext = createContext({
  items: [],
  total: 0,
  handleAddItem: () => {},
  handleDeleteItem: () => {},
  handleDeleteCart: () => {},
});

function CartContextProvider({ children }) {
  const [cart, setCart] = useState({
    items: [],
    total: 0,
  });

  function onAddItem(id) {
    setCart((prevCart) => {
      const updatedItems = [
        ...(prevCart.items || []).map((item) => ({ ...item })),
      ];
      let cartTotal = prevCart.total || 0;

      const itemIndex = updatedItems.findIndex((item) => item.id === id);
      if (itemIndex !== -1) {
        const currentItem = updatedItems[itemIndex];

        const updatedItem = {
          ...currentItem,
        };
        updatedItem.quantity += 1;
        updatedItem.totalPrice += updatedItem.price;
        cartTotal += updatedItem.price;

        updatedItems[itemIndex] = updatedItem;
      } else {
        const itemData = DUMMY_PRODUCTS.find((product) => product.id === id);
        updatedItems.push({
          id: itemData.id,
          title: itemData.title,
          quantity: 1,
          price: itemData.price,
          totalPrice: itemData.price,
        });

        cartTotal += itemData.price;
      }

      return {
        ...prevCart,
        items: updatedItems,
        total: cartTotal,
      };
    });
  }

  function onDeleteItem(id) {
    setCart((prevCart) => {
      const updatedItems = [...prevCart.items.map((item) => ({ ...item }))];
      let cartTotal = prevCart.total;

      const itemIndex = updatedItems.findIndex((item) => item.id === id);
      if (itemIndex !== -1) {
        const currentItem = updatedItems[itemIndex];

        if (currentItem.quantity === 1) {
          cartTotal -= currentItem.price;
          updatedItems.splice(itemIndex, 1);
        } else {
          const updatedItem = {
            ...currentItem,
          };

          updatedItem.quantity -= 1;
          updatedItem.totalPrice -= updatedItem.price;
          cartTotal -= updatedItem.price;

          updatedItems[itemIndex] = updatedItem;
        }
      }

      return {
        ...prevCart,
        items: updatedItems,
        total: cartTotal,
      };
    });
  }

  function onDeleteCart() {
    setCart({});
  }

  const ctxValue = {
    items: cart.items,
    total: cart.total,
    handleAddItem: onAddItem,
    handleDeleteItem: onDeleteItem,
    handleDeleteCart: onDeleteCart,
  };

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}

export default CartContextProvider;
