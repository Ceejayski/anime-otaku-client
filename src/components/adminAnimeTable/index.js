import React from 'react';
import PropTypes from 'prop-types';
import DataTable from 'react-data-table-component';

function AdminAnimeTable({ data }) {
  const columns = [{
    selector: (row) => row.id,
    name: 'ID',
  }, {
    selector: (row) => row.name,
    name: 'Anime',
  }, {
    selector: (row) => row.description,
    name: 'Description',
  }];

  return (
    <div>
      <h5 className="text-center mb-3"> Animes List </h5>
      <DataTable keyField="id" data={data} columns={columns} noDataIndication="There are no users here" />
    </div>
  );
}

AdminAnimeTable.propTypes = {
  data: PropTypes.arrayOf(Object).isRequired,
};

export default AdminAnimeTable;
