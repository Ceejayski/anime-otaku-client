import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import userServices from '../../auth/users.service';
import {
  addFavoriteAnime,
  getFavoriteAnime,
  removeFavoriteAnime,
} from '../../redux/actions/adminAnimes';
import Details from '../details';
// import { animeFinder } from '../../redux/utils/action.utils';

const AnimeDetails = ({ favorites, getFave, addFave, removeFave, user }) => {
  const { id } = useParams();
  const [animeDetails, setAnimeDetails] = useState();
  const favoriteAnime = () => {
    const animeExist = favorites.find((anime) => anime.attributes.slug === id);

    if (animeExist) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    userServices.showUserAnime(id).then(
      (res) => {
        setAnimeDetails(res.data.data);
      },
      (error) => {
        toast.error(`Error loading ${id}`);
        throw error;
      },
    );
    if (user) {
      getFave(user.id);
    }
  }, [addFave]);
  return (
    <>
      {animeDetails !== undefined && (
        <Details
          data={animeDetails}
          addFave={addFave}
          removeFave={removeFave}
          favorite={favoriteAnime}
        />
      )}
    </>
  );
};

AnimeDetails.propTypes = {
  favorites: PropTypes.arrayOf(Object).isRequired,
  getFave: PropTypes.func.isRequired,
  addFave: PropTypes.func.isRequired,
  removeFave: PropTypes.func.isRequired,
  user: PropTypes.shape().isRequired,
};

const mapStateToProps = (state) => {
  const { favorites } = state.adminboard;
  const { user } = state.auth;
  return {
    favorites,
    user,
  };
};

const mapDispatchToProps = {
  getFave: getFavoriteAnime,
  addFave: addFavoriteAnime,
  removeFave: removeFavoriteAnime,
};

export default connect(mapStateToProps, mapDispatchToProps)(AnimeDetails);
