import { screen } from '@testing-library/react';
import React from 'react';
import { NotFound } from '../components';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Verifies the component "<NotFound />"', () => {
  beforeEach(() => {
    renderWithRouter(<NotFound />);
  });

  it('Contains a heading with the text "Page requested not found 😭"', () => {
    const title = screen.getByRole('heading',
      { name: /page requested not found crying emoji/i, level: 2 });

    expect(title).toBeInTheDocument();
  });
  it('Contains a image with the right url', () => {
    const image = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });
    expect(image).toHaveAttribute('src',
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
