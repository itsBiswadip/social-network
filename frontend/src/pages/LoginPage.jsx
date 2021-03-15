import React from 'react';
import { Row, Col, Typography } from 'antd';
import Login from '../components/Login/Login';
import Signup from '../components/Login/Signup';

const { Title, Text } = Typography;

const LoginPage = ({formType}) => {
    return (
        <main className="homepage">
            <Row align="middle">
                <Col md={14}>
                    <Col md={12} offset={8}>
                        <Title>Social Network</Title>
                        <Text>Welcome to social network</Text>
                    </Col>
                </Col>
                <Col md={10}>
                    <Col md={16}>
                        {formType === 'signup'? <Signup /> :<Login />}
                    </Col>
                </Col>
            </Row>
        </main>
        
    );
};

export default LoginPage;

