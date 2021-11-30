import React from 'react';
import { Container } from 'react-bootstrap';
import Favorites from '../../containers/favorites';

export default function UserFavouritePage() {
  return (
    <div className="mt-5">
      <Container>
        <Favorites />
      </Container>
    </div>
  );
}
