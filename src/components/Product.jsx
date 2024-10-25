import './Product.css';
import { priceFormatter } from '../utils/price-formatter';

function Product({
  id,
  image,
  title,
  price,
  description,
  cartItems,
  onAddItem,
  onDeleteItem,
}) {
  const itemInCart = cartItems && cartItems.find((item) => item.id === id);
  const buttonStyle =
    'w-10 h-10 rounded-full font-quicksand font-bold text-xl bg-amber-400 truncate active:-translate-x-0.5 active:translate-y-0.5';

  return (
    <article
      className="flex flex-col bShadow rounded-lg w-full h-full"
      data-testid="product-card-container"
    >
      <img
        className="w-full rounded-t-lg"
        src={image}
        alt={title}
        data-testid="product-image"
      />
      <div
        className="flex flex-col h-full justify-between rounded-b-lg bg-slate-100"
        data-testid="product-contents-container"
      >
        <div className="px-4 py-2">
          <p
            className="my-2 font-merriweather font-bold text-xl text-ellipsis overflow-hidden"
            data-testid="product-title"
          >
            {title}
          </p>
          <p
            className="my-2 font-merriweather font-semibold text-lg text-red-700"
            data-testid="product-price"
          >
            {priceFormatter.format(price)}
          </p>
          <p
            className="my-2 max-h-[25vh] font-quicksand font-semibold overflow-hidden text-ellipsis"
            data-testid="product-description"
          >
            {description}
          </p>
        </div>
        <div className="m-2 flex justify-end items-center">
          {itemInCart && (
            <>
              <button
                className={buttonStyle}
                onClick={onDeleteItem}
                data-testid="delete-qty-btn"
              >
                -
              </button>
              <p
                className="w-10 font-merriweather font-bold text-lg text-center px-3"
                data-testid="product-quantity"
              >
                {itemInCart.quantity}
              </p>
            </>
          )}
          <button
            className={buttonStyle}
            onClick={onAddItem}
            data-testid="add-qty-btn"
          >
            +
          </button>
        </div>
      </div>
    </article>
  );
}

export default Product;
