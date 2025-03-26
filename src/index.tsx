import React from 'react';
import ReactDOM from 'react-dom/client';
// Using asyncWithLDProvider for initialization
import './index.css';
import App from './App';
import { asyncWithLDProvider } from 'launchdarkly-react-client-sdk';

// Initialize LaunchDarkly

(async () => {
  //
  // asyncWithLDProver will return a provider (a React component) after initializing with the SDK
  // After initialization is complete, your flags and the LaunchDarkly client become available at the start of your React app lifecycle. This ensures that your app does not flicker due to flag changes at startup time
  // This is better for my purposes, however I could defer initializing via withLDProvider, if you want
  const LDProvider = await asyncWithLDProvider({
    clientSideID: '67dc78ebb8d7d5096c6a422c',
    // PART 2 - TARGETING
    context: {
      kind: 'user',
      key: '004',
      name: 'Dwight Schrute',
      team: ['Team Jim'],
      department: ['Sales'],
    },
  });

  // React Root Creation: This is where the app is rendered
  // Creates a React root container in the HTML element with id 'root'
  const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

  // Application rendering
  // The app is wrapped with
  // StrictMode: Development tool that helps catch potential problems
  // LDProvider: Wraps your app with LaunchDarkly functionality
  // App: Your main application component
  root.render(
    <React.StrictMode>
      <LDProvider>
        <App />
      </LDProvider>
    </React.StrictMode>
  );
})();