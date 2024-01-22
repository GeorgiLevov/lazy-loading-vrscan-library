import { expect, it, describe, vi } from 'vitest';
import { screen, render } from '../../test/test.utils';
import renderer from 'react-test-renderer';
import Button from './Button';
import { Feather } from 'react-feather';
import { COLORS } from '../../constants';

describe('Button', async () => {
	it('should always error when no "variant" provided', () => {
		vi.spyOn(console, 'error').mockImplementation(() => null);
		expect(() => render(<Button />)()).toThrow();
	});

	it('should always create a button when "variant" provided', () => {
		render(<Button variant="base" />);
		expect(screen.getByTestId('button')).toBeInTheDocument();
	});
	it('should apply default styles when variant="base" is set', () => {
		const tree = renderer.create(<Button variant="base" />).toJSON();
		expect(tree).toHaveStyleRule('color', 'inherit');
		expect(tree).toHaveStyleRule('border', '0');
		expect(tree).toHaveStyleRule('cursor', 'pointer');
		expect(tree).not.toHaveStyleRule('background-color');
		expect(tree).toHaveStyleRule('font-family', `'Helvetica',sans-serif`);
		expect(tree).toHaveStyleRule('font-weight', '300');
	});
	it('should apply styles according to passed props', () => {
		const tree = renderer
			.create(<Button variant="primary" size="small" />)
			.toJSON();
		expect(tree).toHaveStyleRule('background-color', COLORS.primaryBlue);
		expect(tree).toHaveStyleRule('font-size', `var(--fontSize)`);
	});
	it('should show Icon when Icon element provided', () => {
		render(<Button variant="filter" icon={Feather} iconfirst={true} />);
		const icon = document.querySelector('svg');
		expect(icon).toBeInTheDocument();
	});
});
