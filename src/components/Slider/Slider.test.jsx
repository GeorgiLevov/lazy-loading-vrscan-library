import { describe, expect, test } from 'vitest';
import { render, screen } from '../../test/test.utils';
import Slider from './Slider';

describe('Slider Component', () => {
	const contents = [
		{
			thumb: 'https://download.chaos.com/images/vrscans/thumb/sld53',
			name: 'Image 1',
		},
		{
			thumb: 'https://download.chaos.com/images/vrscans/thumb/sld53',
			name: 'Image 2',
		},
	];

	test('renders the first slide initially', () => {
		render(<Slider contents={contents} />);
		const firstSlideImage = screen.getByAltText('Image 1 | Image');
		expect(firstSlideImage).toBeInTheDocument();
	});
});
