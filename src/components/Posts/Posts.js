import React from 'react';
import Post from './Post/Post';
import { Typography } from '@mui/material';

// Updated Posts component to render posts
const Posts = ({ posts }) => { 
    return (
        <div>
            {posts.length === 0 ? (
                <Typography 
                    variant="h6" 
                    sx={{
                        fontWeight: 600,
                        fontSize: '1.25rem',
                        color: '#333',
                        textAlign: 'center',
                        mb: 2
                    }}
                >
                    ...<br />                    Make a new post!
                    <br />
                    <br />
                    <br />
                </Typography>
            ) : (
                posts.map((post, index) => (
                    <Post key={index} post={post} />
                ))
            )}
        </div>
    );
};

export default Posts;