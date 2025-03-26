import React from 'react';
//Need to import useLDClient and useFlags from the client SDK to get access to context ie. Name of User who Clicks the Static Post button
import { useFlags, useLDClient } from 'launchdarkly-react-client-sdk';
import { makeStyles } from '@mui/styles';
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

const useStyles = makeStyles({
  // Define your custom styles here if needed
});

const StaticPost = () => {
  const client = useLDClient();
  const posts = [
    { title: "The Classic", creator: "Jim", message: "He put my stuff in Jello again...", tags: [], selectedFile: '/images/StaticPosts/Jello.png' },
    { title: "Office Desk Xmas Wrap", creator: "Jim", message: "Don't sit on that chair", tags: [], selectedFile: '/images/StaticPosts/xmas.png' },
    { title: "Wallet Return, Nothing Taken", creator: "Pam", message: "Cancel cardddd", tags: [], selectedFile: '/images/StaticPosts/Wallet.png' },
    { title: "Tie Coffee Mug Dunk", creator: "Jim", message: "When talking too big", tags: [], selectedFile: '/images/StaticPosts/coffee.png' }
  ];

  return (
    <>
      {posts.map((post, index) => (
        <Card key={index} style={{ margin: '10px', padding: '10px' }}>
          <CardContent style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <Typography variant="h5" component="h2">
                {post.title}
              </Typography>
              <Typography color="textSecondary">
                By {post.creator}
              </Typography>
              <Typography variant="body2" component="p" paragraph>
                {post.message}
              </Typography>
              {post.tags && post.tags.length > 0 && (
                <Typography variant="caption" component="p">
                  {'Tags: ' + post.tags.join(', ')}
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
              onClick={() => {
                console.log(`Liked post: ${post.title} by ${post.creator}`);
                const context = client?.getContext();
                console.log(`Post liked by current user: ${context?.name} from ${context?.department}`);
              }}
            >
              Like
            </Button>
          </CardActions>
        </Card>
      ))}
    </>
  );
};

export default StaticPost;