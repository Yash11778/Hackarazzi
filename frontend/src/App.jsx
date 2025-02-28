import React from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import SignLanguageTranslator from './components/SignLanguageTranslator';
import VideoChat from './components/VideoChat';

function App() {
  return (
    <>
      <div>
        {/* Other content */}
      </div>
      <div className="card">
        {/* Other content */}
      </div>
      <p className="read-the-docs">
        Sign Language Translator
      </p>
      <VideoChat />
      <SignLanguageTranslator />
    </>
  );
}

export default App;