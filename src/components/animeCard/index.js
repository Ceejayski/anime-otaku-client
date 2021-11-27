import React from 'react';
import PropTypes from 'prop-types';
import StarRating from 'react-svg-star-rating';
import './style.scss';
import { Link } from 'react-router-dom';

function AnimeCard({ data }) {
  const { name, header_image, rating, genre_list, slug } = data.attributes;
  return (
    <div className="py-5">
      <Link to={`/animes/${slug}`}>
        <div className="anime-card card">
          {header_image.url != null ? (
            <img src={header_image.thumbnail.url} className="card-img-top" alt={data.id} />
          ) : (
            <img src="http://placehold.jp/290x290.png" className="card-img-top" alt="pic" />
          )}

          <div className="card-body p-1 shadow">
            <div className="d-flex justify-content-between">
              <h6 className="card-title">{name}</h6>
              <p className="mb-0">
                {genre_list.slice(0, 2).map((genre) => (
                  <span className="card-genre me-1" key={genre}>
                    {genre}
                  </span>
                ))}
              </p>
            </div>
            <StarRating isReadOnly initialRating={rating} unit="float" size={14} />
          </div>
        </div>
      </Link>
    </div>
  );
}

AnimeCard.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default AnimeCard;
