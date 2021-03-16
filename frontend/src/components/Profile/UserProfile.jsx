import React, { useContext } from 'react';
import { Menu, Dropdown } from 'antd';
import UserAvatar from './UserAvatar';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../contexts/UserProvider';

const UserProfile = () => {
    const history = useHistory();
    const userInfo = useContext(UserContext);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        userInfo.setUser(null);
        history.push('/');
    }

    const menu = (
        <Menu>
          <Menu.Item key="0">
            <a onClick={handleLogout}>
              Logout
            </a>
          </Menu.Item>
        </Menu>
    );

    return (
        <Dropdown overlay={menu}>
            <a onClick={e => e.preventDefault()} style={{paddingBottom: '10px'}}>
                <UserAvatar></UserAvatar>
            </a>
        </Dropdown>
    );
}

export default UserProfile;