import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import { FavoritePokemons } from '../components';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Verifies the Component "<FavoritePokemons />"', () => {
  it('Shows the message "No favorite pokemon found", if theres none favorited', () => {
    renderWithRouter(<FavoritePokemons />);
    const favoriteText = screen.getByText(/no favorite pokemon found/i);
    expect(favoriteText).toBeDefined();
  });
  it('Shows all favorited pokemons', () => {
    const { history: { push } } = renderWithRouter(<App />);

    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);

    const favoriteSelect = screen.getByText(/pokémon favoritado\?/i);
    userEvent.click(favoriteSelect);
    push('/favorites');

    const name = screen.getByText(/pikachu/i);
    expect(name).toBeInTheDocument();
  });
});
