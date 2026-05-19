export default function About() {
  return (
    <section id="about" className="bg-[#0f172a] font-inter text-white">
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl font-bold text-white">About Me</h2>
        <p className="text-base md:text-lg text-white/80 leading-relaxed mt-6">
          I'm Abdisamad Yusuf, an aspiring cybersecurity professional with a Computer Science degree
          and a strong interest in network security and cloud security. Over the past 3 years, I’ve
          gained hands-on experience in IT support, information security, and web design.
        </p>
        <p className="text-base md:text-lg text-white/80 leading-relaxed mt-6">
          I hold certifications from Google, ISC2, AWS, and Microsoft, and I’m the founder of two
          startups:{" "}
          <a
            href="https://guardaura.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-white hover:text-[#00ff9d] transition"
          >
            GuardAura
          </a>
          , which offers cybersecurity services, and{" "}
          <a
            href="https://www.groundwork.co.ke/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-white hover:text-[#00ff9d] transition"
          >
            Groundwork Technologies
          </a>
          , focused on web design and digital solutions.
        </p>
        <p className="text-base md:text-lg text-white/80 leading-relaxed mt-6">
          I spend most of my time sharpening my skills on platforms like{" "}
          <a
            href="https://tryhackme.com/p/bobst0ne"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-white hover:text-[#00ff9d] transition"
          >
            TryHackMe
          </a>{" "}
          (Top 1% globally),{" "}
          <a
            href="https://app.letsdefend.io/user/bobst0ne"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-white hover:text-[#00ff9d] transition"
          >
            LetsDefend
          </a>
          , and{" "}
          <a
            href="https://cyberdefenders.org/p/bobst0ne"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-white hover:text-[#00ff9d] transition"
          >
            CyberDefenders
          </a>
          . My mission is simple: to help people and businesses stay safe in today’s connected
          world.
        </p>
        <p className="text-base md:text-lg text-white/80 leading-relaxed mt-6">
          I'm always open to new roles in cybersecurity or cloud computing, meaningful
          collaborations, and opportunities where I can grow and make a real impact.
        </p>
      </div>
    </section>
  );
}
