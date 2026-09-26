import React from 'react';
import Vertical_wideshot_1 from '../assets/images/content_photo.jpg';
import { Navbar, PageView } from './Navbar';

import { urlForImage } from '../lib/sanity/image';
import { SectionRenderer } from './SectionRenderer';

const resolveImageSrc = (img: unknown, fallback: string): string => {
  if (typeof img === 'string' && img.length > 0) return img;
  if (img && typeof img === 'object' && 'src' in img && typeof (img as { src: unknown }).src === 'string') {
    return (img as { src: string }).src;
  }
  return fallback;
};

const verticalWideshotSrc = resolveImageSrc(Vertical_wideshot_1, '/assets/images/content_photo.jpg');

interface AboutPageProps {
  onNavigate?: (page: PageView) => void;
  onOpenBooking?: () => void;
  data?: any;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenBooking, data }) => {
  const activeBioImg = (data?.bioImage && urlForImage(data.bioImage)) || verticalWideshotSrc;
  const handleBooking = () => {
    if (onOpenBooking) onOpenBooking();
    else window.dispatchEvent(new CustomEvent('open-booking-modal'));
  };
  return (
    <div className="min-h-screen bg-[#FFF9F3] text-[#1E2E2A] font-sans antialiased flex flex-col">
      {/* Universal Transparent Navbar */}
      <Navbar
        onOpenBooking={handleBooking}
        onNavigate={onNavigate}
        theme="dark-text"
      />

      {/* Hero / Intro */}
      <section className="py-12 sm:py-20 max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column Text */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase tracking-widest text-[#536357] font-semibold block">
              {data?.eyebrow || 'About GLS & Sheri Otto'}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif italic text-[#0D4049] leading-[1.15] tracking-tight">
              {data?.headlineQuote || '“I work with people who are great at what they do. My job is making sure the right people know it..”'}
            </h1>
            <p className="text-base sm:text-lg text-[#536357] leading-relaxed font-sans">
              {data?.bioLead || 'I am Sheri Otto. I run positioning, executive narrative, and demand architecture for founders, operators, and in-house marketing leaders.'}
            </p>
            {data?.bioParagraphs && Array.isArray(data.bioParagraphs) ? (
              data.bioParagraphs.map((p: string, pIdx: number) => (
                <p key={pIdx} className="text-sm sm:text-base text-[#536357]/90 leading-relaxed font-sans">
                  {p}
                </p>
              ))
            ) : (
              <>
                <p className="text-sm sm:text-base text-[#536357]/90 leading-relaxed font-sans">
                  I spent about ten years in growth marketing. Most recently at Redwood Software, where I drove 26% year over year pipeline growth. Before that, HubSpot, where I co-hosted INBOUND&apos;s first live webinar on LinkedIn. I do this full time now, from just outside Charlotte.
                </p>
                <p className="text-sm sm:text-base text-[#536357]/90 leading-relaxed font-sans">
                  What I do now is the same thing I did there, minus the committee. I find the story that is already inside the work and build the system that keeps telling it.
                </p>
                <p className="text-sm sm:text-base text-[#536357]/90 leading-relaxed font-sans">
                  Most content advisory fails for a predictable reason: traditional agencies sell you senior strategists and hand off execution to junior copywriters who know nothing about your business. Or they rely on AI prompts that sound like generic motivational tropes.
                </p>
                <p className="text-sm sm:text-base text-[#536357]/90 leading-relaxed font-sans">
                  At GLS, we partner deeply with only 3 to 6 clients at a time. I personally do the work with you. You talk for 45 minutes bi-weekly; the rest gets shaped, polished, and shipped.
                </p>
              </>
            )}

            <div className="pt-4">
              <button
                onClick={handleBooking}
                className="bg-[#0D4049] hover:bg-[#08292E] text-white px-8 py-4 rounded-full font-medium text-sm sm:text-base transition-all shadow-xs cursor-pointer"
              >
                Work with Sheri
              </button>
            </div>
          </div>

          {/* Right Column Photo Card: slightly rounded (rounded-lg) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm">
              <div className="absolute inset-0 bg-[#A9D6D4] rounded-lg translate-x-4 translate-y-4"></div>
              <div className="relative z-10 aspect-4/5 rounded-lg overflow-hidden bg-[#0D4049] shadow-lg">
                <img
                  src={activeBioImg}
                  alt="Sheri Otto"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Operating Pillars */}
        <div className="mt-24 pt-16 border-t border-[#536357]/15">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0D4049] text-center mb-12">
            {data?.principlesTitle || 'The Three GLS Operational Principles'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(data?.principles || [
              {
                number: '01',
                title: 'Oral Extraction Over Writing',
                description: 'You do not need another blank Google Doc. We record your spoken nuance, unfiltered anecdotes, and customer answers so your content preserves your real voice.',
              },
              {
                number: '02',
                title: 'Senior Attention Exclusively',
                description: 'I do not subcontract to interns or junior freelancers. Every piece of strategy, every narrative angle, and every edit is overseen and refined by me personally.',
              },
              {
                number: '03',
                title: 'Commercial Pipeline Outcomes',
                description: 'We measure success not by empty impressions or vanity likes, but by high-value inbound calls, enterprise contract originations, and shortened sales discussions.',
              },
            ]).map((principle: any, idx: number) => {
              const bgColors = ['bg-[#BDC67A]/30 text-[#0D4049]', 'bg-[#A9D6D4]/40 text-[#0D4049]', 'bg-[#E19013]/25 text-[#E19013]'];
              return (
                <div key={idx} className="bg-[#FFFDF9] rounded-2xl p-7 shadow-none hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className={`w-10 h-10 rounded-xl ${bgColors[idx % 3]} flex items-center justify-center mb-4 font-bold`}>
                    {principle.number || `0${idx + 1}`}
                  </div>
                  <h3 className="font-serif font-bold text-xl text-[#0D4049] mb-2">
                    {principle.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#536357] leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dynamic Sections from Page Builder */}
        {data?.sections && (
          <div className="mt-16">
            <SectionRenderer sections={data.sections} onOpenBooking={handleBooking} />
          </div>
        )}
      </section>
    </div>
  );
};
