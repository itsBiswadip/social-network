import React, { useContext } from 'react';
import { UserContext } from '../../contexts/UserProvider';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { blue } from '@ant-design/colors';

const UserAvatar = (props) => {
    const userInfo = useContext(UserContext);
    const { user } = userInfo;
    const userName = (user && user.userName)? user.userName[0].toUpperCase() : null;

    if(userName)    
        return (
            <Avatar style={{ color: '#fff', backgroundColor: blue.primary }}>{userName}</Avatar>
        );
    
    return (
        <Avatar style={{ color: '#fff', backgroundColor: blue.primary }} icon={<UserOutlined />}/>
    );
}

export default UserAvatar;