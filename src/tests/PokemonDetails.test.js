import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Verifies the <PokemonDetails/> Component', () => {
  beforeEach(() => {
    const {
      history: { push },
    } = renderWithRouter(<App />);
    push('/pokemons/25');
  });

  const { name, foundAt } = pokemons[0];
  it('Shows the details info', () => {
    const detailsTitle = screen.getByText(`${name} Details`);
    expect(detailsTitle).toBeInTheDocument();

    const detailLink = screen.queryByText(/more details/i);
    expect(detailLink).toBeNull();

    const summary = screen.getByRole('heading', {
      name: /summary/i,
      level: 2,
    });
    expect(summary).toBeDefined();

    const pokeInfo = screen.getByText(
      /this intelligent Pokémon roasts hard berrie/i,
    );
    expect(pokeInfo).toBeInTheDocument();
  });
  it('Contains maps with the location of a pokemon', () => {
    const locationTitle = screen.getByRole('heading', {
      name: `Game Locations of ${name}`,
      level: 2,
    });
    expect(locationTitle).toBeDefined();

    const maps = screen.getAllByAltText(`${name} location`);
    expect(maps).toHaveLength(foundAt.length);

    maps.forEach((img, i) => {
      const { map } = foundAt[i];

      expect(img).toHaveAttribute('src', map);
      expect(img).toHaveAttribute('alt', `${name} location`);
    });
  });
  it('Allows the user to favorite the pokemon', () => {
    const favCheck = screen.getByRole('checkbox', {
      name: 'Pokémon favoritado?',
    });
    userEvent.click(favCheck);
    expect(favCheck).toBeChecked();

    userEvent.click(favCheck);
    expect(favCheck).not.toBeChecked();
  });
});
