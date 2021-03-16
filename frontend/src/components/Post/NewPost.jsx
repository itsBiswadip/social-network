import React from 'react';
import { Card, Form, Input, Button, Row, Col, message } from 'antd';
import UserAvatar from '../Profile/UserAvatar';

const { TextArea } = Input;

const NewPost = (props) => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        fetch(`${process.env.REACT_APP_BASE_API_URL}/api/posts`,{
			method: 'PUT',
			headers: { 
                'Content-Type': 'application/json',
                'Authorization' : localStorage.getItem('authToken')
            },
			body: JSON.stringify(values)
		})
		.then(async (res) => {
			const data = await res.json();
			if(!res.ok) {
				data.statusCode = data.statusCode || res.status;
				return Promise.reject(data);
			}
			
            message.success("New Post Added");
            form.resetFields();
            props.onCreate(data.post);
		})
		.catch(error => {
			console.log('signup error',error)
			let errorMessage = (error.statusCode && error.message)? error.message : 'Something is wrong';
			message.error(errorMessage);
		});
    };

    return (
        <Card hoverable bodyStyle={{paddingBottom: '0'}}>
            <Form
                name="new_post"
                onFinish={onFinish}
                form={form}
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
                <Form.Item
                    name="content"
                    rules={[
                    {
                        required: true,
                        message: 'Please add a title',
                    },
                    ]}
                >
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