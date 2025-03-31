# Getting Started Prankster.ai

### `npm start`

Runs the app in the development mode.
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
    3. `sudo chown -R kylemorton /Users/kylemorton/prankapp2`
    5. `sudo npm install launchdarkly-react-client-sdk`
    6. `sudo npm install @mui/styles`
    7. `sudo npm install @mui/icons-material`
    8. `sudo npm install @mui/material @emotion/react @emotion/styled`

    Build /  Runtime requirements
    - Uses react-scripts (Create React App based project)
    - Requires a web server to serve the application
    - Default port 3000 for development (standard Create React App config)

    Storage / Backend
    - No backend, only Client-side with state management
    - New Posts are stored in memory using React’s useState hook

