'use client';

import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase'; 
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './videostyles.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import TypingEffect from '../../TypingEffect';
import VideoPlayer from './VideoPlayer'; 

async function getVideo(id) {
  const docRef = doc(db, "videos", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    console.log("No such document!");
    return null;
  }
}

export default function VideoDetailPage({ params }) {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      const videoData = await getVideo(params.id);
      setVideo(videoData);
      setLoading(false);
    };

    fetchVideo();
  }, [params.id]);

  if (loading) {
    return  <section className='video-background h-screen flex flex-col items-center justify-center'>
       <span class="loader"></span>
    </section>;
  }

  if (!video) {
    return <div className='video-background h-screen flex flex-col items-center justify-center'>Video not found</div>;
  }

  return (
    <section className='video-background pt-14'>
      <div className="container mx-auto ">
        <div className="flex flex-col md:flex-row ">
          <div className="md:w-1/2 mb-6 md:mb-0 video-container">
            <VideoPlayer videoUrl={video.videoUrl} />
          </div>
          <div className="md:w-1/2 md:pl-6 markdown-body description-scrollable">
            <h1 className="text-4xl font-bold mb-5 text-green max-w-fit">
              <TypingEffect text={video.title} speed={100} />
            </h1>
            <h4>Description</h4>
            <MarkdownContent description={video.description} />
          </div>
        </div>
      </div>
    </section>
  );
}

function MarkdownContent({ description }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter
              style={solarizedlight}
              language={match[1]}
              PreTag="div"
              {...props}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {description || "No description available."}
    </ReactMarkdown>
  );
}
