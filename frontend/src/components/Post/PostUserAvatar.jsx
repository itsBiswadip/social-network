import React from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { blue } from '@ant-design/colors';

const PostUserAvatar = ({userName}) => {

    const initialLetter = userName? userName[0].toUpperCase() : null;

    if(userName)    
        return (
            <Avatar style={{ color: '#fff', backgroundColor: blue.primary }}>{initialLetter}</Avatar>
        );
    
    return (
        <Avatar style={{ color: '#fff', backgroundColor: blue.primary }} icon={<UserOutlined />}/>
    );
}

export default PostUserAvatar;