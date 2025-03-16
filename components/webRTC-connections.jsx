import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const WebRTC = () => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const pcRef = useRef(null);
  const socketRef = useRef(null);
  const [incomingOffer, setIncomingOffer] = useState(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const roomId = 'test-room';

  useEffect(() => {
    console.log('Initializing Socket.io connection...');
    socketRef.current = io('https://3397-110-235-230-3.ngrok-free.app', {
      transports: ['websocket'],
    });
    socketRef.current.emit('join-room', roomId);
    console.log(`Joined room: ${roomId}`);

    // Initialize PeerConnection
    console.log('Initializing RTCPeerConnection...');
    const newPc = new RTCPeerConnection({
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' }, // Public STUN server
        {
          urls: 'turn:your-turn-server.com',
          username: 'user',
          credential: 'pass',
        }, // TURN (if needed)
      ],
    });

    pcRef.current = newPc;

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
        socketRef.current.emit('ice-candidate', e.candidate, roomId);
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

    // Socket event listeners
    socketRef.current.on('offer', async (offer) => {
      console.log('Received offer from remote peer:', offer);
      setIncomingOffer(offer); // Store the incoming offer
    });

    socketRef.current.on('answer', async (answer) => {
      console.log('Received answer from remote peer:', answer);
      if (!pcRef.current) return;
      try {
        await pcRef.current.setRemoteDescription(answer);
        console.log('Remote description set.');
      } catch (error) {
        console.error('Error setting remote description:', error);
      }
    });

    socketRef.current.on('ice-candidate', async (candidate) => {
      console.log('Received ICE candidate from remote peer:', candidate);
      if (!pcRef.current) return;
      try {
        await pcRef.current.addIceCandidate(candidate);
        console.log('ICE candidate added successfully.');
      } catch (e) {
        console.error('Error adding ICE candidate:', e);
      }
    });

    socketRef.current.on('user-connected', () => {
      console.log('Another user connected to the room.');
    });

    // Correct event listener name for chat messages
    socketRef.current.on('receiveChat-message', (message) => {
      console.log('Received chat message:', message);
      const receivedMessage = { ...message, sender: 'Remote' };
      setMessages((prevMessages) => [...prevMessages, receivedMessage]);
    });

    return () => {
      console.log('Cleaning up...');
      if (pcRef.current) {
        pcRef.current.close();
      }
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
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
        pcRef.current.addTrack(track, stream);
        console.log('Added local track:', track.kind);
      });

      // Create offer when local stream is ready
      console.log('Creating offer...');
      const offer = await pcRef.current.createOffer();
      console.log('Offer created:', offer);
      await pcRef.current.setLocalDescription(offer);
      console.log('Local description set.');
      socketRef.current.emit('offer', pcRef.current.localDescription, roomId);

      setIsCallActive(true);
      console.log('Offer sent to remote peer.');
    } catch (error) {
      console.error('Error starting call:', error);
    }
  };

  const answerCall = async () => {
    if (!incomingOffer || !pcRef.current) return;

    try {
      console.log('Starting local media stream to answer call...');
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      localVideoRef.current.srcObject = stream;
      console.log('Local video stream attached.');

      stream.getTracks().forEach((track) => {
        pcRef.current.addTrack(track, stream);
        console.log('Added local track:', track.kind);
      });

      console.log('Answering call...');
      await pcRef.current.setRemoteDescription(incomingOffer);
      console.log('Remote description set.');

      const answer = await pcRef.current.createAnswer();
      console.log('Answer created:', answer);
      await pcRef.current.setLocalDescription(answer);
      console.log('Local description set.');

      socketRef.current.emit('answer', answer, roomId);
      console.log('Answer sent to remote peer.');

      setIncomingOffer(null); // Clear the incoming offer
    } catch (error) {
      console.error('Error answering call:', error);
    }
  };

  const endCall = () => {
    if (pcRef.current) {
      // Stop all local tracks
      if (localVideoRef.current && localVideoRef.current.srcObject) {
        localVideoRef.current.srcObject
          .getTracks()
          .forEach((track) => track.stop());
        localVideoRef.current.srcObject = null;
      }

      pcRef.current.close();
      // Create a new peer connection for potential future calls
      pcRef.current = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
      });

      setIsCallActive(false);
      console.log('Call ended.');
    }
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = { sender: 'You', text: newMessage };
      socketRef.current.emit('chat-message', message, roomId);

      setMessages((prevMessages) => [...prevMessages, message]);
      console.log('Sent chat message:', message);
      setNewMessage('');
    }
  };

  return (
    <div
      className='webrtc-container'
      style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}
    >
      <h2>WebRTC Video Chat</h2>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          marginBottom: '20px',
        }}
      >
        <div>
          <h3>Your Video</h3>
          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            style={{ width: '320px', border: '1px solid #ccc' }}
          />
        </div>
        <div>
          <h3>Remote Video</h3>
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            style={{ width: '320px', border: '1px solid #ccc' }}
          />
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '20px',
        }}
      >
        {!isCallActive && <button onClick={startCall}>Start Call</button>}

        {incomingOffer && !isCallActive && (
          <div>
            <p>Incoming call...</p>
            <button onClick={answerCall}>Answer Call</button>
          </div>
        )}

        {isCallActive && <button onClick={endCall}>End Call</button>}
      </div>

      {isCallActive && (
        <div className='chat-container'>
          <h3>Chat</h3>
          <div
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              height: '200px',
              overflowY: 'scroll',
              marginBottom: '10px',
              borderRadius: '5px',
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  textAlign: msg.sender === 'You' ? 'right' : 'left',
                  marginBottom: '8px',
                }}
              >
                <span
                  style={{
                    background: msg.sender === 'You' ? '#dcf8c6' : '#f1f0f0',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    display: 'inline-block',
                    maxWidth: '80%',
                  }}
                >
                  <strong>{msg.sender}:</strong> {msg.text}
                </span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type='text'
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              style={{
                flexGrow: 1,
                padding: '8px',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
              placeholder='Type a message...'
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebRTC;
