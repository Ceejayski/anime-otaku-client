import React from 'react';
import { Container } from 'react-bootstrap';
import AnimeCarousel from '../../containers/animeCarousel';
import Jumbroton from '../../components/jumbotron';

export default function HomePage() {
  return (
    <div className="user-page">
      <Jumbroton />
      {/* <div style={{ minWidth: '400px' }}>here</div> */}
      <Container className="px-3">
        <AnimeCarousel />
      </Container>
    </div>
  );
}
