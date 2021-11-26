import React from 'react';
import { Container } from 'react-bootstrap';
import './style.scss';

export default function Jumbroton() {
  return (

    <div className="w-100 jumbotron d-flex align-items-center">
      <Container>
        <div className="text-white">
          <h1>Best Anime Review Site</h1>
          <p className="w-100 lead" style={{ maxWidth: '700px' }}>
            &quot;Religion, ideology, resources, land, spite,
            love or just because…
            No matter how pathetic the reason,
            it’s enough to start war. War will never cease to exist…
            reasons can be thought up after the fact… Human nature pursues strife.&quot;
            <strong>
              ~ Yahiko Paine (Naruto Shippuden)
            </strong>
          </p>
          <button type="button" className="btn btn-lg text-white explore-btn">
            Explore
          </button>
        </div>
      </Container>
    </div>

  );
}
