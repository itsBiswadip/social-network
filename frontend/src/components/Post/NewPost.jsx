import React from 'react';
import { Card, Form, Input, Button, Row, Col } from 'antd';
import UserAvatar from '../Profile/UserAvatar';

const { TextArea } = Input;

const NewPost = (props) => {
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    return (
        <Card hoverable bodyStyle={{paddingBottom: '0'}}>
            <Form
                name="new_post"
                onFinish={onFinish}
            >
                <Form.Item
                    name="title"
                    rules={[
                    {
                        required: true,
                        message: 'Please add a title',
                    },
                    ]}
                >
                    <Input placeholder="Title of your post"/>
                </Form.Item>
                <Form.Item>
                    <TextArea rows={2} placeholder="Whats in your mind" />
                </Form.Item>
                <Row>
                    <Col md={12}>
                        <UserAvatar/>
                    </Col>
                    <Col md={12}>
                        <Form.Item className="text-align-right">
                            <Button type="primary" htmlType="submit">
                                Post
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>

                
            </Form>
            
        </Card>
    );
};

export default NewPost;