import { expect, it, describe, vi } from 'vitest';
import { screen, render } from '../../test/test.utils';
import renderer from 'react-test-renderer';
import Card from './Card';
import { COLORS } from '../../constants';
import defaultImg from '../../assets/images/default_image.svg';

describe('Card', async () => {
	it('should always error when no "variant" provided', () => {
		vi.spyOn(console, 'error').mockImplementation(() => null);
		expect(() => render(<Card />)()).toThrow();
	});
	it('should always show the card element when the variant is provided', () => {
		render(<Card variant="base" name="Test Card" />);
		expect(screen.getByTestId('card')).toBeInTheDocument();
	});

	it('should apply default styles when variant="base" is set', () => {
		const tree = renderer.create(<Card variant="base" />).toJSON();
		expect(tree).toHaveStyleRule('width', '100%');
		expect(tree).toHaveStyleRule('background-color', COLORS.white);
		expect(tree).toHaveStyleRule('overflow', 'hidden');
		expect(tree).toHaveStyleRule('display', 'flex');
		expect(tree).not.toHaveStyleRule('flex-direction', 'row');
	});

	it('should apply vrscan styles when variant="vrscan" is set', () => {
		const tree = renderer.create(<Card variant="vrscan" />).toJSON();
		expect(tree).toHaveStyleRule('padding', '0');
		expect(tree).toHaveStyleRule('border', `1px solid ${COLORS.gray.light}`);
		expect(tree).toHaveStyleRule('justify-content', 'space-between');
	});

	it('should be able to apply all props when variant="vrscan" is set', () => {
		render(
			<Card
				variant="vrscan"
				scanId={1}
				summary={[
					"{ 'id': 1, 'name': 'Leather' }",
					["{ 'id': 21, 'name': 'Black' }"],
					["{ 'id': 4, 'name': 'Perforated' }"],
				]}
				name="Test Card"
				imageSrc={defaultImg}
				imageAlt="test image"
				favorited={true}
				toggleFavorite={() => false}>
				<p>Some sample details text</p>
			</Card>
		);
		expect(screen.getByTestId('card-summary')).toBeInTheDocument();
		expect(screen.getByTestId('card-image')).toBeInTheDocument();
		expect(screen.getByTestId('card-details')).toBeInTheDocument();
	});
});
