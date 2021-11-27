import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import StarRating from 'react-svg-star-rating';
import { Link } from 'react-router-dom';
import PlaceHolder from '../../assets/images/slide.jpg';
import './style.scss';

function Details({ data, favorite, addFave, removeFave }) {
  const { user } = useSelector((state) => state.auth);
  const { name, rating, genre_list, header_image, description } = data.attributes;
  return (
    <div style={{ marginTop: '30px' }} className="position-relative anime-data pb-4">
      <div className="position-relative">
        <img
          src={header_image.url ? header_image.url : PlaceHolder}
          alt="anime-pic"
          className="w-100"
          style={{ height: '50vh' }}
        />
        <div className="position-absolute" style={{ left: '5%', bottom: '5%' }}>
          <h6 className="text-white">{name}</h6>
          <div>
            <StarRating isReadOnly initialRating={rating} unit="float" size={13} />
          </div>
        </div>
      </div>
      <div className="container px-0">
        <div className="mx-auto mt-3" style={{ width: '80%' }}>
          <p>
            Tags:
            {genre_list.join(', ')}
          </p>
          <h6> About Anime</h6>
          <p>{description}</p>
        </div>
        <div className="w-100 position-sticky" style={{ bottom: 0 }}>

          {user ? (
            <>
              {!favorite() ? (
                <button
                  type="button"
                  onClick={() => {
                    addFave(data);
                  }}
                >
                  Add to Favorites
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    removeFave(user.id, data.id);
                  }}
                >
                  Remove from Favorites
                </button>
              )}
            </>
          ) : (
            <Link to="/login"> Add to Favorites </Link>
          )}
        </div>
      </div>
    </div>
  );
}

Details.propTypes = {
  data: PropTypes.shape().isRequired,
  favorite: PropTypes.func.isRequired,
  addFave: PropTypes.func.isRequired,
  removeFave: PropTypes.func.isRequired,
};

export default Details;
