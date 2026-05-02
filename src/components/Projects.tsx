import Image from "next/image";

export default function Projects() {
  return (
    <section id="work" className="relative z-10 w-full max-w-6xl mx-auto py-10 px-4">
      <div className="flex flex-col items-center mb-14">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-2">Featured Projects</h2>
        <p className="text-base md:text-lg text-white/80 text-center max-w-2xl">
          I’ve built several home lab projects while learning cybersecurity. Check out some of my
          favorite ones below.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {/* Card 1 */}
        <div className="bg-[#0f172a]/60 border border-white/50 backdrop-blur-lg rounded-2xl shadow-lg p-8 w-full max-w-sm flex flex-col items-center transition-transform duration-200 hover:shadow-2xl hover:scale-105">
          <Image
            src="/activedirectory.png"
            alt="Active Directory Lab Setup"
            width={384}
            height={192}
            className="w-full h-48 object-cover rounded-xl mb-4"
          />
          <h3 className="text-lg font-bold text-white text-center mb-2">
            Active Directory Lab Setup
          </h3>
          <p className="text-gray-300 text-sm text-center mb-3">
            Configured a home lab with Active Directory using Oracle VirtualBox, enabling user
            management and administration through PowerShell.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            <span className="inline-block bg-slate-800 text-gray-100 px-3 py-1 rounded-full text-sm font-medium transition-transform duration-200 badge-mint hover:scale-105 cursor-pointer">
              Active Directory
            </span>
            <span className="inline-block bg-slate-800 text-gray-100 px-3 py-1 rounded-full text-sm font-medium transition-transform duration-200 badge-mint hover:scale-105 cursor-pointer">
              Identity Management (IAM)
            </span>
            <span className="inline-block bg-slate-800 text-gray-100 px-3 py-1 rounded-full text-sm font-medium transition-transform duration-200 badge-mint hover:scale-105 cursor-pointer">
              PowerShell
            </span>
            <span className="inline-block bg-slate-800 text-gray-100 px-3 py-1 rounded-full text-sm font-medium transition-transform duration-200 badge-mint hover:scale-105 cursor-pointer">
              Virtual Machine
            </span>
          </div>
          <a
            href="https://github.com/abdisamadjoe/AD-PS-User-Management"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#00ff9d] text-black font-semibold rounded-full transition-colors duration-200 hover:bg-white hover:text-black focus:outline-none"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.686-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.699 1.028 1.593 1.028 2.686 0 3.847-2.338 4.695-4.566 4.944.36.31.68.921.68 1.857 0 1.34-.012 2.422-.012 2.753 0 .267.18.578.688.48C19.138 20.203 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
            </svg>
            GitHub
          </a>
        </div>

        {/* Card 2 */}
        <div className="bg-[#0f172a]/60 border border-white/50 backdrop-blur-lg rounded-2xl shadow-lg p-8 w-full max-w-sm flex flex-col items-center transition-transform duration-200 hover:shadow-2xl hover:scale-105">
          <a
            href="https://youtu.be/MEgc0qQ3yKE?si=z4Ktw_DZj_psexyA"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full mb-4 relative group"
          >
            <Image
              src="/aws-login.png"
              alt="AWS Login Alert System"
              width={384}
              height={192}
              className="w-full h-48 object-cover rounded-xl"
            />
            <span className="absolute inset-0 flex items-center justify-center">
              <svg
                className="w-16 h-16 text-white/90 group-hover:text-[#00ff9d] transition"
                fill="currentColor"
                viewBox="0 0 64 64"
              >
                <circle cx="32" cy="32" r="32" fill="rgba(0,0,0,0.45)" />
                <polygon points="26,20 48,32 26,44" fill="#fff" />
              </svg>
            </span>
          </a>
          <h3 className="text-lg font-bold text-white text-center mb-2">
            AWS Login Alert System with CloudTrail, EventBridge, and SNS
          </h3>
          <p className="text-gray-300 text-sm text-center mb-3">
            Built a real-time AWS login alert system that emails you whenever the root or IAM user
            logs in, using CloudTrail, EventBridge, and SNS.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            <span className="inline-block bg-slate-800 text-gray-100 px-3 py-1 rounded-full text-sm font-medium transition-transform duration-200 badge-mint hover:scale-105 cursor-pointer">
              CloudTrail
            </span>
            <span className="inline-block bg-slate-800 text-gray-100 px-3 py-1 rounded-full text-sm font-medium transition-transform duration-200 badge-mint hover:scale-105 cursor-pointer">
              EventBridge
            </span>
            <span className="inline-block bg-slate-800 text-gray-100 px-3 py-1 rounded-full text-sm font-medium transition-transform duration-200 badge-mint hover:scale-105 cursor-pointer">
              SNS (Simple Notification Service)
            </span>
            <span className="inline-block bg-slate-800 text-gray-100 px-3 py-1 rounded-full text-sm font-medium transition-transform duration-200 badge-mint hover:scale-105 cursor-pointer">
              AWS Security
            </span>
          </div>
          <a
            href="https://github.com/abdisamadjoe/aws-login-alerts"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#00ff9d] text-black font-semibold rounded-full transition-colors duration-200 hover:bg-white hover:text-black focus:outline-none"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.686-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.699 1.028 1.593 1.028 2.686 0 3.847-2.338 4.695-4.566 4.944.36.31.68.921.68 1.857 0 1.34-.012 2.422-.012 2.753 0 .267.18.578.688.48C19.138 20.203 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
            </svg>
            GitHub
          </a>
        </div>

        {/* Card 3 */}
        <div className="bg-[#0f172a]/60 border border-white/50 backdrop-blur-lg rounded-2xl shadow-lg p-8 w-full max-w-sm flex flex-col items-center transition-transform duration-200 hover:shadow-2xl hover:scale-105">
          <Image
            src="/VulnerabilityGVM.png"
            alt="Vulnerability Management Lab"
            width={384}
            height={192}
            className="w-full h-48 object-cover rounded-xl mb-4"
          />
          <h3 className="text-lg font-bold text-white text-center mb-2">
            Vulnerability Management Lab
          </h3>
          <p className="text-gray-300 text-sm text-center mb-3">
            Established a vulnerability scanning lab using OpenVAS on a Kali Linux virtual machine,
            enhancing skills in identifying and effectively responding to security issues.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            <span className="inline-block bg-slate-800 text-gray-100 px-3 py-1 rounded-full text-sm font-medium transition-transform duration-200 badge-mint hover:scale-105 cursor-pointer">
              Vulnerability Scanner
            </span>
            <span className="inline-block bg-slate-800 text-gray-100 px-3 py-1 rounded-full text-sm font-medium transition-transform duration-200 badge-mint hover:scale-105 cursor-pointer">
              OpenVAS
            </span>
            <span className="inline-block bg-slate-800 text-gray-100 px-3 py-1 rounded-full text-sm font-medium transition-transform duration-200 badge-mint hover:scale-105 cursor-pointer">
              Kali Linux
            </span>
          </div>
          <a
            href="https://github.com/abdisamadjoe/VulnerabilityGVM-Kali-Setup"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#00ff9d] text-black font-semibold rounded-full transition-colors duration-200 hover:bg-white hover:text-black focus:outline-none"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.686-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.699 1.028 1.593 1.028 2.686 0 3.847-2.338 4.695-4.566 4.944.36.31.68.921.68 1.857 0 1.34-.012 2.422-.012 2.753 0 .267.18.578.688.48C19.138 20.203 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
            </svg>
            GitHub
          </a>
        </div>

        {/* Card 4 */}
        <div className="bg-[#0f172a]/60 border border-white/50 backdrop-blur-lg rounded-2xl shadow-lg p-8 w-full max-w-sm flex flex-col items-center transition-transform duration-200 hover:shadow-2xl hover:scale-105">
          <Image
            src="/AmazonS3.png"
            alt="Static Website Hosting on Amazon S3"
            width={384}
            height={192}
            className="w-full h-48 object-cover rounded-xl mb-4"
          />
          <h3 className="text-lg font-bold text-white text-center mb-2">
            Static Website Hosting on Amazon S3
          </h3>
          <p className="text-gray-300 text-sm text-center mb-3">
            Deployed a static site on Amazon S3 with versioning, access control, and security.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            <span className="inline-block bg-slate-800 text-gray-100 px-3 py-1 rounded-full text-sm font-medium transition-transform duration-200 badge-mint hover:scale-105 cursor-pointer">
              AWS
            </span>
            <span className="inline-block bg-slate-800 text-gray-100 px-3 py-1 rounded-full text-sm font-medium transition-transform duration-200 badge-mint hover:scale-105 cursor-pointer">
              Amazon S3
            </span>
            <span className="inline-block bg-slate-800 text-gray-100 px-3 py-1 rounded-full text-sm font-medium transition-transform duration-200 badge-mint hover:scale-105 cursor-pointer">
              Encryption
            </span>
            <span className="inline-block bg-slate-800 text-gray-100 px-3 py-1 rounded-full text-sm font-medium transition-transform duration-200 badge-mint hover:scale-105 cursor-pointer">
              Identity Management (IAM)
            </span>
          </div>
          <a
            href="https://github.com/abdisamadjoe/host-website-on-s3"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#00ff9d] text-black font-semibold rounded-full transition-colors duration-200 hover:bg-white hover:text-black focus:outline-none"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.686-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.699 1.028 1.593 1.028 2.686 0 3.847-2.338 4.695-4.566 4.944.36.31.68.921.68 1.857 0 1.34-.012 2.422-.012 2.753 0 .267.18.578.688.48C19.138 20.203 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
            </svg>
            GitHub
          </a>
        </div>

        {/* Card 5 */}
        <div className="bg-[#0f172a]/60 border border-white/50 backdrop-blur-lg rounded-2xl shadow-lg p-8 w-full max-w-sm flex flex-col items-center transition-transform duration-200 hover:shadow-2xl hover:scale-105">
          <a
            href="https://youtu.be/gPJyF8NFo_g?si=RY1XoSHssANVmdtV"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full mb-4 relative group"
          >
            <Image
              src="/PasswordChecker.png"
              alt="Password Complexity Checker"
              width={384}
              height={192}
              className="w-full h-48 object-cover rounded-xl"
            />
            <span className="absolute inset-0 flex items-center justify-center">
              <svg
                className="w-16 h-16 text-white/90 group-hover:text-[#00ff9d] transition"
                fill="currentColor"
                viewBox="0 0 64 64"
              >
                <circle cx="32" cy="32" r="32" fill="rgba(0,0,0,0.45)" />
                <polygon points="26,20 48,32 26,44" fill="#fff" />
              </svg>
            </span>
          </a>
          <h3 className="text-lg font-bold text-white text-center mb-2">
            Password Complexity Checker
          </h3>
          <p className="text-gray-300 text-sm text-center mb-3">
            Created a Python tool that checks password strength using complexity rules.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            <span className="inline-block bg-slate-800 text-gray-100 px-3 py-1 rounded-full text-sm font-medium transition-transform duration-200 badge-mint hover:scale-105 cursor-pointer">
              Python
            </span>
            <span className="inline-block bg-slate-800 text-gray-100 px-3 py-1 rounded-full text-sm font-medium transition-transform duration-200 badge-mint hover:scale-105 cursor-pointer">
              Password policy
            </span>
          </div>
          <a
            href="https://github.com/abdisamadjoe/Password-Checker"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#00ff9d] text-black font-semibold rounded-full transition-colors duration-200 hover:bg-white hover:text-black focus:outline-none"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.686-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.699 1.028 1.593 1.028 2.686 0 3.847-2.338 4.695-4.566 4.944.36.31.68.921.68 1.857 0 1.34-.012 2.422-.012 2.753 0 .267.18.578.688.48C19.138 20.203 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
            </svg>
            GitHub
          </a>
        </div>

        {/* Card 6 */}
        <div className="bg-[#0f172a]/60 border border-white/50 backdrop-blur-lg rounded-2xl shadow-lg p-8 w-full max-w-sm flex flex-col items-center transition-transform duration-200 hover:shadow-2xl hover:scale-105">
          <Image
            src="/SimpleKeylogger.png"
            alt="Simple Python Keylogger"
            width={384}
            height={192}
            className="w-full h-48 object-cover rounded-xl mb-4"
          />
          <h3 className="text-lg font-bold text-white text-center mb-2">
            Simple Python Keylogger
          </h3>
          <p className="text-gray-300 text-sm text-center mb-3">
            Built a simple Python keylogger for educational use.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            <span className="inline-block bg-slate-800 text-gray-100 px-3 py-1 rounded-full text-sm font-medium transition-transform duration-200 badge-mint hover:scale-105 cursor-pointer">
              Python
            </span>
            <span className="inline-block bg-slate-800 text-gray-100 px-3 py-1 rounded-full text-sm font-medium transition-transform duration-200 badge-mint hover:scale-105 cursor-pointer">
              Ethical Hacking
            </span>
          </div>
          <a
            href="https://github.com/abdisamadjoe/Simple-Python-Keylogger"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#00ff9d] text-black font-semibold rounded-full transition-colors duration-200 hover:bg-white hover:text-black focus:outline-none"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.686-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.699 1.028 1.593 1.028 2.686 0 3.847-2.338 4.695-4.566 4.944.36.31.68.921.68 1.857 0 1.34-.012 2.422-.012 2.753 0 .267.18.578.688.48C19.138 20.203 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
            </svg>
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
