import { describe, expect, test } from 'vitest';
import { render, screen } from '../../test/test.utils';
import VisuallyHidden from './VisuallyHidden';

describe('VisuallyHidden Component', () => {
	test('renders its children and applies visual hiding styles', () => {
		render(<VisuallyHidden>Hidden Content</VisuallyHidden>);
		const hiddenElement = screen.getByText('Hidden Content');

		expect(hiddenElement).toBeInTheDocument();
		expect(hiddenElement).toHaveStyle({
			display: 'inline-block',
			overflow: 'hidden',
			clip: 'rect(0 0 0 0)',
			height: '1px',
			width: '1px',
			margin: '-1px',
			padding: '0',
			border: '0',
		});
	});
});
