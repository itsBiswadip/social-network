import React, { useEffect, useState } from 'react';
import { Row, Col, Affix, Space, message} from 'antd';
import NewPost from '../components/Post/NewPost';
import Post from '../components/Post/Post';
import UserProfile from '../components/Profile/UserProfile';

const HomePage = () => {
    const [ posts, setPosts ] = useState([]);

    const addPosts = (newPost) => {
        let updatedListOfPosts = [newPost, ...posts];
        //sort post based on recent time
        updatedListOfPosts.sort((a,b) => (b.postID - a.postID));
        setPosts(updatedListOfPosts);
    }

    const handlePostLike = (postID) => {
        fetch(`${process.env.REACT_APP_BASE_API_URL}/api/posts/${postID}/like`,{
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization' : localStorage.getItem('authToken')
            }
        })
        .then(async (res) => {
            const data = await res.json();
            if(!res.ok) {
                data.statusCode = data.statusCode || res.status;
                return Promise.reject(data);
            }
            if(data.post) {
                let index = posts.findIndex(item => item.postID === postID);
                console.log({index});
                if(index > -1) {
                    data.post.isLiked = true;
                    posts[index]  = data.post;
                    let updatedPosts = [...posts];
                    setPosts(updatedPosts);
                }
            }
        })
        .catch(error => {
            console.log('auto login error',error)
            let errorMessage = (error.statusCode && error.message)? error.message : 'Something is wrong';
            message.error(errorMessage);
        });
    }

    useEffect(()=> {
        fetch(`${process.env.REACT_APP_BASE_API_URL}/api/posts`,{
            headers: { 
                'Content-Type': 'application/json',
                'Authorization' : localStorage.getItem('authToken')
            }
        })
        .then(async (res) => {
            const data = await res.json();
            if(!res.ok) {
                data.statusCode = data.statusCode || res.status;
                return Promise.reject(data);
            }
            if(data.posts && data.posts.length) {
                data.posts.sort((a,b) => (b.postID - a.postID));
                setPosts(data.posts);
            }
        })
        .catch(error => {
            console.log('auto login error',error)
            let errorMessage = (error.statusCode && error.message)? error.message : 'Something is wrong';
            message.error(errorMessage);
        });
    },[])

    let postsUI = posts.map(item => {
        return <Post key={`post_${item.postID}`} postItem={item} onLike={handlePostLike}/>
    });

    return (
        <>
            <Row justify="end">
                <Col xs={18} className="text-align-right" style={{paddingRight: '2rem', paddingTop: '1rem'}}>
                    <Affix offsetTop>
                        <UserProfile />
                    </Affix>
                </Col>
            </Row>
            <Row gutter={32} style={{paddingTop: '16px'}} justify="center" className="w100">
            <Col md={10}>
                <NewPost onCreate={addPosts}/>
            </Col>
            </Row>
            <Row gutter={32} style={{paddingTop: '16px'}} justify="center" className="w100">
            <Col md={10}>
                <Space direction="vertical"  className="w100">
                {postsUI}
                </Space>
            </Col>
            </Row>
        </>
    );
};

export default HomePage;