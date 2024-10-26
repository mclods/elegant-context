import './Shop.css';

function Shop({ children }) {
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
        {children}
      </ul>
    </section>
  );
}

export default Shop;
