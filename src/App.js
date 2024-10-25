import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Shop from './components/Shop';
import { DUMMY_PRODUCTS } from './utils/dummy-products';

function App() {
  const [cart, setCart] = useState({});

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

  return (
    <>
      <Header
        cartItems={cart.items}
        total={cart.total}
        onAddItem={onAddItem}
        onDeleteItem={onDeleteItem}
        onDeleteCart={onDeleteCart}
      />
      <main>
        <Shop
          cartItems={cart.items}
          onAddItem={onAddItem}
          onDeleteItem={onDeleteItem}
        />
      </main>
    </>
  );
}

export default App;
