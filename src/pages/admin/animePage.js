import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { adminAnime } from '../../redux/actions/adminAnimes';
import AdminAnimeTable from '../../components/adminAnimeTable';

function AnimePage({ animes, getanime }) {
  useEffect(() => {
    getanime();
  }, []);

  return (
    <div>
      <AdminAnimeTable data={animes} />
    </div>
  );
}

AnimePage.propTypes = {
  animes: PropTypes.arrayOf(Object).isRequired,
  getanime: PropTypes.func.isRequired,
};

const mapStatetoProps = (state) => {
  const { animes } = state.adminboard;

  return {
    animes,
  };
};

const mapDispatchToProps = {
  getanime: adminAnime,
};

export default connect(mapStatetoProps, mapDispatchToProps)(AnimePage);
