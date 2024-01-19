import { describe, expect, test } from 'vitest';
import { render, screen } from '../../test/test.utils';
import Picture from './Picture';

describe('Picture Component', () => {
	const src = 'test-image.jpg';
	const source1x = 'test-image-1x.jpg';
	const source2x = 'test-image-2x.jpg';
	const source3x = 'test-image-3x.jpg';
	const altText = 'Test Image';

	test('renders with correct src and alt text', () => {
		render(<Picture src={src} alt={altText} />);
		const imageElement = screen.getByAltText(altText);
		expect(imageElement).toHaveAttribute('src', src);
	});

	test('renders with correct srcSet for 3x images', () => {
		render(
			<Picture
				source1x={source1x}
				source2x={source2x}
				source3x={source3x}
				alt={altText}
			/>
		);
		const imageElement = screen.getByAltText(altText);
		expect(imageElement).toHaveAttribute(
			'srcset',
			`${source1x} 1x, ${source2x} 2x, ${source3x} 3x`
		);
	});

	test('renders with correct srcSet for 2x images', () => {
		render(<Picture source1x={source1x} source2x={source2x} alt={altText} />);
		const imageElement = screen.getByAltText(altText);
		expect(imageElement).toHaveAttribute(
			'srcset',
			`${source1x} 1x, ${source2x} 2x, ${source2x} 3x`
		);
	});
});
