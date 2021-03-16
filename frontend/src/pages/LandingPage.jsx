import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { UserContext } from '../contexts/UserProvider';
import { message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const LandingPage = () => {
    const userInfo = useContext(UserContext);
    const history = useHistory();

    useEffect(()=>{
        const isLoggedIn = !!(userInfo.user);
        const authToken = localStorage.getItem('authToken');
        if(!isLoggedIn) {
            if(authToken) {
                fetch(`${process.env.REACT_APP_BASE_API_URL}/api/users`,{
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization' : authToken
                    }
                })
                .then(async (res) => {
                    const data = await res.json();
                    if(!res.ok) {
                        data.statusCode = data.statusCode || res.status;
                        return Promise.reject(data);
                    }
                    userInfo.setUser(data.user);
			        history.push('/home');
                })
                .catch(error => {
                    console.log('auto login error',error)
                    let errorMessage = (error.statusCode && error.message)? error.message : 'Something is wrong';
                    message.error(errorMessage);
                });
            }
            else
                history.push('/login')
        }

    },[]);

    return (
        <div className="App-header">
            <LoadingOutlined />
        </div>
    );
}

export default LandingPage;
