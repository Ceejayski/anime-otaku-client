import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { adminUsers } from '../../redux/actions/adminAnimes';
import AdminUsersTable from '../../components/adminUsersTable';

function UsersPage({ users, getusers }) {
  useEffect(() => {
    getusers();
  }, [getusers]);

  return (
    <div>
      <AdminUsersTable data={users} />
    </div>
  );
}

UsersPage.propTypes = {
  users: PropTypes.arrayOf(Object).isRequired,
  getusers: PropTypes.func.isRequired,
};

const mapStatetoProps = (state) => {
  const { users } = state.adminboard;

  return {
    users,
  };
};

const mapDispatchToProps = {
  getusers: adminUsers,
};

export default connect(mapStatetoProps, mapDispatchToProps)(UsersPage);
