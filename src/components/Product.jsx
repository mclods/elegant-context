import './Product.css';
import { priceFormatter } from '../utils/price-formatter';

function Product({ image, title, price, description }) {
  return (
    <article className="w-full h-full rounded-lg bShadow">
      <img className="w-full h-1/2 rounded-t-lg" src={image} alt={title} />
      <div className="h-1/2 flex flex-col justify-between rounded-b-lg">
        <div className="flex flex-col gap-y-2 px-4 py-3">
          <p className="font-merriweather font-bold text-xl">{title}</p>
          <p className="font-merriweather font-semibold text-lg">
            {priceFormatter.format(price)}
          </p>
          <p className="font-quicksand font-semibold text-md text-ellipsis overflow-hidden">{description}</p>
        </div>
        <div>
          <button>Add to Cart</button>
        </div>
      </div>
    </article>
  );
}

export default Product;
