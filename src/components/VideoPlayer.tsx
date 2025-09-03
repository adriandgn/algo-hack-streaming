'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useBalance } from '@/context/BalanceContext';

interface VideoPlayerProps {
  src: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const { viewSecCost, deductCost, totalBalance } = useBalance();

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const updateTime = () => {
      setElapsedTime(Math.floor(videoElement.currentTime));
    };

    videoElement.addEventListener('timeupdate', updateTime);

    return () => {
      videoElement.removeEventListener('timeupdate', updateTime);
    };
  }, []);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const interval = setInterval(() => {
      if (!videoElement.paused && !videoElement.ended) {
        deductCost(viewSecCost);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [deductCost, viewSecCost]);

  return (
    <div>
      <video
        ref={videoRef}
        src={src}
        controls
        width="100%"
      >
        Tu navegador no soporta el elemento de video.
      </video>
      <div style={{ marginTop: '10px', fontSize: '18px', fontWeight: 'bold' }}>
        Viewed {elapsedTime} seconds. <span style={{ color: 'red' }}>Spent {elapsedTime * viewSecCost} ALGO / available {totalBalance - elapsedTime * viewSecCost} ALGO.</span>
      </div>
    </div>
  );
};

export default VideoPlayer;