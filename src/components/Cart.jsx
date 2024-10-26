import CartItem from './CartItem';
import { CartContext } from '../store/shopping-cart-context';
import { useContext } from 'react';

function Cart() {
  const { items, handleAddItem, handleDeleteItem } = useContext(CartContext);

  return (
    <section className="mb-4" data-testid="cart-container">
      {items && items.length > 0 ? (
        <ul
          className="py-2 px-4 border border-slate-100 bg-slate-100 rounded-md shadow-inner"
          data-testid="cart-items-container"
        >
          {items.map((item, index) => (
            <li
              key={item.id}
              className={`${index !== 0 ? 'border-t border-t-slate-200' : ''}`}
              data-testid="cart-item-container"
            >
              <CartItem
                item={item}
                onAddItem={() => handleAddItem(item.id)}
                onDeleteItem={() => handleDeleteItem(item.id)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p
          className="font-quicksand font-semibold text-lg text-center"
          data-testid="empty-cart-message"
        >
          Your cart is empty :(
        </p>
      )}
    </section>
  );
}

export default Cart;
