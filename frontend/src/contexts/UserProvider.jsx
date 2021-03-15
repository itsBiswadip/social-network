import React, { useState, useEffect, createContext } from 'react';

export const UserContext = createContext({
    user: null,
    setUser: (newUser) => {}
});

export class UserProvider extends React.Component {
    constructor(props) {
        super(props);

        this.setUser = (newUser) => {
            this.setState(state => ({
                user: newUser
            }));
        }

        this.state = {
            user: null,
            setUser: this.setUser
        }

    }

    render () {
        return (
            <UserContext.Provider value={this.state}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}