'use client';
import dynamic from 'next/dynamic';

const WebRTC = dynamic(() => import('../../components/webRTC-connections'), {
  ssr: false,
});

export default function Home() {
  return (
    <div>
      <h1>WebRTC with Socket.io</h1>
      <WebRTC />
    </div>
  );
}
