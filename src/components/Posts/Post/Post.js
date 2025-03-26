import React from 'react';
import { makeStyles } from '@mui/styles';
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

const useStyles = makeStyles({
  // Define your custom styles here if needed
});

const Post = ({ post }) => {
  return (
    <Card style={{ margin: '10px', padding: '10px' }}>
      <CardContent style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <Typography variant="h5" component="h2">
            {post.title || 'Untitled Post'}
          </Typography>
          <Typography color="textSecondary">
            By {post.creator || 'Anonymous'}
          </Typography>
          <Typography variant="body2" component="p" paragraph>
            {post.message}
          </Typography>
          {post.tags && (
            <Typography variant="caption" component="p">
              {'Tags: ' + post.tags}
            </Typography>
          )}
        </div>
        {post.selectedFile && (
          <div style={{ flex: 1, marginLeft: '10px' }}>
            <img
              src={post.selectedFile}
              alt="Selected file"
              style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
            />
          </div>
        )}
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<ThumbUpAltIcon />}
          onClick={() => { }}
        >
          Like
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;