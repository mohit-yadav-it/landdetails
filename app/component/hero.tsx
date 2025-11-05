'use client';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="flex flex-row w-full gap-0 border-0 border-t-0 border-b-0">
      {/* Left side - Image */}
      <div className="w-[45%] lg:w-[45%] h-[60vh] lg:h-[80vh] relative bg-white border-0 border-t-0 border-b-0 flex justify-end pr-1 lg:pr-1">
        <div className="relative w-full h-full max-w-[90%] lg:max-w-[65%]">
          <Image
            src="/hero.jpg"
            alt="Hero"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Right side - Content */}
      <div 
        className="w-[55%] lg:w-[55%] flex flex-col justify-center items-start pl-2 lg:pl-26 pr-2 lg:pr-12 py-4 lg:py-8 bg-white border-0 border-t-0 border-b-0"
        style={{
          animation: 'slideInFromLeft 0.8s ease-out forwards',
        }}
      >
        {/* Main Heading */}
        <h1 
          className="mb-3 lg:mb-6 uppercase leading-tight"
          style={{
            fontFamily: '"DIN Condensed", "Oswald", sans-serif',
            fontWeight: 700,
            fontStyle: 'normal',
            fontSize: 'clamp(24px, 4vw, 90px)',
            lineHeight: 'clamp(28px, 4.5vw, 95px)',
            letterSpacing: '0%',
            textTransform: 'uppercase',
            color: '#292929',
          }}
        >
          ENTER
          <br />
          LAND
          <br />
          DETAILS
        </h1>

        {/* Subtitle */}
        <p
          className="uppercase max-w-2xl"
          style={{
            fontFamily: 'var(--font-open-sans), "Open Sans", sans-serif',
            fontWeight: 600,
            fontStyle: 'normal',
            fontSize: 'clamp(8px, 1.2vw, 16px)',
            lineHeight: 'clamp(12px, 1.8vw, 24px)',
            letterSpacing: '0%',
            textTransform: 'uppercase',
            color: '#000000',
          }}
        >
          PROVIDE ACCURATE INFORMATION TO HELP US VERIFY FASTER — <br />ENSURING A SIMPLE, TRANSPARENT, AND EFFICIENT LAND <br />LISTING PROCESS.
        </p>
      </div>
    </section>
  );
}

