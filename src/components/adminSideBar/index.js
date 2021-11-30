import {
  ProSidebar, Menu, MenuItem, SubMenu,
} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import './style.scss';

import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminSideBar() {
  return (
    <div className="admin-sidebar">
      <ProSidebar style={{ minWidth: 'none' }}>
        <Menu iconShape="square">
          <MenuItem><Link to="/"> Home</Link></MenuItem>
          <MenuItem><Link to="/admin"> Users</Link></MenuItem>
          <SubMenu title="Animes">
            <MenuItem>
              {' '}
              <Link to="/admin/anime"> All Anime </Link>
              {' '}
            </MenuItem>
            <MenuItem>
              {' '}
              <Link to="/admin/animes/new"> Create new Anime </Link>
            </MenuItem>
          </SubMenu>
        </Menu>
      </ProSidebar>
      ;
    </div>
  );
}
