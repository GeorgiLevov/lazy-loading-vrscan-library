import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import Subheading from './Subheading'; 
import { FONTS } from '../../constants'; 

describe('Subheading Component', () => {
  test('renders its children', () => {
    render(<Subheading>Test Subheading</Subheading>);
    expect(screen.getByText('Test Subheading')).toBeInTheDocument();
  });

  test('applies correct styling', () => {
    render(<Subheading>Styled Subheading</Subheading>);
    const subheadingElement = screen.getByText('Styled Subheading');
    expect(subheadingElement).toHaveStyle({
      display: 'block',
      fontSize: FONTS.heading.medium,
      paddingBottom: '20px'
    });
  });

});
