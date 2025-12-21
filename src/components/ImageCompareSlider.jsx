import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const ImageCompareSlider = ({ beforeImage, afterImage, beforeLabel = "Render", afterLabel = "Reality" }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));

    setSliderPosition(percent);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleStart = () => {
    setIsDragging(true);
  };

  const handleEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/3] overflow-hidden rounded-xl shadow-2xl cursor-col-resize select-none bg-gray-100"
      onMouseMove={handleMouseMove}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleEnd}
    >
      {/* After Image (Bottom Layer - Reality) */}
      <div className="absolute inset-0">
        <img
          src={afterImage}
          alt={afterLabel}
          className="w-full h-full object-cover"
          draggable="false"
        />
        {/* After Label */}
        <div className="absolute top-4 right-4 bg-premium-red text-white px-4 py-2 rounded-lg font-semibold text-sm shadow-lg">
          {afterLabel}
        </div>
      </div>

      {/* Before Image (Top Layer - Render) with clip-path */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={beforeImage}
          alt={beforeLabel}
          className="w-full h-full object-cover"
          draggable="false"
        />
        {/* Before Label */}
        <div className="absolute top-4 left-4 bg-deep-blue text-white px-4 py-2 rounded-lg font-semibold text-sm shadow-lg">
          {beforeLabel}
        </div>
      </div>

      {/* Slider Line */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={handleStart}
        onTouchStart={handleStart}
      >
        {/* Slider Handle */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center cursor-grab active:cursor-grabbing"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Left Arrow */}
          <svg
            className="w-4 h-4 text-deep-blue absolute left-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {/* Right Arrow */}
          <svg
            className="w-4 h-4 text-premium-red absolute right-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.div>

        {/* Top and Bottom Circles */}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-6 h-6 bg-white rounded-full shadow-lg" />
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-6 bg-white rounded-full shadow-lg" />
      </div>
    </div>
  );
};

export default ImageCompareSlider;
