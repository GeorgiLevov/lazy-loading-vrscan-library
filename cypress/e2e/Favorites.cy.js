describe('Getting to Favorites Page', () => {
	it('Logged out user should not be able to navigate to Favorites Page', () => {
		cy.visit('http://localhost:3000/');
		cy.contains('Sign In').should('exist');
		cy.wait(500);
		cy.get('a').contains('Sign In').click();
		cy.wait(1000);
		cy.url().should('include', '/login');
	});
	it('Logged in user should be able to navigate to Favorites page and have no favorites', () => {
		cy.visit('http://localhost:3000/');
		cy.contains('Sign In').should('exist');
		cy.wait(500);
		cy.get('a').contains('Sign In').click();
		cy.url().should('eq', 'http://localhost:3000/login');
		cy.get('input[name="email"]').type(`master@gmail.com`);
		cy.get('input[name="password"]').type('testtesttest');
		cy.get('button').contains('Login').click();
		cy.url().should('eq', 'http://localhost:3000/');
		cy.contains('Explore Library').should('exist');
		cy.wait(500);
		cy.get('a').contains('Favorites').click();
		cy.url().should('eq', 'http://localhost:3000/favorites');
		cy.contains('Explore VRScans!').should('exist');
	});
});
