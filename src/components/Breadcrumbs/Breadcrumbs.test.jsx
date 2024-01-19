import { expect, it, describe } from 'vitest';
import { screen, render } from '../../test/test.utils';
import Breadcrumbs from './Breadcrumbs';

describe('Breadcrumbs', () => {
	it('should always render the Breadcrumb nav', () => {
		render(<Breadcrumbs />);
		expect(screen.getByLabelText('Breadcrumb')).toBeInTheDocument();
	});
	it('should always show Home Crumb', () => {
		render(<Breadcrumbs />);
		expect(screen.getByText('Home')).toBeVisible();
	});
});
