import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | Niranjan S S Portfolio',
  description: 'Privacy architecture and data processing disclosure for the electronics engineering and frontend systems portfolio.',
};

export default function PrivacyPolicy() {
  return (
    <div style={{ backgroundColor: '#000000', color: '#ffffff', minHeight: '100vh', fontFamily: "'JetBrains Mono', monospace" }}>
      {/* Fixed top escape container */}
      <div className="fixed top-0 left-0 w-full z-[99999] bg-black border-b border-green-500/30 p-4">
        <Link 
          href="/" 
          className="block w-full text-center text-green-500 font-bold hover:bg-green-500 hover:text-black transition-colors p-4"
          style={{
            border: '2px solid #22c55e',
            textDecoration: 'none',
            fontSize: '1.1rem',
            letterSpacing: '0.05em'
          }}
        >
          ← RETURN TO MAIN DECK
        </Link>
      </div>

      {/* Main content body */}
      <main className="max-w-4xl mx-auto px-6 pt-32 pb-24 text-gray-300">
        <h1 className="text-4xl font-extrabold text-white mb-2" style={{ borderBottom: '3px solid #22c55e', paddingBottom: '1rem' }}>
          PRIVACY POLICY
        </h1>
        <p className="text-sm font-mono text-green-500 mb-8">
          SYSTEM_TELEMETRY: COMPLIANT // EFFECTIVE_DATE: JUNE 2026 // LOCATION: THIRUVANANTHAPURAM, KERALA, INDIA
        </p>

        <div className="space-y-8" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', lineHeight: 1.8 }}>
          <section>
            <h2 className="text-xl font-bold text-white mb-3 font-mono">
              1. Information Collection
            </h2>
            <p>
              When you interact with this portfolio, data is only collected when you explicitly provide it. If you utilize the contact terminal, the system collects your <strong className="text-green-500">Name</strong>, <strong className="text-green-500">Email Address</strong>, and <strong className="text-green-500">Message</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 font-mono">
              2. Data Usage & Routing
            </h2>
            <p>
              The information submitted through the contact terminal is utilized strictly to respond to your professional inquiries. Your data is not stored in any persistent local database. Messages are securely proxied through a server-side Next.js route and dispatched via <strong className="text-green-500">Web3Forms</strong>, which delivers the payload directly to my inbox.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 font-mono">
              3. Third-Party Infrastructure
            </h2>
            <p>
              This digital workspace utilizes edge network infrastructure and headless CMS architecture:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>
                <strong className="text-white">Vercel:</strong> Hosts the application and handles edge routing.
              </li>
              <li>
                <strong className="text-white">TinaCMS:</strong> Manages the local static content matrix.
              </li>
              <li>
                <strong className="text-white">Web3Forms:</strong> Processes and forwards contact form payloads server-side.
              </li>
            </ul>
            <p className="mt-4">
              These providers may collect standard, anonymized diagnostic telemetry (such as browser type or approximate regional node) necessary for secure server operations.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 font-mono">
              4. Cookies & Tracking
            </h2>
            <p>
              This portfolio does not utilize invasive marketing trackers or third-party advertising cookies. Any cookies present are strictly essential for the functional operation of the deployment infrastructure and visual editor authentication.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 font-mono">
              5. Contact Protocols
            </h2>
            <p>
              For any questions regarding this privacy architecture or your data, please utilize the secure contact terminal on the main deck.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
