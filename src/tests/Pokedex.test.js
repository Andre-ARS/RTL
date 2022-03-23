import React from 'react';
import { getByText, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import pokemons from '../data';

const ONE = 1;
const TWO = 2;
const SEVEN = 7;

describe('Verifies the <Pokedex/> ', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('Have a title with the right text', () => {
    const title = screen.getByRole('heading', {
      name: /encountered pokémons/i,
      level: 2,
    });
    expect(title).toBeDefined();
  });
  it('Next button works as expected', () => {
    const next = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(next).toBeInTheDocument();

    pokemons.forEach(({ name }, i) => {
      const pokeName = screen.getByText(name);
      expect(pokeName).toBeInTheDocument();
      userEvent.click(next);

      if (i === pokemons.length - ONE) expect(screen.getByText(/pikachu/i)).toBeDefined();
    });
  });
  it('Got 1 pokemon at a time', () => {
    const name = screen.getAllByTestId('pokemon-name');
    expect(name).toHaveLength(ONE);
  });
  it('Have the right filters', () => {
    const all = screen.getByRole('button', { name: /all/i });
    expect(all).toBeDefined();

    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    expect(filterButtons).toHaveLength(SEVEN);

    const psychicButton = screen.getByRole('button', { name: /psychic/i });
    expect(psychicButton).toBeDefined();

    userEvent.click(psychicButton);
    const type = screen.getAllByText(/psychic/i);
    expect(type).toHaveLength(TWO);

    userEvent.click(all);
  });
});
