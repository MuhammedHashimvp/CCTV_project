import React from 'react';
import Navbar from './Navbar';

const CCTVPlayer = () => {
  const videoSources = [
    '/videos/cam1.mp4',
    '/videos/cam2.mp4',
    '/videos/cam3.mp4',
    '/videos/cam3.mp4',
    "blob:https://www.earthcam.com/d599ac52-2164-4479-aae4-8a60ad9563c9"
  ];

  return (
    <>
    <Navbar/>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 d-flex flex-wrap container mt-5 pt-2">
      {videoSources.map((src, index) => (
        <div key={index} className="rounded-xl overflow-hidden shadow-lg">
          <video controls autoPlay loop muted className="w-full h-64 object-cover">
            <source src={src} type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>
          <div className="p-4 bg-gray-800 text-danger text-center">Camera {index + 1}</div>
        </div>
      ))}

      
    </div>
    </>
  );
};

export default CCTVPlayer;