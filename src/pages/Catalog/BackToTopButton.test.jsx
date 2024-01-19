import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import BackToTopButton from './BackToTopButton';

describe('BackToTopButton Component', () => {

  beforeEach(() => {
    window.scrollTo = vi.fn();
    window.scrollY = 0;
  });

  test('becomes visible when the page is scrolled down', () => {
    render(<BackToTopButton />);
    window.scrollY = 500;
    fireEvent.scroll(window);
    expect(screen.getByTestId('back-to-top-button')).toBeInTheDocument();
  });

  test('scrolls to the top when clicked', () => {
    render(<BackToTopButton />);
    window.scrollY = 500;
    fireEvent.scroll(window);
    fireEvent.click(screen.getByTestId('back-to-top-button'));
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });
  
});
