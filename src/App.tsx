import React, { useState, useEffect } from 'react';
import { useFlags } from 'launchdarkly-react-client-sdk';
import styles from './App.module.css';
import Analytics from './components/Analytics/analytics';
import StaticPost from './components/StaticPost/staticpost';

//MUI imports to help organize the landing page - switched to CSS for consistent styling
import { Container, AppBar, Typography, Grid as MuiGrid, ThemeProvider, Box } from '@mui/material';
import { theme } from './theme/theme';

import PostsComponent from './components/Posts/Posts';
import FormComponent from './components/Form/Form';
import LDBetaBanner from './components/BetaBanner/LDBetaBanner';


//TypeScript declarations for the Post interface
// Defines shape of the object, props of the post object (POST)
interface Post {
  id: string;
  creator: string;
  title: string;
  message: string;
  tags: string;
  selectedFile: string;
}

//TypeScript declarations for Post and Form components
// const Posts expects a prop called posts, which is an array of Post objects
// the as keyword is a type assertion, telling TypeScript to treat PostsComponent as this type
// const Form expects two props, addPost, which is a function that takes a post object as an argument and returns nothing ie void, and effectiveFlag, which is a boolean
const Posts = PostsComponent as React.FC<{ posts: Post[] }>;
const Form = FormComponent as React.FC<{ addPost: (post: Post) => void; effectiveFlag: boolean }>;

function App() {
  // Part 1 - Release
  // UseFlags is a hook provided by ld sdk
  const { devTestFlag, showAnalytics, newFeature } = useFlags();

  // Part 1 - Remediation
  // The useState hook is used to manage a remediate state.
  // Setup Remediate State Variable
  // - useState (false) creates a state variable initialized to false
  // - setRemediate is a function that updates the state variable
  // - Now, if something triggers the remediate state variable, we can use it as a manual override
  const [remediate, setRemediate] = useState(false);
  const [featureInput, setFeatureInput] = useState("");
  //The effectiveFlag is a boolean that is computed such that, if "remediate" is true, it overrides the remote devTestFlag (coming from LaunchDarkly) to False.
  const effectiveFlag = remediate ? false : devTestFlag;

  // Wait for LaunchDarkly to initialize with a timeout
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      console.warn('LaunchDarkly initialization is taking longer than expected. This might affect feature flag availability.');
    }, 10000); // 10 second timeout

    return () => clearTimeout(timeoutId);
  }, []);

  // New Posts - Create state variable to store Posts
  const [posts, setPosts] = useState<Post[]>([]);

  // Constructor of a variable to add a new post
  // add the new post at the start of the list: setPosts([post, ...posts]);
  // and if a post with the smae ID exists, it's replafced with the new post
  const addPost = (post: Post) => {
    console.log('Adding post:', post);
    setPosts((prevPosts) => [post, ...prevPosts.filter((p) => p.id !== post.id)]);
  };

   // Analytics Time Frame Picklist
   const [timeFrame, setTimeFrame] = useState('This Month');

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #5574E3 0%, #9370DB 100%)',
        position: 'relative',
        width: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Only show the beta banner when effectiveFlag is true (ie flag toggle is true and remediate is false */}
        {effectiveFlag && <LDBetaBanner effectiveFlag={effectiveFlag} />}
        
        
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <AppBar position="static" sx={{
            bgcolor: 'black',
            color: 'white'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <img 
                  src="/images/logo.png" 
                  alt="Prankster.io Logo" 
                  style={{ height: '60px', marginRight: '20px' }}
                />
                <Typography variant="h4" component="div" sx={{ 
                  flexGrow: 1, 
                  fontWeight: 'bold', 
                  fontSize: '2.5rem',
                  color: 'white'
                }}>
                  Prankster.io
                </Typography>
              </Box>
            </Box>
          </AppBar>
          
          <div className={styles.content}>
            {/* Add some margin between the AppBar and Creating a Prank */}
            <div style={{ marginTop: '20px' }}>
              <Container>
                <MuiGrid container justifyContent="space-between" alignItems="stretch" spacing={2}>
                  <MuiGrid item xs={12} sm={7}>
                    <h1>Posts</h1>
                    {/*if showAnalytics is true, display the Analytics component (and inherently rerenders) otherwise it will display nothing*/}
                    {showAnalytics && (
                      <div className={styles.analyticsContainer}>
                        <Analytics timeFrame={timeFrame} setTimeFrame={setTimeFrame} />
                      </div>
                    )}
                    <StaticPost />
                    <Posts posts={posts} />
                    <p>The ShowAnalytics feature flag evaluates to <b>{showAnalytics ? 'True' : 'False'}</b></p>
                    <p>The NewFeatre flag evaluates to <b>{newFeature ? 'True' : 'False'}</b></p>
                  </MuiGrid>
                  <MuiGrid item xs={12} sm={5}>
                    <Form addPost={addPost} effectiveFlag={effectiveFlag} />
                  </MuiGrid>
                </MuiGrid>
              </Container>
            </div>

            <div className={styles.newPadding}>
              {/* Header */}

              {/* Part 1 - Release */}
              {/*use a Ternary Operator to switch between the two images*/}
              {/* Added the effectiveFlag variable to control the image displayed, instead of only using the remote devTestFlag */}
            
              {/*{ effectiveFlag ? (<img src="/images/dashboard_rec.png" className="App-logo" alt="logo" />) : (<img src="/images/dashboard.png" className="App-logo" alt="logo" />)}
              {/*<Analytics />*/}
              <br />

              {/* Part 1 - Remediation*/}
              {/* Every time the user changes the text, the onChange event updates the state variable "featureInput" with the new value.
              The same onChange handler checks if the entered text (after trimming spaces) exactly matches the called out flag keys, ie "devTestFlag"
              When it does match, the remediate state is set to true, which overrides the corresponding remote devTestFlag (coming from LaunchDarkly) to False.*/}
              <div style={{ margin: '10px' }}>
                <label htmlFor="featureInput">SUPER USER ADMIN MODE - FEATURE OVERRIDE (Enter feature name to disable): </label>
                <input
                  id="featureInput"
                  type="text"
                  value={featureInput}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFeatureInput(value);
                    setRemediate(value.trim() === 'devTestFlag');
                  }}
                  placeholder="devTestFlag"
                />
              </div>

              {/* LaunchDarkly Feature Flag - devTestFlag 
              <header className="App-header" style={{backgroundColor: devTestFlag ? '#00844B' : '#373841'}}>
                  <p>The devTestFlag feature flag evaluates to <b>{devTestFlag ? 'True' : 'False'}</b></p>
                  <br />
                  <br />
                  <br />
              </header>*/}
            </div>
          </div>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;