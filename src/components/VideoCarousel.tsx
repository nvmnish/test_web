import React, { useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  VolumeX,
  Volume2,
} from 'lucide-react';
import { VIDEO_TESTIMONIALS } from '../data/content';

export const VideoCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const total = VIDEO_TESTIMONIALS.length;

  if (total === 0) return null;

  const activeIndex = currentIndex % total;
  const currentItem = VIDEO_TESTIMONIALS[activeIndex]!;
  const prevItem =
    VIDEO_TESTIMONIALS[(activeIndex - 1 + total) % total]!;
  const nextItem =
    VIDEO_TESTIMONIALS[(activeIndex + 1) % total]!;

  const selectVideo = (index: number) => {
    if (index === activeIndex) return;

    videoRef.current?.pause();
    setIsMuted(true);
    setCurrentIndex(index);
  };

  const handlePrev = () => {
    selectVideo((activeIndex - 1 + total) % total);
  };

  const handleNext = () => {
    selectVideo((activeIndex + 1) % total);
  };

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;

    // Also handle a volume slider set to zero.
    const enableSound = video.muted || video.volume === 0;

    video.muted = !enableSound;

    if (enableSound) {
      video.volume = 1;
    }

    setIsMuted(video.muted);

    if (enableSound && video.paused) {
      void video.play().catch(() => {
        // The native Play control remains available.
      });
    }
  };

  const previewClass =
    'hidden md:block shrink-0 relative overflow-hidden ' +
    'w-[180px] lg:w-[240px] h-[360px] lg:h-[400px] ' +
    'rounded-[1.75rem] bg-black cursor-pointer ' +
    'opacity-70 hover:opacity-100 transition-opacity shadow-sm ' +
    'focus-visible:outline focus-visible:outline-2 ' +
    'focus-visible:outline-offset-4 focus-visible:outline-[#24423C]';

  return (
    <section
      className="py-14 sm:py-20 bg-[#FFF9F3] overflow-hidden"
      id="video-testimonials"
      aria-label="Video testimonials"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <h2 className="text-5xl sm:text-6xl lg:text-[4.25rem] font-serif italic text-[#281B0C] tracking-tight">
            Don&apos;t take our word for it.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-stone-600">
            Hear it from the people who trusted us.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-4 lg:gap-8">
            {/* Previous video thumbnail */}
            {total > 2 && (
              <button
                type="button"
                onClick={handlePrev}
                className={previewClass}
                aria-label={`Watch ${prevItem.clientName}'s video`}
              >
                <img
                  src={prevItem.poster}
                  alt=""
                  className="block w-full h-full object-cover"
                  draggable={false}
                />
              </button>
            )}

            {/* Active video */}
            <div
              className="relative w-full min-w-0 max-w-[340px] shrink-0 overflow-hidden rounded-[2rem] bg-black shadow-md border border-stone-300"
              id="active-video-card"
            >
              <video
                key={currentItem.id}
                ref={videoRef}
                src={currentItem.videoSrc}
                poster={currentItem.poster}
                className="block w-full aspect-[9/16] object-contain bg-black"
                controls
                autoPlay
                muted={isMuted}
                playsInline
                loop
                preload="metadata"
                aria-label={`Video testimonial from ${currentItem.clientName}`}
                onVolumeChange={(event) => {
                  const video = event.currentTarget;

                  // Ignore events from a video that was replaced.
                  if (video !== videoRef.current) return;

                  setIsMuted(video.muted || video.volume === 0);
                }}
              >
                Your browser does not support HTML video.
              </video>

              {/* Explicit sound control */}
              <button
                type="button"
                onClick={toggleSound}
                className="absolute top-4 right-4 z-10 flex items-center gap-2 rounded-full bg-black/70 px-3 py-2 text-white hover:bg-black/90 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                title={isMuted ? 'Turn sound on' : 'Turn sound off'}
              >
                {isMuted ? (
                  <VolumeX className="h-5 w-5" />
                ) : (
                  <Volume2 className="h-5 w-5" />
                )}

                <span className="text-sm">
                  {isMuted ? 'Sound on' : 'Sound off'}
                </span>
              </button>
            </div>

            {/* Next video thumbnail */}
            {total > 1 && (
              <button
                type="button"
                onClick={handleNext}
                className={previewClass}
                aria-label={`Watch ${nextItem.clientName}'s video`}
              >
                <img
                  src={nextItem.poster}
                  alt=""
                  className="block w-full h-full object-cover"
                  draggable={false}
                />
              </button>
            )}
          </div>

          {/* Navigation */}
          {total > 1 && (
            <div className="flex items-center justify-center gap-6 mt-8">
              <button
                type="button"
                onClick={handlePrev}
                className="p-3 text-[#24423C] hover:bg-stone-200 rounded-full"
                aria-label="Previous video"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>

              <div className="flex items-center gap-2">
                {VIDEO_TESTIMONIALS.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => selectVideo(index)}
                    className="flex h-8 items-center px-1"
                    aria-label={`Watch ${item.clientName}'s video`}
                    aria-current={
                      index === activeIndex ? 'true' : undefined
                    }
                  >
                    <span
                      className={`block h-2 rounded-full transition-all ${
                        index === activeIndex
                          ? 'w-8 bg-[#24423C]'
                          : 'w-2 bg-stone-300'
                      }`}
                    />
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={handleNext}
                className="p-3 text-[#24423C] hover:bg-stone-200 rounded-full"
                aria-label="Next video"
              >
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};