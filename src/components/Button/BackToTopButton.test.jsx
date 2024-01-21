import { expect, it, describe } from 'vitest';
import { screen, render } from '../../test/test.utils';
import BackToTopButton from './BackToTopButton';

describe('BackToTopButton', async () => {
	it('should always hide on screen before scroll', () => {
		// const tree = renderer.create(<BackToTopButton />).toJSON();
		render(<BackToTopButton />);
		expect(screen.getByTestId('scrollToTop')).not.toBeVisible();
	});
});
