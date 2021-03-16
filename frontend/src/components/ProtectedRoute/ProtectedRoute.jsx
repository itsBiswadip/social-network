import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom'
import { UserContext } from '../../contexts/UserProvider';

const ProtectedRoute = ({children, ...rest}) => {
    const userInfo = useContext(UserContext);
    const isLoggedIn = !!(userInfo.user);
        
    return (
        <Route 
            {...rest} 
            render={() => {
                return isLoggedIn? children : <Redirect to='/' />
            }}
        />
    );
}

export default ProtectedRoute;
