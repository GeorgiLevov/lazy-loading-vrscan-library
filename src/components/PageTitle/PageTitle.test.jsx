import { describe, expect, test } from 'vitest';
import { render, screen } from '../../test/test.utils';
import PageTitle from './PageTitle';
import { FONTS, SPACING } from '../../constants';

describe('PageTitle Component', () => {
	test('renders its children', () => {
		render(<PageTitle>Test Page Title</PageTitle>);
		expect(screen.getByText('Test Page Title')).toBeInTheDocument();
	});

	test('applies correct styling', () => {
		render(<PageTitle>Styled Page Title</PageTitle>);
		const pageTitleElement = screen.getByText('Styled Page Title');
		expect(pageTitleElement).toHaveStyle({
			display: 'block',
			fontSize: FONTS.heading.xl,
			paddingBottom: SPACING.medium,
		});
	});
});
