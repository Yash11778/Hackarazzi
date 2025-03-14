import React, { useRef, useEffect } from 'react';
import io from 'socket.io-client';
import Navbar from "./Navbar";

const socket = io('http://192.168.82.143:5000');

const VideoChat = () => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);

  useEffect(() => {
    const startVideoChat = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localVideoRef.current.srcObject = stream;

      const peerConnection = new RTCPeerConnection({
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' }, // Public STUN server
        ],
      });
      stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));

      peerConnection.ontrack = event => {
        remoteVideoRef.current.srcObject = event.streams[0];
      };

      peerConnection.onicecandidate = event => {
        if (event.candidate) {
          console.log('Sending ICE candidate:', event.candidate);
          socket.emit('ice-candidate', event.candidate);
        }
      };

      socket.on('ice-candidate', candidate => {
        console.log('Received ICE candidate:', candidate);
        peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
      });

      socket.on('offer', async offer => {
        console.log('Received offer:', offer);
        await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        socket.emit('answer', answer);
      });

      socket.on('answer', async answer => {
        console.log('Received answer:', answer);
        await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
      });

      peerConnectionRef.current = peerConnection;
    };

    startVideoChat();
  }, []);

  const createOffer = async () => {
    const offer = await peerConnectionRef.current.createOffer();
    await peerConnectionRef.current.setLocalDescription(offer);
    console.log('Sending offer:', offer);
    socket.emit('offer', offer);
  };

  return (
    <div>
      <Navbar />
      <video ref={localVideoRef} autoPlay playsInline muted />
      <video ref={remoteVideoRef} autoPlay playsInline />
      <button onClick={createOffer}>Start Call</button>
    </div>
  );
};

export default VideoChat;