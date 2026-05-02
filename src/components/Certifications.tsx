import Image from "next/image";

export default function Certifications() {
  return (
    <section className="bg-[#0f172a] py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        {/* Headline and Subheadline */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-2 text-white">
          Certifications
        </h2>
        <p className="text-base md:text-lg text-white text-center mb-10 max-w-2xl mx-auto">
          Professional Certifications That Set Me Apart
        </p>
        {/* Certifications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {/* AWS Certified Cloud Practitioner */}
          <div className="rounded-xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm shadow-lg hover:ring-1 hover:ring-[#00ff9d]/30 transition flex flex-col items-center h-full">
            <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-white flex items-center justify-center">
              <Image
                src="/aws.svg"
                alt="AWS Logo"
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
              />
            </div>
            <div className="text-lg font-semibold mb-1">AWS Certified Cloud Practitioner</div>
            <div className="text-sm text-white/70 mb-1">Amazon Web Services (AWS)</div>
            <div className="text-xs text-white/50 mt-1 mb-2">May 2025</div>
            <div className="flex flex-wrap justify-center">
              <span className="inline-block px-3 py-1 mt-3 mr-2 text-xs rounded-full bg-[#00ff9d]/10 text-[#00ff9d]">
                Amazon Web Services (AWS)
              </span>
              <span className="inline-block px-3 py-1 mt-3 mr-2 text-xs rounded-full bg-[#00ff9d]/10 text-[#00ff9d]">
                Cloud Security
              </span>
              <span className="inline-block px-3 py-1 mt-3 mr-2 text-xs rounded-full bg-[#00ff9d]/10 text-[#00ff9d]">
                Amazon EC2
              </span>
              <span className="inline-block px-3 py-1 mt-3 mr-2 text-xs rounded-full bg-[#00ff9d]/10 text-[#00ff9d]">
                Amazon IAM
              </span>
            </div>
            <a
              href="https://www.credly.com/badges/14c961cc-3018-47ff-a5b4-54a794021a06/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm text-[#00ff9d] border border-[#00ff9d] px-4 py-1.5 rounded hover:bg-[#00ff9d]/10 transition"
            >
              View Credential
            </a>
          </div>

          {/* Microsoft Certified: Azure Fundamentals */}
          <div className="rounded-xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm shadow-lg hover:ring-1 hover:ring-[#00ff9d]/30 transition flex flex-col items-center h-full">
            <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-white flex items-center justify-center">
              <Image
                src="/microsoft.svg"
                alt="Microsoft Logo"
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
              />
            </div>
            <div className="text-lg font-semibold mb-1">Microsoft Certified: Azure Fundamentals</div>
            <div className="text-sm text-white/70 mb-1">Microsoft</div>
            <div className="text-xs text-white/50 mt-1 mb-2">May 2025</div>
            <div className="flex flex-wrap justify-center">
              <span className="inline-block px-3 py-1 mt-3 mr-2 text-xs rounded-full bg-[#00ff9d]/10 text-[#00ff9d]">
                Azure Cloud
              </span>
              <span className="inline-block px-3 py-1 mt-3 mr-2 text-xs rounded-full bg-[#00ff9d]/10 text-[#00ff9d]">
                IAM
              </span>
              <span className="inline-block px-3 py-1 mt-3 mr-2 text-xs rounded-full bg-[#00ff9d]/10 text-[#00ff9d]">
                Virtual Machines
              </span>
              <span className="inline-block px-3 py-1 mt-3 mr-2 text-xs rounded-full bg-[#00ff9d]/10 text-[#00ff9d]">
                Microsoft Defender
              </span>
            </div>
            <a
              href="https://learn.microsoft.com/en-us/users/abdisamadjoe/credentials/378b322201c87844"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm text-[#00ff9d] border border-[#00ff9d] px-4 py-1.5 rounded hover:bg-[#00ff9d]/10 transition"
            >
              View Credential
            </a>
          </div>

          {/* SOC Analyst Learning Path */}
          <div className="rounded-xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm shadow-lg hover:ring-1 hover:ring-[#00ff9d]/30 transition flex flex-col items-center h-full">
            <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-white flex items-center justify-center">
              <Image
                src="/letsdefend.svg"
                alt="LetsDefend Logo"
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
              />
            </div>
            <div className="text-lg font-semibold mb-1">SOC Analyst Learning Path</div>
            <div className="text-sm text-white/70 mb-1">LetsDefend</div>
            <div className="text-xs text-white/50 mt-1 mb-2">July 2025</div>
            <div className="flex flex-wrap justify-center">
              <span className="inline-block px-3 py-1 mt-3 mr-2 text-xs rounded-full bg-[#00ff9d]/10 text-[#00ff9d]">
                Malware Analysis
              </span>
              <span className="inline-block px-3 py-1 mt-3 mr-2 text-xs rounded-full bg-[#00ff9d]/10 text-[#00ff9d]">
                CTI
              </span>
              <span className="inline-block px-3 py-1 mt-3 mr-2 text-xs rounded-full bg-[#00ff9d]/10 text-[#00ff9d]">
                Wireshark
              </span>
              <span className="inline-block px-3 py-1 mt-3 mr-2 text-xs rounded-full bg-[#00ff9d]/10 text-[#00ff9d]">
                Web Attack Detection
              </span>
              <span className="inline-block px-3 py-1 mt-3 mr-2 text-xs rounded-full bg-[#00ff9d]/10 text-[#00ff9d]">
                Network Log Analysis
              </span>
              <span className="inline-block px-3 py-1 mt-3 mr-2 text-xs rounded-full bg-[#00ff9d]/10 text-[#00ff9d]">
                Splunk
              </span>
              <span className="inline-block px-3 py-1 mt-3 mr-2 text-xs rounded-full bg-[#00ff9d]/10 text-[#00ff9d]">
                VirusTotal
              </span>
            </div>
            <a
              href="https://app.letsdefend.io/certificate/show/53aa91e4-cfff-47e9-b03b-b9851459df95"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm text-[#00ff9d] border border-[#00ff9d] px-4 py-1.5 rounded hover:bg-[#00ff9d]/10 transition"
            >
              View Credential
            </a>
          </div>

          {/* ISC2 Certified in Cybersecurity (CC) */}
          <div className="rounded-xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm shadow-lg hover:ring-1 hover:ring-[#00ff9d]/30 transition flex flex-col items-center h-full">
            <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-white flex items-center justify-center">
              <Image
                src="/isc2.svg"
                alt="ISC2 Logo"
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
              />
            </div>
            <div className="text-lg font-semibold mb-1">ISC2 Certified in Cybersecurity (CC)</div>
            <div className="text-sm text-white/70 mb-1">ISC2</div>
            <div className="text-xs text-white/50 mt-1 mb-2">October 2024</div>
            <div className="flex flex-wrap justify-center">
              <span className="inline-block px-3 py-1 mt-3 mr-2 text-xs rounded-full bg-[#00ff9d]/10 text-[#00ff9d]">
                SIEM
              </span>
              <span className="inline-block px-3 py-1 mt-3 mr-2 text-xs rounded-full bg-[#00ff9d]/10 text-[#00ff9d]">
                Incident Response
              </span>
              <span className="inline-block px-3 py-1 mt-3 mr-2 text-xs rounded-full bg-[#00ff9d]/10 text-[#00ff9d]">
                Network Security
              </span>
            </div>
            <a
              href="https://www.credly.com/badges/1189dc54-859c-4c7f-aaa2-435a42adf5d5/public_url"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm text-[#00ff9d] border border-[#00ff9d] px-4 py-1.5 rounded hover:bg-[#00ff9d]/10 transition"
            >
              View Credential
            </a>
          </div>

          {/* Google Cybersecurity Professional Certificate */}
          <div className="rounded-xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm shadow-lg hover:ring-1 hover:ring-[#00ff9d]/30 transition flex flex-col items-center h-full">
            <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-white flex items-center justify-center">
              <Image
                src="/google.svg"
                alt="Google G Logo"
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
              />
            </div>
            <div className="text-lg font-semibold mb-1">
              Google Cybersecurity Professional Certificate
            </div>
            <div className="text-sm text-white/70 mb-1">Google</div>
            <div className="text-xs text-white/50 mt-1 mb-2">August 2024</div>
            <div className="flex flex-wrap justify-center">
              <span className="inline-block px-3 py-1 mt-3 mr-2 text-xs rounded-full bg-[#00ff9d]/10 text-[#00ff9d]">
                Linux
              </span>
              <span className="inline-block px-3 py-1 mt-3 mr-2 text-xs rounded-full bg-[#00ff9d]/10 text-[#00ff9d]">
                Bash
              </span>
              <span className="inline-block px-3 py-1 mt-3 mr-2 text-xs rounded-full bg-[#00ff9d]/10 text-[#00ff9d]">
                Python
              </span>
              <span className="inline-block px-3 py-1 mt-3 mr-2 text-xs rounded-full bg-[#00ff9d]/10 text-[#00ff9d]">
                SQL
              </span>
              <span className="inline-block px-3 py-1 mt-3 mr-2 text-xs rounded-full bg-[#00ff9d]/10 text-[#00ff9d]">
                Splunk
              </span>
            </div>
            <a
              href="https://www.credly.com/badges/1daf591b-11df-4d72-bbd3-aec1f8799479"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm text-[#00ff9d] border border-[#00ff9d] px-4 py-1.5 rounded hover:bg-[#00ff9d]/10 transition"
            >
              View Credential
            </a>
          </div>

          {/* IELTS */}
          <div className="rounded-xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm shadow-lg hover:ring-1 hover:ring-[#00ff9d]/30 transition flex flex-col items-center h-full">
            <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-white flex items-center justify-center">
              <Image
                src="/ielts.svg"
                alt="IELTS Logo"
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
              />
            </div>
            <div className="text-lg font-semibold mb-1">IELTS Academic Band 7.0</div>
            <div className="text-sm text-white/70 mb-1">IELTS Official</div>
            <div className="text-xs text-white/50 mt-1 mb-2">May 2024</div>
            <div className="flex flex-wrap justify-center">
              <span className="inline-block px-3 py-1 mt-3 mr-2 text-xs rounded-full bg-[#00ff9d]/10 text-[#00ff9d]">
                Communication
              </span>
              <span className="inline-block px-3 py-1 mt-3 mr-2 text-xs rounded-full bg-[#00ff9d]/10 text-[#00ff9d]">
                Listening
              </span>
              <span className="inline-block px-3 py-1 mt-3 mr-2 text-xs rounded-full bg-[#00ff9d]/10 text-[#00ff9d]">
                Academic English
              </span>
              <span className="inline-block px-3 py-1 mt-3 mr-2 text-xs rounded-full bg-[#00ff9d]/10 text-[#00ff9d]">
                Time Management
              </span>
            </div>
            <a
              href="https://ielts.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm text-[#00ff9d] border border-[#00ff9d] px-4 py-1.5 rounded hover:bg-[#00ff9d]/10 transition"
            >
              View Credential
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
