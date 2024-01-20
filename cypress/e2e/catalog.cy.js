describe('Catalog Page Tests', () => {
    it('loads the main elements of the Catalog page', () => {
      cy.visit('http://localhost:3000/login');
      cy.get('input[name="email"]').type('iva@mail.com');
      cy.get('input[name="password"]').type('Iv123456');
      cy.get('button').contains('Login').click();
      cy.url().should('eq', 'http://localhost:3000/');
      cy.visit('http://localhost:3000/catalog');
      cy.get('.vr-scans-container', { timeout: 10000 }).should('exist');
      
    });

});
  