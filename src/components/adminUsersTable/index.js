/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DataTable from 'react-data-table-component';
import { deleteUsers, makeUsersAdmin, removeUsersAdmin } from '../../redux/actions/adminAnimes';

function AdminUsersTable({
  data, removeAdmin, makeAdmin, deleteUser,
}) {
  const attributes = data.map(({ id, attributes }) => ({ id, ...attributes }));
  const MakeAdmin = (row) => (
    <>
      <button type="button" className="btn btn-danger btn-sm me-2" onClick={() => deleteUser(row.id)}>
        Delete user
      </button>
      {row.admin ? (
        <button type="button" className="btn btn-warning btn-sm me-2" onClick={() => removeAdmin(row.id)}>
          Remove Admin
        </button>
      ) : (
        <button type="button" className="btn btn-primary btn-sm" onClick={() => makeAdmin(row.id)}>
          Make Admin
        </button>
      ) }
    </>
  );
  const columns = [{
    selector: (row) => row.id,
    name: 'ID',
    sortable: true,
  }, {
    selector: (row) => row.username,
    name: 'Username',
    sortable: true,
  }, {
    selector: (row) => row.email,
    name: 'Email  ',
    sortable: true,
  },
  {
    name: 'Action',
    // eslint-disable-next-line react/jsx-props-no-spreading
    cell: (row) => <MakeAdmin {...row} />,
  },
  ];

  return (
    <div>
      <h5 className="text-center mb-3"> Users List </h5>
      <DataTable keyField="id" data={attributes} columns={columns} />
    </div>
  );
}

AdminUsersTable.propTypes = {
  data: PropTypes.arrayOf(Object).isRequired,
  makeAdmin: PropTypes.func.isRequired,
  removeAdmin: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  makeAdmin: makeUsersAdmin,
  removeAdmin: removeUsersAdmin,
  deleteUser: deleteUsers,
};

export default connect(null, mapDispatchToProps)(AdminUsersTable);
