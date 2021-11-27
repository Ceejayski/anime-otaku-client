/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Carousel from 'react-multi-carousel';
import { userAnime } from '../../redux/actions/adminAnimes';
import AnimeCard from '../animeCard';

const AnimeCarousel = ({ anime, getUserAnime, user }) => {
  const [slide, setSlide] = useState(1);
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      paritialVisibilityGutter: 60,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      paritialVisibilityGutter: 50,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      paritialVisibilityGutter: 20,
    },
  };
  const slideRef = useRef();
  useEffect(() => {
    getUserAnime();
  }, [getUserAnime]);

  return (
    <>
      <h3 className="text-center">Top Anime</h3>
      <div className="w-100 pb-5" id="animes">
        {anime.length > 0 && (
          <>
            <Carousel
              ssr
              partialVisbile
              itemClass="image-item"
              ref={slideRef}
              responsive={responsive}
              afterChange={(previousSlide, { currentSlide }) => {
                setSlide(currentSlide + 1);
              }}
            >
              {anime.map((anime) => (
                <AnimeCard data={anime} key={anime.id} />
              ))}
            </Carousel>
            <p className="text-center">
              {slide}/{anime.length}
            </p>
          </>
        )}
        {console.log(slideRef)}
        {console.log(user)}
      </div>
    </>
  );
};

AnimeCarousel.propTypes = {
  getUserAnime: PropTypes.func.isRequired,
  user: PropTypes.shape().isRequired,
  anime: PropTypes.arrayOf(Object).isRequired,
};

const mapStateToProps = (state) => {
  const { usersAnime } = state.adminboard;
  const { user } = state.auth;
  return {
    anime: usersAnime,
    user,
  };
};

const mapDispatchToProps = {
  getUserAnime: userAnime,
};

export default connect(mapStateToProps, mapDispatchToProps)(AnimeCarousel);
