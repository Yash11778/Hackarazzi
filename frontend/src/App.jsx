// import React from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
// import './App.css';
// import SignLanguageTranslator from './components/SignLanguageTranslator';
// import VideoChat from './components/VideoChat';
// import Home from './pages/Home';

// function App() {
//   return (
//     <>
//       <Home />
//       <div>
//         {/* Other content */}
//       </div>
//       <div className="card">
//         {/* Other content */}
//       </div>
//       <p className="read-the-docs">
//         Sign Language Translator
//       </p>
//       <VideoChat />
//       <SignLanguageTranslator />


//     </>
//   );
// }

// export default App;



import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import SignLanguageTranslator from './components/SignLanguageTranslator';
import VideoChat from './components/VideoChat';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/video-chat" element={<VideoChat />} />
        <Route path="/sign-language-translator" element={<SignLanguageTranslator />} />
      </Routes>
    </Router>
  );
}

export default App;