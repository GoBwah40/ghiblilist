import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Card from '@/components/card';

describe('Card', () => {
  it('affiche le film et pointe vers sa fiche', () => {
    render(
      <Card
        film={{
          id: '58611129-2dbc-4a81-a72f-77ddfc1b1b49',
          title: 'My Neighbor Totoro',
          original_title: 'となりのトトロ',
          original_title_romanised: 'Tonari no Totoro',
          release_date: '1988',
          image: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/totoro.jpg',
        }}
      />,
    );
    expect(screen.getByRole('heading', { name: 'My Neighbor Totoro' })).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      '/films/58611129-2dbc-4a81-a72f-77ddfc1b1b49',
    );
    // L'affiche est décorative : le titre nomme déjà le lien.
    expect(screen.getByRole('link')).toHaveAccessibleName(/^My Neighbor Totoro/);
  });

  it('sans titre romanisé, affiche le titre original et pas de séparateur orphelin', () => {
    render(
      <Card
        film={{
          id: '337703',
          title: 'The Red Turtle',
          original_title: 'La Tortue rouge',
          original_title_romanised: '',
          release_date: '2016',
          image: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/turtle.jpg',
        }}
      />,
    );
    expect(screen.getByRole('link')).toHaveAccessibleName(
      /^The Red Turtle La Tortue rouge\s*,\s*2016$/,
    );
  });
});
