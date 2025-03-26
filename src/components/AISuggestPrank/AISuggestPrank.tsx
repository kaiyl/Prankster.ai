import React from 'react';
import { Card, CardContent, CardActions, Typography, Button, Box } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';

// Type declarations. The interface defines the shape of each post object with these properties:
interface Post {
  title: string;
  creator: string;
  message: string;
  tags: string[];
  selectedFile: string;
}

const AISuggestPrank = () => {
  const posts: Post[] = [
    { 
      title: "Mind Control", 
      creator: "Jim & Pam", 
      message: "Why don't you move that coatrack?", 
      tags: [], 
      selectedFile: '/images/StaticPosts/coat.png' 
    },
  ];

  // The Box component is a versatile layout component in Material-UI (MUI) that provides several key benefits:
  // - Theme-aware styling: When you use the sx prop with Box, it automatically understands and uses your theme values.
  // - Flexibility: Box can replace many HTML elements (div, span, section, etc.) and provides built-in support for:
  //   - Flexbox layout
  //   - Grid layout
  //   - Spacing
  //   - Typography
  //   - Colors from your theme
  // - Type safety: When used with TypeScript, Box provides better type checking for your styles.
  // In this specific case, the Box component is used to:
  // - Add padding around the app content (padding: '20px')
  // - Make the styling theme-aware
  // - Provide a consistent way to apply styles across your application

  return (
    <Box sx={{ padding: '20px' }}>
      <h1>Prankster Suggestion</h1>
      {posts.map((post, index) => (
        <Card key={index} sx={{ 
          margin: '10px', 
          padding: '10px', 
          maxWidth: '800px'
        }}>
          <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ flex: 1 }}>
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
            </Box>
            {post.selectedFile && (
              <Box sx={{ flex: 1, marginLeft: '10px' }}>
                <img
                  src={post.selectedFile}
                  alt="Selected file"
                  style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                />
              </Box>
            )}
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<EventIcon />}
              onClick={() => {
                console.log('Calendar event creation clicked');
              }}
              sx={{
                backgroundColor: '#4CAF50',
                '&:hover': {
                  backgroundColor: '#45a049'
                }
              }}
            >
              CREATE CALENDAR EVENT
            </Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
};

export default AISuggestPrank;