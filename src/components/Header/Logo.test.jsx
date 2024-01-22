import { describe, expect, test } from 'vitest';
import { render, screen } from '../../test/test.utils';
import Logo from './Logo';

describe('Logo Component', () => {
	test('renders logo image', () => {
		render(<Logo />);
		const logoImage = screen.getByRole('img', { name: /chaosgroup logo/i });
		expect(logoImage).toBeInTheDocument();
	});

	test('logo image has correct src', () => {
		render(<Logo />);
		const logoImage = screen.getByRole('img', { name: /chaosgroup logo/i });
		expect(logoImage).toHaveAttribute(
			'src',
			'/src/assets/images/chaosgroup-logo.svg'
		);
	});

	test('logo links to home page', () => {
		render(<Logo />);
		const logoLink = screen.getByRole('link');
		expect(logoLink).toHaveAttribute('href', '/');
	});
});
