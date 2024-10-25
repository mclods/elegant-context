import Product from './Product';
import { DUMMY_PRODUCTS } from '../utils/dummy-products';
import './Shop.css';

function Shop({ cartItems, onAddItem, onDeleteItem }) {
  return (
    <section className="mx-[15%] py-10" data-testid="shop-container">
      <div className="mb-8">
        <p
          className="font-merriweather font-bold uppercase text-2xl"
          data-testid="shop-title"
        >
          Elegant Clothing For Everyone
        </p>
      </div>

      <ul
        className="grid gridTemplateCols gap-8"
        data-testid="products-container"
      >
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id} data-testid="product-container">
            <Product
              id={product.id}
              image={product.image}
              title={product.title}
              price={product.price}
              description={product.description}
              cartItems={cartItems}
              onAddItem={() => onAddItem(product.id)}
              onDeleteItem={() => onDeleteItem(product.id)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Shop;
