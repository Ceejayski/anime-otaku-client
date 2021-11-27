import React from 'react';
import { Container } from 'react-bootstrap';
import AnimeCarousel from '../../components/animeCarousel';
import Jumbroton from '../../components/jumbotron';

export default function HomePage() {
  return (
    <div className="user-page">
      <Jumbroton />
      {/* <div style={{ minWidth: '400px' }}>here</div> */}
      <Container>
        <AnimeCarousel />
      </Container>
    </div>
  );
}
