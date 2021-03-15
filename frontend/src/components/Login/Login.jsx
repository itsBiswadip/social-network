import React, { useContext } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../contexts/UserProvider';


const Login = () => {
	const userInfo = useContext(UserContext);
	const history = useHistory();

	const onFinish = (values) => {
		console.log('Received values of form: ', values);
		fetch(`/api/users`,{
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(values)
		})
		.then(async (res) => {
			const data = await res.json();
			if(!res.ok) {
				data.statusCode = data.statusCode || res.status;
				return Promise.reject(data);
			}
			
			message.success("Login Successful");
			localStorage.setItem('authToken', data.token);
			userInfo.setUser(data.user);
			history.push('/home');
		})
		.catch(error => {
			console.log('login error',error)
			let errorMessage = (error.statusCode && error.message)? error.message : 'Something is wrong';
			message.error(errorMessage);
		});
	};
	
	return (
		<Card>
		<Form name="signup" className="login-form" onFinish={onFinish}>
		<Form.Item
			name="email"
			rules={[
			{
				required: true,
				message: 'Please input your email!',
			},
			]}
		>
			<Input 
				type="email" 
				prefix={<MailOutlined className="site-form-item-icon" />} 
				placeholder="email@example.com" 
			/>
		</Form.Item>
		<Form.Item
			name="password"
			rules={[
			{
				required: true,
				message: 'Please input your Password!',
			},
			]}
		>
			<Input
				type="password"
				prefix={<LockOutlined className="site-form-item-icon" />}
				placeholder="Password"
			/>
		</Form.Item>

		<Form.Item>
			<Button type="primary" htmlType="submit" className="w100">
				Log in
			</Button>
			Or <Link to="/signup">Signup</Link>
		</Form.Item>
		</Form>
		</Card>

	);
}

export default Login;