/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import DataTable from 'react-data-table-component';
import { Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteAnime } from '../../redux/actions/adminAnimes';

function AdminAnimeTable({ data, deleteAnime }) {
  const Img = (row) => (
    <>
      <Image src={row.attributes.header_image.thumbnail.url} alt="pic" rounded style={{ width: '70px' }} />
    </>
  );
  const Actions = (row) => (
    <>
      <button type="button" className="btn btn-danger btn-sm me-2" onClick={() => deleteAnime(row.id)}>
        Delete anime
      </button>
      <Link to={`/admin/animes/${row.id}/update`} className="btn btn-success btn-sm"> Update </Link>
    </>
  );

  const columns = [{
    selector: (row) => row.id,
    name: 'ID',
    sortable: true,
  }, {
    selector: (row) => row.attributes.name,
    name: 'Anime',
    sortable: true,
  }, {
    selector: (row) => row.attributes.favorite_count,
    name: 'Favorite Count',
    sortable: true,
  }, {
    name: 'Thumbnail',
    cell: (row) => <Img {...row} />,
  },
  {
    name: 'Actions',
    cell: (row) => <Actions {...row} />,
  },
  ];

  return (
    <div>
      <h5 className="text-center mb-3"> Animes List </h5>
      <DataTable
        keyField="id"
        data={data}
        columns={columns}
        dense
        pagination
        center
        responsive
      />
    </div>
  );
}

AdminAnimeTable.propTypes = {
  data: PropTypes.arrayOf(Object).isRequired,
  deleteAnime: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  deleteAnime,
};

export default connect(null, mapDispatchToProps)(AdminAnimeTable);
