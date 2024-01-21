describe('Home and Authentication Tests', () => {

    // Integration test: tenders correctly for non-logged-in user
    describe('Home Component Tests', () => {
        it('renders Sign In button for non-logged-in users', () => {
          cy.visit('http://localhost:3000/');
          cy.contains('Sign In').should('exist');
        }); 
    }); 

    // E2E Test: non-logged-in user interaction on Home page
    describe('Home Page for Non-Logged-In User', () => {
        it('should navigate to login page on trying to access the catalog', () => {
          cy.visit('http://localhost:3000/catalog');
          cy.url().should('include', '/login');
        });
      });

      // E2E Test: logged-in user accessing Home page
      describe('Home Page - Logged In User', () => {
        it('shows Explore Library for logged in users', () => {
          cy.visit('http://localhost:3000/login');
          cy.get('input[name="email"]').type('iva@mail.com');
          cy.get('input[name="password"]').type('Iv123456');
          cy.get('button').contains('Login').click();
          cy.url().should('eq', 'http://localhost:3000/');
    
          cy.contains('a', 'Explore Library').should('be.visible');
        });
      }); 
  
  });
  