import React, { useRef, useEffect, useState } from 'react';
import io from 'socket.io-client';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

// Update the URL to the ngrok URL
const socket = io('https://abcd1234.ngrok.io');

function App() {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const startVideoChat = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localVideoRef.current.srcObject = stream;

      const peerConnection = new RTCPeerConnection();
      stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));

      peerConnection.ontrack = event => {
        remoteVideoRef.current.srcObject = event.streams[0];
      };

      peerConnection.onicecandidate = event => {
        if (event.candidate) {
          socket.emit('ice-candidate', event.candidate);
        }
      };

      socket.on('ice-candidate', candidate => {
        peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
      });

      socket.on('offer', async offer => {
        await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        socket.emit('answer', answer);
      });

      socket.on('answer', async answer => {
        await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
      });

      peerConnectionRef.current = peerConnection;
    };

    startVideoChat();
  }, []);

  const createOffer = async () => {
    const offer = await peerConnectionRef.current.createOffer();
    await peerConnectionRef.current.setLocalDescription(offer);
    socket.emit('offer', offer);
  };

  return (
    <>
      <div>
        
        
      </div>
      <div className="card">
        
      </div>
      <p className="read-the-docs">
        Sign Language Translator
      </p>
      <div>
        <video ref={localVideoRef} autoPlay playsInline muted />
        <video ref={remoteVideoRef} autoPlay playsInline />
        <button onClick={createOffer}>Start Call</button>
      </div>
    </>
  );
}

export default App;
