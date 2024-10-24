import CartItem from './CartItem';

function Cart({ cartItems, onAddItem, onDeleteItem }) {
  return (
    <section className="mb-4">
      {cartItems && cartItems.length > 0 ? (
        <ul className="py-2 px-4 border border-slate-100 bg-slate-100 rounded-md shadow-inner">
          {cartItems.map((item, index) => (
            <li
              key={item.id}
              className={`${index !== cartItems.length - 1 ? 'border-b border-b-slate-200' : ''}`}
            >
              <CartItem
                item={item}
                onAddItem={onAddItem}
                onDeleteItem={onDeleteItem}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="font-quicksand font-semibold text-lg text-center">
          Your cart is empty :(
        </p>
      )}
    </section>
  );
}

export default Cart;
