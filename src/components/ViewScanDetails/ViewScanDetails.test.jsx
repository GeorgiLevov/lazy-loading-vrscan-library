import { describe, expect, test } from 'vitest';
import { render, screen, fireEvent } from '../../test/test.utils';
import ViewScanDetails from './ViewScanDetails';

describe('ViewScanDetails Component', () => {
	const mockScan = {
		name: 'Test Scan',
		thumb: 'test-thumb.jpg',
		manufacturer: 'Test Manufacturer',
		material: "{'name':'Test Material'}",
		industries: ["{ 'id': 1, 'name': 'Automotive' }"],
		colors: ["{'name':'Red'}", "{'name':'Blue'}"],
		tags: ["{'name':'Outdoor'}", "{'name':'Indoor'}"],
	};

	test('renders the button to view scan details', () => {
		render(<ViewScanDetails scan={mockScan} />);
		expect(screen.getByText('View Scan Details')).toBeInTheDocument();
	});

	test('opens modal with correct content when button is clicked', () => {
		render(<ViewScanDetails scan={mockScan} />);
		fireEvent.click(screen.getByText('View Scan Details'));
		expect(screen.getByText('Test Scan')).toBeInTheDocument();
		expect(screen.getByAltText('Test Scan')).toHaveAttribute(
			'src',
			'test-thumb.jpg'
		);
	});

	test('closes modal on backdrop click', async () => {
		render(<ViewScanDetails scan={mockScan} />);
		fireEvent.click(screen.getByText('View Scan Details'));
		fireEvent.click(screen.getByTestId('backdrop'));
	});
});
