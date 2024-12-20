import { priceFormatter } from '../utils/price-formatter';

function CartItem({ item, onAddItem, onDeleteItem }) {
  const buttonStyle =
    'h-6 w-6 font-bold font-xl rounded-full shadow-md bg-slate-300 active:-translate-x-0.5 active:translate-y-0.5';

  return (
    <div className="flex justify-between" data-testid="cart-item">
      <div className="flex flex-col p-2">
        <p
          className="font-merriweather font-semibold truncate"
          data-testid="cart-item-title"
        >
          {item.title}
        </p>
        <p
          className="font-quicksand font-semibold text-red-700"
          data-testid="cart-item-price"
        >
          {priceFormatter.format(item.totalPrice)}
        </p>
      </div>
      <div className="flex items-center">
        <button
          className={buttonStyle}
          onClick={onDeleteItem}
          data-testid="cart-item-delete-btn"
        >
          -
        </button>
        <p
          className="w-10 font-merriweather text-xl text-center px-3"
          data-testid="cart-item-quantity"
        >
          {item.quantity}
        </p>
        <button
          className={buttonStyle}
          onClick={onAddItem}
          data-testid="cart-item-add-btn"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default CartItem;
