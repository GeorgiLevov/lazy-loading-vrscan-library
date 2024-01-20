describe('Home Page Tests', () => {
    beforeEach(() => {
      
      cy.visit('http://localhost:3000'); 
    });
  
    it('loads the main elements of the Home page', () => {
      cy.get('header').should('exist');
      cy.get('video').should('exist').should('be.visible');
      cy.get('#hero-text').should('exist').should('be.visible');
      cy.get('p').should('exist');
      cy.get('footer').should('exist');
    });
  
    // it('displays "Explore Library" button for authenticated users', () => {
    //   cy.get('button').contains('Explore Library').should('exist').should('be.visible');
    // });
  
    // it('displays "Sign In" button for non-authenticated users', () => {
    //   cy.get('button').contains('Sign In').should('exist').should('be.visible');
    // });
  
    // it('navigates to the Catalog page when "Explore Library" button is clicked', () => {
    //   cy.get('button').contains('Explore Library').click();
    //   cy.url().should('include', '/catalog'); 
    // });
  
    // it('navigates to the Login page when "Sign In" button is clicked', () => {
   
    //   cy.get('button').contains('Sign In').click();
    //   cy.url().should('include', '/login'); 
    // });
  });
  