import React from 'react';
import { Card, Typography, Row, Col } from 'antd';
import PostUserAvatar from './PostUserAvatar';
import { LikeOutlined, LikeTwoTone } from '@ant-design/icons';


const { Title, Paragraph } = Typography

const Post = ({postItem, onLike}) => {
    const [ellipsis] = React.useState(true);

    return (
        <Card
            hoverable
        >
            <Title level={5}>{postItem.title}</Title>
            <Paragraph ellipsis={ellipsis ? { rows: 3, expandable: true, symbol: 'Continue Reading' } : false}>
                {postItem.content}
            </Paragraph>
            <Row>
                <Col md={2}>
                    <PostUserAvatar userName={postItem.authorName}/>
                </Col>
                <Col md={12}>
                    <Card.Meta
                        className="noMargin"
                        title={postItem.authorName}
                        description={postItem.authorEmail}
                    />
                </Col>
                <Col md={10}>
                    <Row justify="end">
                        <Col md={4}>
                            <span onClick={()=>{onLike(postItem.postID)}}>
                                {postItem.isLiked
                                    ? <LikeTwoTone className="oneRem"/> 
                                    : <LikeOutlined className="oneRem"/>
                                }
                            </span>
                            {postItem.likes > 0 ? postItem.likes: ''}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Card>
    );
};

export default Post;