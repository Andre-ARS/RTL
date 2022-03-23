import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Verifies the <Pokemon/> Component', () => {
  it('Renders a pokemon card', () => {
    renderWithRouter(<App />);
    const { name, type, image } = pokemons[0];

    const pokeName = screen.getByTestId('pokemon-name');
    expect(pokeName).toBeDefined();

    const pokeType = screen.getByTestId('pokemon-type');
    expect(pokeType).toBeDefined();
    const typeText = screen.getAllByText(type);
    expect(typeText[0]).toHaveAttribute('data-testid', 'pokemon-type');

    const wheight = screen.getByText(/average weight: 6\.0 kg/i);
    expect(wheight).toBeInTheDocument();

    const img = screen.getByRole('img', {
      name: /pikachu sprite/i,
    });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', image);
    expect(img).toHaveAttribute('alt', `${name} sprite`);
  });
  it('Contains details link', () => {
    const { history } = renderWithRouter(<App />);
    const { id } = pokemons[0];

    const details = screen.getByRole('link', { name: /more details/i });
    expect(details).toBeInTheDocument();
    userEvent.click(details);

    const { location: { pathname } } = history;
    expect(pathname).toBe(`/pokemons/${id}`);
  });
  it('Contains a star, if it is favorite', () => {
    const {
      history: { push },
    } = renderWithRouter(<App />);

    push('/pokemons/25');
    const favoriteSelect = screen.getByText(/pokémon favoritado\?/i);
    userEvent.click(favoriteSelect);
    push('/');

    const star = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    expect(star).toBeInTheDocument();
    expect(star).toHaveAttribute('src', '/star-icon.svg');
    expect(star).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
