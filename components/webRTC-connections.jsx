import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const WebRTC = () => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [pc, setPc] = useState(null);
  const [incomingOffer, setIncomingOffer] = useState(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const socket = useRef(null);
  const roomId = 'test-room';
  useEffect(() => {
    console.log('Initializing Socket.io connection...');
    socket.current = io('http://localhost:3001');
    socket.current.emit('join-room', roomId);
    console.log(`Joined room: ${roomId}`);

    // Initialize PeerConnection
    console.log('Initializing RTCPeerConnection...');
    const newPc = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    });

    newPc.ontrack = (e) => {
      console.log('Received remote stream!');
      if (e.streams[0]) {
        remoteVideoRef.current.srcObject = e.streams[0];
        setIsCallActive(true); // Call is active when remote stream is received
        console.log('Remote video stream attached.');
      }
    };

    newPc.onicecandidate = (e) => {
      if (e.candidate) {
        console.log('Generated ICE candidate:', e.candidate);
        socket.current.emit('ice-candidate', e.candidate, roomId);
      } else {
        console.log('All ICE candidates have been generated.');
      }
    };

    newPc.onconnectionstatechange = () => {
      console.log('Connection state:', newPc.connectionState);
      if (newPc.connectionState === 'disconnected') {
        setIsCallActive(false); // Call ended
      }
    };

    newPc.onsignalingstatechange = () => {
      console.log('Signaling state:', newPc.signalingState);
    };

    setPc(newPc);

    // Socket event listeners
    socket.current.on('offer', async (offer) => {
      console.log('Received offer from remote peer:', offer);
      setIncomingOffer(offer); // Store the incoming offer
    });

    socket.current.on('answer', async (answer) => {
      console.log('Received answer from remote peer:', answer);
      if (!pc) return;
      await pc.setRemoteDescription(answer);
      console.log('Remote description set.');
    });

    socket.current.on('ice-candidate', async (candidate) => {
      console.log('Received ICE candidate from remote peer:', candidate);
      if (!pc) return;
      try {
        await pc.addIceCandidate(candidate);
        console.log('ICE candidate added successfully.');
      } catch (e) {
        console.error('Error adding ICE candidate:', e);
      }
    });

    socket.current.on('user-connected', () => {
      console.log('Another user connected to the room.');
    });

    // Chat message event
    socket.current.on('chat-message', (message) => {
      console.log('Received chat message:', message);
      const recievedMessage = { ...message, sender: 'Remote' };
      setMessages((prevMessages) => [...prevMessages, recievedMessage]);
    });

    return () => {
      console.log('Cleaning up...');
      newPc.close();
      socket.current.disconnect();
    };
  }, []);

  const startCall = async () => {
    console.log('Starting local media stream...');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      localVideoRef.current.srcObject = stream;
      console.log('Local video stream attached.');
      stream.getTracks().forEach((track) => {
        pc.addTrack(track, stream);
        console.log('Added local track:', track.kind);
      });

      // Create offer when local stream is ready
      console.log('Creating offer...');
      const offer = await pc.createOffer();
      console.log('Offer created:', offer);
      await pc.setLocalDescription(offer);
      console.log('Local description set.');
      socket.current.emit('offer', pc.localDescription, roomId);

      socket.current.emit();
      setIsCallActive(true);
      console.log('Offer sent to remote peer.');
    } catch (error) {
      console.error('Error starting call:', error);
    }
  };

  const answerCall = async () => {
    if (!incomingOffer || !pc) return;

    console.log('Answering call...');
    await pc.setRemoteDescription(incomingOffer);
    console.log('Remote description set.');

    const answer = await pc.createAnswer();
    console.log('Answer created:', answer);
    await pc.setLocalDescription(answer);
    console.log('Local description set.');

    socket.current.emit('answer', answer, roomId);
    console.log('Answer sent to remote peer.');

    setIncomingOffer(null); // Clear the incoming offer
  };

  const endCall = () => {
    if (pc) {
      pc.close();
      setIsCallActive(false);
      console.log('Call ended.');
    }
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = { sender: 'You', text: newMessage };
      socket.current.emit('chat-message', message, roomId);

      setMessages((prevMessages) => [...prevMessages, message]);
      console.log('Sent chat message:', message);
      setNewMessage('');
    }
  };

  return (
    <div>
      <div>
        <video ref={localVideoRef} autoPlay muted playsInline />
        <video ref={remoteVideoRef} autoPlay playsInline />
      </div>

      {!isCallActive && <button onClick={startCall}>Start Call</button>}

      {incomingOffer && !isCallActive && (
        <div>
          <p>Incoming call...</p>
          <button onClick={answerCall}>Answer Call</button>
        </div>
      )}

      {isCallActive && (
        <div>
          <button onClick={endCall}>End Call</button>
          <div>
            <h3>Chat</h3>
            <div
              style={{
                border: '1px solid #ccc',
                padding: '10px',
                height: '200px',
                overflowY: 'scroll',
              }}
            >
              {messages.map((msg, index) => (
                <div key={index}>
                  <strong>{msg.sender}:</strong> {msg.text}
                </div>
              ))}
            </div>
            <input
              type='text'
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebRTC;
