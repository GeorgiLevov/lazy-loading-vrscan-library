describe('SignInSignUp', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  });

  it('should allow a user to login', () => {
    cy.get('input[name="email"]').type('iva@mail.com'); 
    cy.get('input[name="password"]').type('Iv123456'); 
    cy.get('button').contains('Login').click();
    cy.url().should('eq', 'http://localhost:3000/');
  });

  it('should allow a user to sign up', () => {
    cy.get('button').contains('Sign Up').click();
    cy.get('input[name="firstName"]').type('Test'); 
    cy.get('input[name="lastName"]').type('User'); 
    cy.get('input[name="email"]').type('test@test.com'); 
    cy.get('input[name="password"]').type('Passw0rd'); 
    cy.get('button').contains('Sign Up').click();

    cy.url().should('eq', 'http://localhost:3000/');
  });

  it('should display an error message on invalid login', () => {
    cy.get('input[name="email"]').type('invalid@example.com'); 
    cy.get('input[name="password"]').type('invalidpassword'); 
    cy.get('button').contains('Login').click();
    cy.get('.error-message').should('exist');
   
  });

  it('should display an error message on invalid sign up', () => {
    cy.get('button').contains('Sign Up').click();
    cy.get('input[name="firstName"]').type('John'); 
    cy.get('button').contains('Sign Up').click();
    cy.get('.error-message').should('exist');
  });
});
