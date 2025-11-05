'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <>
      {/* Spacer div to push content below fixed navbar */}
      <div className="h-16 sm:h-20 lg:h-20"></div>
      
      <header className="fixed top-0 w-full z-50 h-16 sm:h-20 lg:h-20" style={{ backgroundColor: '#087E53' }}>
        <nav className="flex items-center justify-center px-4 sm:px-6 lg:px-6 py-3 sm:py-4 lg:py-4 h-full">
          {/* Logo - Centered on mobile, centered on desktop */}
          <div className="flex items-center justify-center w-full lg:w-auto">
            <Link href="/" className="flex items-center justify-center">
              <Image 
                src="/logo.png" 
                alt="Logo" 
                width={147} 
                height={55} 
                priority
                quality={100}
                className="cursor-pointer w-[120px] h-auto sm:w-[147px] lg:w-[147px]"
                style={{ objectFit: 'contain' }}
              />
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
}