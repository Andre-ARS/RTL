import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Verifies the "<App/>" Component', () => {
  it('Contains the rights links', () => {
    renderWithRouter(<App />);

    const home = screen.getByRole('link', { name: /home/i });
    expect(home).toBeDefined();

    const about = screen.getByRole('link', { name: /about/i });
    expect(about).toBeDefined();

    const fav = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(fav).toBeDefined();
  });
  it('The link "Home" redirects to the right path', () => {
    const { history } = renderWithRouter(<App />);

    const home = screen.getByRole('link', { name: /home/i });
    userEvent.click(home);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });
  it('The link "About" redirects to the right path', () => {
    const { history } = renderWithRouter(<App />);

    const about = screen.getByRole('link', { name: /about/i });
    userEvent.click(about);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });
  it('The link "Favorite Pokémons" redirects to the right path', () => {
    const { history } = renderWithRouter(<App />);

    const favorite = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favorite);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');
  });
  it('The "Not Foud" page is rendered when the path is unknow', () => {
    const { history } = renderWithRouter(<App />);
    const { push } = history;
    push('/unknow');

    const notFound = screen.getByText('Page requested not found');
    expect(notFound).toBeInTheDocument();
  });
});
