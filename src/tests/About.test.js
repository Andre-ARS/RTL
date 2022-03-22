import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import About from '../components/About';

describe('Verifies the "<About/>" Component', () => {
  beforeEach(() => {
    renderWithRouter(<About />);
  });

  it('Contains a title with the text "About Pokédex"', () => {
    const aboutTitle = screen.getByRole('heading', { name: /about pokédex/i, level: 2 });
    expect(aboutTitle).toBeInTheDocument();
  });
  it('Contains 2 texts about the pokédex', () => {
    const infoText1 = screen.getByText(/this application simulates a pokédex/i);
    expect(infoText1).toBeInTheDocument();

    const infoText2 = screen.getByText(/One can filter Pokémons by type, and see more/i);
    expect(infoText2).toBeInTheDocument();
  });
  it('Contains a image of a pokédex', () => {
    const image = screen.getByRole('img');
    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/';
    expect(image).toBeInTheDocument();

    expect(image).toHaveAttribute('src', `${url}800px-Gen_I_Pok%C3%A9dex.png`);
  });
});
