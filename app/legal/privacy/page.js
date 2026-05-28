import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';

export const metadata = {
  title: 'Privacy Policy — EdStudy',
  description: 'How EdStudy collects, uses, and protects your personal information.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col max-w-lg mx-auto shadow-xl lg:max-w-none lg:shadow-none">
      <Header backHref="/" title="Privacy Policy" />

      <main className="flex-1 px-4 py-6 pb-28 lg:max-w-3xl lg:mx-auto lg:px-8">
        <p className="text-xs text-slate-400 mb-6">Last updated: May 2026</p>

        <Section title="1. Overview">
          EdStudy is committed to protecting your privacy. This policy explains what information we
          collect, how we use it, and your rights regarding that information. By using EdStudy, you
          agree to the collection and use of information as described here.
        </Section>

        <Section title="2. Information We Collect">
          <p className="font-semibold text-slate-700 mb-1">When you register:</p>
          <ul className="list-disc pl-5 space-y-1 mb-3">
            <li>Email address (required for login)</li>
            <li>Full name (optional, for your profile)</li>
            <li>Phone number (optional)</li>
            <li>Current class stage (optional, to personalise recommendations)</li>
          </ul>
          <p className="font-semibold text-slate-700 mb-1">When you use the platform:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Courses and paths you save</li>
            <li>Quiz responses (not linked to your identity unless you are logged in)</li>
            <li>Search queries (not stored persistently)</li>
          </ul>
        </Section>

        <Section title="3. How We Use Your Information">
          <ul className="list-disc pl-5 space-y-1">
            <li>To provide and improve the EdStudy service</li>
            <li>To save your bookmarked paths and profile preferences</li>
            <li>To send account-related emails (password reset, verification)</li>
            <li>To understand how students use the platform (aggregate, anonymised analytics)</li>
          </ul>
          <p className="mt-2">
            We do <strong>not</strong> sell, rent, or share your personal information with third
            parties for marketing purposes.
          </p>
        </Section>

        <Section title="4. Authentication and Security">
          EdStudy uses{' '}
          <a
            href="https://supabase.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-600 underline"
          >
            Supabase
          </a>{' '}
          for authentication and database storage. Your password is never stored in plain text —
          authentication is handled securely by Supabase Auth. We also use Google reCAPTCHA v3 on
          login and registration forms to prevent bot abuse.
        </Section>

        <Section title="5. Cookies and Local Storage">
          EdStudy uses session cookies set by Supabase Auth to keep you logged in. We do not use
          tracking cookies or third-party advertising cookies. You can clear cookies at any time via
          your browser settings, which will log you out.
        </Section>

        <Section title="6. Data Retention">
          Your account data is retained for as long as your account is active. If you wish to
          delete your account and all associated data, contact us at{' '}
          <a href="mailto:salomigandra234@gmail.com" className="text-brand-600 underline">
            salomigandra234@gmail.com
          </a>{' '}
          and we will process your request within 30 days.
        </Section>

        <Section title="7. Third-Party Services">
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Supabase</strong> — database and authentication (data hosted in their secure
              infrastructure)
            </li>
            <li>
              <strong>Vercel</strong> — hosting and edge delivery
            </li>
            <li>
              <strong>Google reCAPTCHA v3</strong> — bot protection on auth forms
            </li>
          </ul>
          <p className="mt-2">
            Each of these services has its own privacy policy governing how they handle data.
          </p>
        </Section>

        <Section title="8. Children's Privacy">
          EdStudy is designed for students aged 15 and above. We do not knowingly collect personal
          information from children under 13. If you believe a child under 13 has provided us with
          personal information, please contact us and we will delete it promptly.
        </Section>

        <Section title="9. Your Rights">
          <ul className="list-disc pl-5 space-y-1">
            <li>Access — request a copy of the data we hold about you</li>
            <li>Correction — update inaccurate information via your profile page</li>
            <li>Deletion — request account and data deletion</li>
            <li>Portability — request your data in a machine-readable format</li>
          </ul>
          <p className="mt-2">
            To exercise any of these rights, email{' '}
            <a href="mailto:salomigandra234@gmail.com" className="text-brand-600 underline">
              salomigandra234@gmail.com
            </a>
            .
          </p>
        </Section>

        <Section title="10. Changes to This Policy">
          We may update this Privacy Policy from time to time. The date at the top of this page
          shows when it was last revised. Continued use of EdStudy after changes are posted
          constitutes acceptance of the updated policy.
        </Section>
      </main>

      <BottomNav />
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="mb-7">
      <h2 className="text-sm font-black text-slate-800 mb-2">{title}</h2>
      <div className="text-sm text-slate-600 leading-relaxed">{children}</div>
    </section>
  );
}
