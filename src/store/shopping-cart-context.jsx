import { createContext, useReducer } from 'react';
import { DUMMY_PRODUCTS } from '../utils/dummy-products';

export const CartContext = createContext({
  items: [],
  total: 0,
  handleAddItem: () => {},
  handleDeleteItem: () => {},
  handleDeleteCart: () => {},
});

function cartReducer(state, action) {
  if (action.type === 'ADD_ITEM') {
    const updatedItems = [...(state.items || []).map((item) => ({ ...item }))];
    let cartTotal = state.total || 0;

    const itemIndex = updatedItems.findIndex(
      (item) => item.id === action.payload
    );
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
      const itemData = DUMMY_PRODUCTS.find(
        (product) => product.id === action.payload
      );
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
      ...state,
      items: updatedItems,
      total: cartTotal,
    };
  }

  if (action.type === 'DELETE_ITEM') {
    const updatedItems = [...state.items.map((item) => ({ ...item }))];
    let cartTotal = state.total;

    const itemIndex = updatedItems.findIndex(
      (item) => item.id === action.payload
    );
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
      ...state,
      items: updatedItems,
      total: cartTotal,
    };
  }

  if (action.type === 'DELETE_CART') {
    return action.payload;
  }
}

function CartContextProvider({ children }) {
  const initialCartState = {
    items: [],
    total: 0,
  };

  const [cartState, cartDispatcher] = useReducer(cartReducer, initialCartState);

  function onAddItem(id) {
    cartDispatcher({
      type: 'ADD_ITEM',
      payload: id,
    });
  }

  function onDeleteItem(id) {
    cartDispatcher({
      type: 'DELETE_ITEM',
      payload: id,
    });
  }

  function onDeleteCart() {
    cartDispatcher({
      type: 'DELETE_CART',
      payload: initialCartState,
    });
  }

  const ctxValue = {
    items: cartState.items,
    total: cartState.total,
    handleAddItem: onAddItem,
    handleDeleteItem: onDeleteItem,
    handleDeleteCart: onDeleteCart,
  };

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}

export default CartContextProvider;
