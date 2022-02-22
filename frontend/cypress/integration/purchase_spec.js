describe('Start the app', () => {
    it('visit the index page and click START', () => {
        cy.visit('/');
        cy.contains('START').click();
        cy.url().should('include', '/shop');
        cy.get('h3').should('contain', 'Phone XL');
    })
  })

  describe('Make the purchase', () => {
    it('user purchases phone XL', () => {
        cy.visit('/shop');
        // Click "See details" button
        cy.contains('See details').click();
        // Click "add to cart" button
        cy.contains('Add to cart').click();
        // Click Shopping-cart Icon
        cy.get('svg').click();
        // Make sure the shopping cart page contains the product we've added to cart
        cy.get('h3').should('contain', 'Phone XL = 1');
        // Click checkout
        cy.contains('Checkout').click();
        // Toggle the quantity to "0" to make sure the toggling works
        cy.get('button').contains('-').click();
        // The total price should be "0" now
        cy.get('h3').should('contain', 'Total: 0 EUR');
        // Toggling the quantity again to make it 1
        cy.get('button').contains('+').click();
        // The total price should be "799" now
        cy.get('h3').should('contain', 'Total: 799 EUR');
        // Fill in CC details
        cy.get('form').within(($form) => {
            cy.get('input[placeholder="Card number"]').type('5555555555555')
            cy.get('input[placeholder="Exp date"]').type('07.25')
            cy.get('input[placeholder="Cvv"]').type('358')
          })
          cy.get('button').contains('BUY').click();
    })
  })