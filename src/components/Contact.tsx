export default function Contact() {
  return (
    <section id="contact" className="bg-[#0f172a] font-inter text-white py-24 px-6">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-white">Get in Touch</h2>
        <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto flex flex-wrap justify-center items-center gap-3">
          Let's connect! Feel free to reach out via
          <a
            href="https://www.linkedin.com/in/abdisamadjoe"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 underline text-white hover:text-[#00ff9d] transition"
          >
            {/* LinkedIn Icon */}
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.27c-.97 0-1.75-.79-1.75-1.76s.78-1.76 1.75-1.76 1.75.79 1.75 1.76-.78 1.76-1.75 1.76zm13.5 11.27h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.89v1.36h.04c.4-.76 1.37-1.56 2.82-1.56 3.02 0 3.58 1.99 3.58 4.58v5.62z" />
            </svg>
            LinkedIn
          </a>
          or
          <a
            href="https://twitter.com/abdisamadjoe"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 underline text-white hover:text-[#00ff9d] transition"
          >
            {/* Twitter Bird Icon */}
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M22.46 5.92c-.8.36-1.67.6-2.58.71a4.48 4.48 0 0 0 1.97-2.48 8.93 8.93 0 0 1-2.83 1.08 4.48 4.48 0 0 0-7.63 4.08A12.7 12.7 0 0 1 3.1 4.87a4.48 4.48 0 0 0 1.39 5.98c-.73-.02-1.42-.22-2.02-.56v.06a4.48 4.48 0 0 0 3.6 4.39c-.34.09-.7.14-1.07.14-.26 0-.51-.03-.76-.07a4.48 4.48 0 0 0 4.18 3.11A9 9 0 0 1 2 19.54a12.7 12.7 0 0 0 6.88 2.02c8.26 0 12.78-6.84 12.78-12.78 0-.19 0-.37-.01-.56a9.14 9.14 0 0 0 2.25-2.33z" />
            </svg>
            Twitter
          </a>
          and I’ll get back to you as soon as I can.
        </p>
      </div>
      <div className="h-12"></div> {/* Extra space at the end as a footer spacer */}
    </section>
  );
}
