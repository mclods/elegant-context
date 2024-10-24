import './Product.css';
import { priceFormatter } from '../utils/price-formatter';

function Product({ image, title, price, description, onAddItem }) {
  return (
    <article className="flex flex-col bShadow rounded-lg w-full h-full">
      <img className="w-full rounded-t-lg" src={image} alt={title} />
      <div className="flex flex-col h-full justify-between rounded-b-lg bg-slate-100">
        <div className="px-4 py-2">
          <p className="my-2 font-merriweather font-bold text-xl text-ellipsis overflow-hidden">
            {title}
          </p>
          <p className="my-2 font-merriweather font-semibold text-lg text-red-700">
            {priceFormatter.format(price)}
          </p>
          <p className="my-2 max-h-[25vh] font-quicksand font-semibold overflow-hidden text-ellipsis">
            {description}
          </p>
        </div>
        <div className="m-2 text-right">
          <button
            className="w-10 h-10 rounded-full font-quicksand font-bold text-xl bg-amber-400 truncate active:-translate-x-0.5 active:translate-y-0.5"
            onClick={onAddItem}
          >
            +
          </button>
        </div>
      </div>
    </article>
  );
}

export default Product;
