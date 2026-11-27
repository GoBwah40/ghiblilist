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
    expect(screen.getByAltText('My Neighbor Totoro poster')).toBeInTheDocument();
  });
});
