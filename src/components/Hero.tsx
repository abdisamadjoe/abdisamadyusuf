import Image from "next/image";

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center">
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 px-4 pt-0 pb-24 md:pb-12 mt-0 md:mt-0">
        {/* Left: Text Content */}
        <div className="flex-1 flex flex-col items-center md:items-start justify-center text-center md:text-left">
          <h3
            className="hero-headline text-[1.56rem] sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-2 whitespace-nowrap"
            style={{ lineHeight: 1.1 }}
          >
            Hi,<span className="inline-block animate-wave origin-[70%_70%]">👋</span> I’m Abdisamad Yusuf
          </h3>
          <h3
            className="hero-typing block text-[1.56rem] sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#00ff9d] typing-demo mb-2 whitespace-nowrap"
            style={{ lineHeight: 1.3 }}
          >
            – Cybersecurity Professional
          </h3>
          <p className="mt-2 text-base sm:text-base md:text-lg text-white/90 max-w-xl">
            I help businesses and individuals protect their systems from cyber threats through cloud
            security solutions and expert cybersecurity training.
          </p>
          <a
            href="/resume.pdf"
            download
            className="mt-8 inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#00ff9d] text-black font-semibold text-lg transition-all duration-200 hover:bg-white hover:text-black focus:outline-none group"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m0 0l-6-6m6 6l6-6" />
            </svg>
            Download Resume
          </a>
        </div>
        {/* Right: Image & Floating Tags */}
        <div className="flex-1 flex items-center justify-center relative min-w-[220px] min-h-[220px] mt-8 md:mt-0">
          {/* Hero Image */}
          <div className="relative z-10">
            <Image
              src="/hero.png"
              alt="Abdisamad Yusuf"
              width={384}
              height={384}
              className="w-[220px] h-[220px] sm:w-[312px] sm:h-[312px] md:w-[384px] md:h-[384px] rounded-2xl object-cover mx-auto"
              priority
            />
          </div>
          {/* Tag 1: Lower part, half outside */}
          <div className="absolute bottom-[-1.5rem] left-6 sm:left-12 animate-float1">
            <div className="flex items-center glass-tag rounded-full">
              <svg
                className="w-3 h-3 mr-1 text-[#00ff9d]"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-[#00ff9d] font-semibold">AWS Certified</span>
            </div>
          </div>
          {/* Tag 2: Inside left */}
          <div className="absolute top-1/3 -left-4 sm:-left-6 animate-float2">
            <div className="flex items-center glass-tag rounded-full">
              <svg
                className="w-3 h-3 mr-1 text-[#00ff9d]"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-[#00ff9d] font-semibold">TryHackMe Top 1%</span>
            </div>
          </div>
          {/* Tag 3: Inside right */}
          <div className="absolute top-2/3 right-0 animate-float3">
            <div className="flex items-center glass-tag rounded-full">
              <svg
                className="w-3 h-3 mr-1 text-[#00ff9d]"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-[#00ff9d] font-semibold">CompTIA Certified</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
