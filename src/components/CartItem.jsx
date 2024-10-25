import { priceFormatter } from '../utils/price-formatter';

function CartItem({ item, onAddItem, onDeleteItem }) {
  const buttonStyle =
    'h-6 w-6 font-bold font-xl rounded-full shadow-md bg-slate-300 active:-translate-x-0.5 active:translate-y-0.5';

  return (
    <div className="flex justify-between">
      <div className="flex flex-col p-2">
        <p className="font-merriweather font-semibold truncate">{item.title}</p>
        <p className="font-quicksand font-semibold text-red-700">
          {priceFormatter.format(item.totalPrice)}
        </p>
      </div>
      <div className="flex items-center">
        <button className={buttonStyle} onClick={() => onDeleteItem(item.id)}>
          -
        </button>
        <p className="w-10 font-merriweather text-xl text-center px-3">
          {item.quantity}
        </p>
        <button className={buttonStyle} onClick={() => onAddItem(item.id)}>
          +
        </button>
      </div>
    </div>
  );
}

export default CartItem;
