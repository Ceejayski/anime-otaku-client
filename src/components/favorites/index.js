import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFavoriteAnime } from '../../redux/actions/adminAnimes';
import AnimeCard from '../animeCard';

const Favourites = (props) => {
  const { getFave, faves } = props;
  useEffect(() => {
    getFave();
  }, []);
  return (
    <div style={{ minHeight: '70vh' }}>
      {faves.length < 1 ? (
        <h3> No Anime Added Yet! </h3>
      ) : (
        <>
          <div className="row">
            { faves.map((anime) => (
              <div className="col-12 col-md-3" key={anime.id}>
                <AnimeCard data={anime} main="fave" />
              </div>
            )) }
          </div>
        </>
      ) }
    </div>
  );
};

Favourites.propTypes = {
  getFave: PropTypes.func.isRequired,
  faves: PropTypes.arrayOf(Object).isRequired,
};

const mapStateToProps = (state) => ({
  faves: state.adminboard.favorites,
});

const mapDispatchToProps = {
  getFave: getFavoriteAnime,
};

export default connect(mapStateToProps, mapDispatchToProps)(Favourites);
