context('Catalog Page - Integration Tests', () => {
    // Integration Tests
    beforeEach(() => {
        cy.visit('http://localhost:3000/login');
        cy.get('input[name="email"]').type('iva@mail.com');
        cy.get('input[name="password"]').type('Iv123456');
        cy.get('button').contains('Login').click();
        cy.url().should('eq', 'http://localhost:3000/');
        cy.visit('http://localhost:3000/catalog');
    });
  
    it('renders the Catalog page correctly', () => {
      cy.get('h1').contains('VRScans Catalog').should('be.visible');
      cy.get('#search-form').should('be.visible');
     
    });
  
    it('search functionality works correctly', () => {
      cy.get('#search-form').type('Metal');
      cy.wait(1500); 
      cy.get('.vr-scans-container').should('contain', 'Metal');
    });

    // E2E Test
  context('E2E Test for Logged-In User', () => {
    it('navigates to catalog page after login', () => {
      cy.visit('http://localhost:3000/login');
      // Steps to simulate user login
      cy.get('input[name="email"]').type('user@example.com');
      cy.get('input[name="password"]').type('password123');
      cy.get('button').contains('Login').click();

     
      cy.visit('http://localhost:3000/catalog');
      cy.url().should('include', '/catalog');

    });
  });
  
});
  