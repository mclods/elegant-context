import productData from '../fixtures/dummy-products.json';

describe('Test elegant-context App', () => {
  it('Load the App', () => {
    cy.visit('/');

    // Assert Header
    cy.getTestId('store-logo').should('exist');
    cy.getTestId('store-title').should('have.text', 'Elegant Context');
    cy.getTestId('cart-btn').should('have.text', 'Cart (0)');
  });

  it('Check the products', () => {
    // Assert Products
    cy.getTestId('shop-title').should(
      'have.text',
      'Elegant Clothing For Everyone'
    );
    cy.get('[data-testid="products-container"] li').each((product, index) => {
      cy.wrap(product).find('[data-testid="product-image"]').should('exist');
      cy.wrap(product)
        .find('[data-testid="product-title"]')
        .should('have.text', productData.products[index].title);
      cy.wrap(product)
        .find('[data-testid="product-price"]')
        .should('have.text', `\$${productData.products[index].price}`);
      cy.wrap(product)
        .find('[data-testid="product-description"]')
        .should('have.text', productData.products[index].description);
      cy.wrap(product).find('[data-testid="add-qty-btn"]').should('exist');
      cy.wrap(product)
        .find('[data-testid="delete-qty-btn"]')
        .should('not.exist');
    });
  });

  it('Check the cart', () => {
    // Assert empty cart
    cy.getTestId('cart-btn').click();
    cy.getTestId('dialog-title').should('have.text', 'Cart');
    cy.getTestId('empty-cart-message').should(
      'have.text',
      'Your cart is empty :('
    );
    cy.getTestId('cart-total').should('not.exist');
    cy.getTestId('clear-cart-btn').should('not.exist');
    cy.getTestId('checkout-btn').should('not.exist');
    cy.getTestId('close-cart-btn').should('have.text', 'Close').click();
    cy.getTestId('dialog-container').should('not.be.visible');
  });

  it('Add some products', () => {
    // Add one quantity of each product
    cy.get('[data-testid="products-container"] li').each((product) => {
      cy.wrap(product).find('[data-testid="add-qty-btn"]').click();
      cy.wrap(product)
        .find('[data-testid="product-quantity"]')
        .should('have.text', 1);
      cy.wrap(product).find('[data-testid="delete-qty-btn"]').should('exist');
    });

    // Assert cart
    cy.getTestId('cart-btn').should('have.text', 'Cart (6)').click();
    cy.get('[data-testid="cart-items-container"] li').each(
      (cartItem, index) => {
        cy.wrap(cartItem)
          .find('[data-testid="cart-item-title"]')
          .should('have.text', productData.products[index].title);
        cy.wrap(cartItem)
          .find('[data-testid="cart-item-price"]')
          .should('have.text', `\$${productData.products[index].price}`);
        cy.wrap(cartItem)
          .find('[data-testid="cart-item-delete-btn"]')
          .should('exist');
        cy.wrap(cartItem)
          .find('[data-testid="cart-item-quantity"]')
          .should('have.text', 1);
        cy.wrap(cartItem)
          .find('[data-testid="cart-item-add-btn"]')
          .should('exist');
      }
    );
    cy.getTestId('cart-total').should('have.text', 'Your Total: $859.94');
    cy.getTestId('clear-cart-btn').should('exist');
    cy.getTestId('checkout-btn').should('exist');

    // Add another quantity of each product
    cy.get('[data-testid="cart-items-container"] li').each((cartItem) => {
      cy.wrap(cartItem).find('[data-testid="cart-item-add-btn"]').click();
      cy.wrap(cartItem)
        .find('[data-testid="cart-item-quantity"]')
        .should('have.text', 2);
    });
    cy.getTestId('cart-total').should('have.text', 'Your Total: $1,719.88');
  });

  it('Delete some items', () => {
    // Remove one quantity of each product from cart
    cy.get('[data-testid="cart-items-container"] li').each((cartItem) => {
      cy.wrap(cartItem).find('[data-testid="cart-item-delete-btn"]').click();
      cy.wrap(cartItem)
        .find('[data-testid="cart-item-quantity"]')
        .should('have.text', 1);
    });
    cy.getTestId('cart-total').should('have.text', 'Your Total: $859.94');
    cy.getTestId('close-cart-btn').click();

    // Remove one quantity of each product from product card
    cy.get('[data-testid="products-container"] li').each((product) => {
      cy.wrap(product).find('[data-testid="delete-qty-btn"]').click();
      cy.wrap(product)
        .find('[data-testid="product-quantity"]')
        .should('not.exist');
      cy.wrap(product)
        .find('[data-testid="delete-qty-btn"]')
        .should('not.exist');
      cy.wrap(product).find('[data-testid="add-qty-btn"]').should('exist');
    });

    // Assert cart is empty
    cy.getTestId('cart-btn').should('have.text', 'Cart (0)').click();
    cy.getTestId('empty-cart-message').should(
      'have.text',
      'Your cart is empty :('
    );
    cy.getTestId('cart-total').should('not.exist');
    cy.getTestId('clear-cart-btn').should('not.exist');
    cy.getTestId('checkout-btn').should('not.exist');
    cy.getTestId('close-cart-btn').click();
  });

  it('Test cart buttons', () => {
    // Add one quantity of each product and open cart
    cy.get('[data-testid="products-container"] li').each((product) => {
      cy.wrap(product).find('[data-testid="add-qty-btn"]').click();
    });

    // Delete one quantity of each product until the cart becomes empty
    cy.getTestId('cart-btn').click();
    cy.get('[data-testid="cart-items-container"] li').each((cartItem) => {
      cy.wrap(cartItem).find('[data-testid="cart-item-delete-btn"]').click();
    });
    cy.getTestId('empty-cart-message').should(
      'have.text',
      'Your cart is empty :('
    );
    cy.getTestId('close-cart-btn').click();

    // Add 2 quantity of each product and open cart
    cy.get('[data-testid="products-container"] li').each((product) => {
      cy.wrap(product).find('[data-testid="add-qty-btn"]').click();
      cy.wrap(product).find('[data-testid="add-qty-btn"]').click();
    });
    cy.getTestId('cart-btn').click();

    // Click on clear cart button
    cy.getTestId('clear-cart-btn').click();

    // Assert cart is empty
    cy.getTestId('empty-cart-message').should(
      'have.text',
      'Your cart is empty :('
    );
    cy.getTestId('cart-total').should('not.exist');
    cy.getTestId('clear-cart-btn').should('not.exist');
    cy.getTestId('checkout-btn').should('not.exist');
    cy.getTestId('close-cart-btn').click();
  });
});
