import { describe, expect, test } from 'vitest';
import { screen, render } from '../../test/test.utils';
import Loader from './Loader';

describe('Loader Component', () => {
	test('renders loading animation when isLoading is true', () => {
		render(
			<Loader isLoading={true} variant="base">
				<div>Child Content</div>
			</Loader>
		);
		expect(screen.getByTestId('loading-animation')).toBeInTheDocument();
		expect(screen.queryByText('Child Content')).not.toBeInTheDocument();
	});

	test('renders children when isLoading is false', () => {
		render(
			<Loader isLoading={false}>
				<div>Child Content</div>
			</Loader>
		);
		expect(screen.getByText('Child Content')).toBeInTheDocument();
		expect(screen.queryByTestId('loading-animation')).not.toBeInTheDocument();
	});

	test('applies correct style based on variant', () => {
		const { rerender } = render(
			<Loader isLoading={true} variant="profile">
				<div>Child Content</div>
			</Loader>
		);
		expect(screen.getByTestId('overlay')).toHaveStyle({
			background: 'rgba(0, 0, 0, 0.5)',
		});

		rerender(
			<Loader isLoading={true} variant="vrscan">
				<div>Child Content</div>
			</Loader>
		);
		expect(screen.getByTestId('overlay')).toHaveStyle({
			background: 'transparent',
		});
	});
});
