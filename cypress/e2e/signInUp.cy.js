describe('SignInSignUp', () => {
    // E2E test for Sign In
    it('should allow a user to login', () => {
      cy.visit('http://localhost:3000/login');
      cy.get('input[name="email"]').type('iva@mail.com');
      cy.get('input[name="password"]').type('Iv123456');
      cy.get('button').contains('Login').click();
      cy.url().should('eq', 'http://localhost:3000/');
    });
  
    // E2E test for Sign Up
    it('should allow a user to sign up', () => {
      cy.visit('http://localhost:3000/login');
      cy.get('button').contains('Sign Up').click();
      cy.get('input[name="firstName"]').type('Test');
      cy.get('input[name="lastName"]').type('User');
      const uniqueId = Date.now();
      cy.get('input[name="email"]').type(`test${uniqueId}@mail.com`);
      cy.get('input[name="password"]').type('Passw0rd');
      cy.get('button').contains('Sign Up').click();
      cy.url().should('eq', 'http://localhost:3000/');
    });
  
    // Integration test for invalid login
    it('should display an error message on invalid login', () => {
      cy.visit('http://localhost:3000/login');
      cy.get('input[name="email"]').type('invalid@example.com');
      cy.get('input[name="password"]').type('invalidpassword');
      cy.get('button').contains('Login').click();
      cy.get('.error-message').should('exist');
    });
  
    // Integration test for invalid sign up
    it('should display an error message on invalid sign up', () => {
      cy.visit('http://localhost:3000/login');
      cy.get('button').contains('Sign Up').click();
      cy.get('input[name="firstName"]').type('John');
      cy.get('button').contains('Sign Up').click();
      cy.get('.error-message').should('exist');
    });
  });
  