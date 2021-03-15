import React, { useContext } from 'react';
import UserAvatar from '../components/Profile/UserAvatar';
import { Row, Col, Affix} from 'antd';
import NewPost from '../components/Post/NewPost';

const HomePage = () => {   
    return (
        <>
            <Row justify="end">
                <Col xs={18} className="text-align-right" style={{paddingRight: '2rem', paddingTop: '1rem'}}>
                    <Affix offsetTop>
                        <UserAvatar />
                    </Affix>
                </Col>
            </Row>
            <Row gutter={32} style={{paddingTop: '16px'}} justify="center" className="w100">
            <Col md={10}>
                <NewPost />
            </Col>
            </Row>
        </>
    );
};

export default HomePage;