import { describe, expect, test, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './Modal'; 

describe('Modal Component', () => {
  const title = 'Test Modal';
  const mockCloseDialog = vi.fn();

  test('renders modal with content', () => {
    render(<Modal closeDialog={mockCloseDialog} title={title}>Modal Content</Modal>);
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-label', title);
  });

  test('closes modal on backdrop click', () => {
    render(<Modal closeDialog={mockCloseDialog} title={title}>Modal Content</Modal>);
    fireEvent.click(screen.getByTestId('backdrop'));
    expect(mockCloseDialog).toHaveBeenCalled();
  });

  test('closes modal on escape key press', () => {
    render(<Modal closeDialog={mockCloseDialog} title={title}>Modal Content</Modal>);
    fireEvent.keyDown(window, { key: 'Escape', code: 'Escape' });
    expect(mockCloseDialog).toHaveBeenCalled();
  });

});
