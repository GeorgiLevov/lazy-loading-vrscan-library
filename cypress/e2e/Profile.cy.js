describe('Getting to Profile Page', () => {
	it('Logged out user should not be able to navigate to Profile Page', () => {
		cy.visit('http://localhost:3000/');
		cy.contains('Sign In').should('exist');
		cy.wait(500);
		cy.visit('http://localhost:3000/profile');
		cy.wait(500);
		cy.url().should('include', '/login');
	});
	it('Logged in user should be able to navigate to Profile Page', () => {
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
		cy.get('a').contains('Hi, Georgi').click();
		cy.url().should('eq', 'http://localhost:3000/profile');
		cy.contains('Account settings').should('exist');
	});
});

describe('Inside Profile Page', () => {
	it('Logged in user should be able to change their profile details', () => {
		// creating new user - since logging rates are low client side // 60 per account per X time
		cy.visit('http://localhost:3000/');
		cy.get('a').contains('Sign In').click();
		cy.get('button').contains('Sign Up').click();
		cy.get('input[name="firstName"]').type('Test');
		cy.get('input[name="lastName"]').type('User');
		const uniqueId = Date.now();
		cy.get('input[name="email"]').type(`user_${uniqueId}@mail.com`);
		cy.get('input[name="password"]').type('Passw0rd');
		cy.get('button').contains('Sign Up').click();
		cy.wait(3000);
		cy.visit('http://localhost:3000/profile');
		cy.get('#edit_first_name').click();
		cy.get('#first-name-update-input').clear().type('Cypress');
		cy.get('#edit_first_name_save').click();
		cy.wait(5000);
		cy.get('#edit_last_name').click();
		cy.get('#last-name-update-input').clear().type('Tester');
		cy.get('#edit_last_name_save').click();
		cy.wait(5000);
		cy.get('#edit_email').click();
		cy.get('#email-update-input').clear().type('new@email.com');
		cy.get('#edit_email_save').click();
		cy.get('#email-update-confirmation').type('Passw0rd');
		cy.get('#email-update-confirmation-save').click();
		cy.get('#first-name-update-input').should('have.value', 'Cypress');
		cy.get('#last-name-update-input').should('have.value', 'Tester');
		cy.get('#email-update-input').should('have.value', 'new@email.com');
	});
	// it('Logged in user should be able to change their profile image', () => {
	//     // creating new user - since logging rates are low client side // 60 per account per X time
	//     cy.visit('http://localhost:3000/');
	// 	cy.get('a').contains('Sign In').click();
	// 	cy.get('button').contains('Sign Up').click();
	// 	cy.get('input[name="firstName"]').type('Test');
	// 	cy.get('input[name="lastName"]').type('User');
	// 	const uniqueId = Date.now();
	// 	cy.get('input[name="email"]').type(`user_${uniqueId}@mail.com`);
	// 	cy.get('input[name="password"]').type('Passw0rd');
	// 	cy.get('button').contains('Sign Up').click();
	// 	cy.wait(3000);
	// 	cy.visit('http://localhost:3000/profile');
	//     cy.get('#update-profile-image').click();
	//     cy.get('input[type="file"]').as('fileInput')
	// });
});
