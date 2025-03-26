import React, { useState, useRef } from 'react';
import { makeStyles } from '@mui/styles';
import { TextField, Button, Typography, Paper } from '@mui/material';
import AISuggestPrank from '../AISuggestPrank/AISuggestPrank';

//Need to import useLDClient from the client SDK to get access to context ie. Name of User who Clicks the Create Prank button
import { useLDClient } from 'launchdarkly-react-client-sdk';

//Material-UI styles
const useStyles = makeStyles({
  paper: {
    padding: '16px',
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
  },
  buttonSubmit: {
    marginTop: '10px',
  },
  buttonClear: {
    marginTop: '10px',
    marginLeft: '10px',
  }
});

const Form = ({ addPost, effectiveFlag }) => {
  const classes = useStyles();
  // Part 3 - Experiments: Get access to the client SDK for console logging
  const client = useLDClient();
  const [formData, setFormData] = useState({
    creator: '',
    title: '',
    message: '',
    tags: '',
    selectedFile: ''
  });

  // Create a ref for the file input
  const fileInputRef = useRef(null);

// Creates handleSubmit function to take an event parameter (i.e.'e' - this is the form submission event)
  const handleSubmit = (e) => {
    e.preventDefault();
    // to create a new post object with current form data and a timestamp ID. It will:
    // - Assign a unique id to the new post using Date.now()
    const newPost = { ...formData, id: Date.now() };
    console.log('Submitting post:', newPost);
    // Part 3 - Experiments: Create context for console logging and log the context to the web console
    const context = client?.getContext();
    console.log(`Post created by current user: ${context?.name} from ${context?.department}`);

    // - Add the post to the state using the addPost function
    addPost(newPost);
    // - Display an alert "Post submitted!" in the browser
    alert('Post submitted!');
    // calls the clearForm constructor
    clearForm();
  };

  const clearForm = () => {
    setFormData({
      creator: '',
      title: '',
      message: '',
      tags: '',
      selectedFile: ''
    });
    // Clear the file input
    if(fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e) => {
    setFormData({
      ...formData,
      selectedFile: e.target.files[0] ? URL.createObjectURL(e.target.files[0]) : ''
    });
  };

  return (
    <>
      <Paper className={classes.paper}>
        <form autoComplete="off" noValidate className={classes.form} onSubmit={handleSubmit}>
          <Typography variant="h6">Create a Prank</Typography>
          <TextField
            name="creator"
            variant="outlined"
            label="Creator"
            fullWidth
            value={formData.creator}
            onChange={handleChange}
            style={{ margin: '10px 0' }}
          />
          <TextField
            name="title"
            variant="outlined"
            label="Title"
            fullWidth
            value={formData.title}
            onChange={handleChange}
            style={{ margin: '10px 0' }}
          />
          <TextField
            name="message"
            variant="outlined"
            label="Message"
            fullWidth
            multiline
            rows={4}
            value={formData.message}
            onChange={handleChange}
            style={{ margin: '10px 0' }}
          />
          <TextField
            name="tags"
            variant="outlined"
            label="Tags"
            fullWidth
            value={formData.tags}
            onChange={handleChange}
            style={{ margin: '10px 0' }}
          />
          <div className={classes.fileInput}>
            <input
              type="file"
              name="selectedFile"
              ref={fileInputRef}
              onChange={handleFileUpload}
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
            className={classes.buttonSubmit}
          >
            Submit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={clearForm}
            fullWidth
            className={classes.buttonClear}
          >
            Clear
          </Button>
        </form>
      </Paper>
      {effectiveFlag && <AISuggestPrank />}
    </>
  );
};

export default Form;
