import Product from './Product';
import { DUMMY_PRODUCTS } from '../utils/dummy-products';
import './Shop.css';

function Shop() {
  return (
    <section className="mx-[15%] py-10">
      <div className="mb-8">
        <p className="font-merriweather font-bold uppercase text-2xl">
          Elegant Clothing For Everyone
        </p>
      </div>

      <ul className="grid gridTemplateCols gap-8">
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product
              image={product.image}
              title={product.title}
              price={product.price}
              description={product.description}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Shop;
