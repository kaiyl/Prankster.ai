# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Development Enviornement
- Node.js environment
- TypeScript-enabled development setup (.tsx files are present)
- Modern web browser support (using modern React features and ES6+ syntax)

Dependencies:
- Dependencies
    1. Node.js (v16+)
    2. LaunchDarkly account and SDK key
    3. requires internet connection for LaunchDarkly feature flag service
    4. React version v19.0.0
    5. For Styling, Material UI was used for organization, themes and icons, while some styling was done via in line CSS

- Specifically
    1. `sudo npx create-react-app prankapp --template typescript && cd prankapp`
    2. `sudo npm install --save-dev ajv@^7`
        1. The version in my project by default of ajv-keywords is expecting ajv v6's structure, not ajv v7's
        2. against the codegen error
    3. `sudo chown -R kylemorton /Users/kylemorton/prankapp2`
    4. Upon first npm start
        - `sudo npm start`
            1. [I had to run](https://stackoverflow.com/questions/75977710/when-i-run-npm-start-after-creating-react-app-its-giving-me-this-error) the `sudo npm start` command only once, after that, I was able to run the `npm start` command without any errors
    5. `sudo npm install launchdarkly-react-client-sdk`
    6. `sudo npm install @mui/styles`
        1. import EventIcon from '@mui/icons-material/Event';
    7. `sudo npm install @mui/icons-material`
        - for Thumbs up icon etc..
    8. `sudo npm install @mui/material @emotion/react @emotion/styled`

    Build /  Runtime requirements
    - Uses react-scripts (Create React App based project)
    - Requires a web server to serve the application
    - Default port 3000 for development (standard Create React App config)

    Storage / Backend
    - No backend, only Client-side with state management
    - New Posts are stored in memory using React’s useState hook

