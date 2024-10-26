import './App.css';
import Header from './components/Header';
import Shop from './components/Shop';
import { DUMMY_PRODUCTS } from './utils/dummy-products';
import Product from './components/Product';
import CartContextProvider from './store/shopping-cart-context';

function App() {
  return (
    <CartContextProvider>
      <Header />
      <main>
        <Shop>
          {DUMMY_PRODUCTS.map((product) => (
            <li key={product.id} data-testid="product-container">
              <Product {...product} />
            </li>
          ))}
        </Shop>
      </main>
    </CartContextProvider>
  );
}

export default App;
