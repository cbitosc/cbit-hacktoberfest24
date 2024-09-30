'use client';

import dynamic from 'next/dynamic';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

function VideoPlayer({ videoUrl }) {
  return (
    <div className="aspect-w-16 aspect-h-9">
      <ReactPlayer
        url={videoUrl}
        width="100%"
        height="100%"
        controls={true}
      />
    </div>
  );
}

export default VideoPlayer;
