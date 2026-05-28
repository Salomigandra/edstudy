import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';

export const metadata = {
  title: 'Terms of Service — EdStudy',
  description: 'Terms and conditions for using EdStudy.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col max-w-lg mx-auto shadow-xl lg:max-w-none lg:shadow-none">
      <Header backHref="/" title="Terms of Service" />

      <main className="flex-1 px-4 py-6 pb-28 lg:max-w-3xl lg:mx-auto lg:px-8">
        <p className="text-xs text-slate-400 mb-6">Last updated: May 2026</p>

        <Section title="1. Acceptance of Terms">
          By accessing or using EdStudy, you agree to be bound by these Terms of Service. If you do
          not agree, please do not use the platform. These terms apply to all visitors, registered
          users, and any other person who accesses EdStudy.
        </Section>

        <Section title="2. What EdStudy Is">
          EdStudy is an education and career path discovery platform for students in India. It
          provides information about courses, entrance exams, career roles, and salary expectations
          to help students make informed decisions after Class 10, Class 12, and graduation.
        </Section>

        <Section title="3. Use of the Platform">
          <p>You agree to use EdStudy only for lawful purposes. You must not:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Attempt to gain unauthorised access to any part of the platform or its database</li>
            <li>Scrape, copy, or redistribute content without permission</li>
            <li>Use the platform to transmit spam, malware, or harmful content</li>
            <li>Impersonate any person or misrepresent your affiliation with any entity</li>
          </ul>
        </Section>

        <Section title="4. User Accounts">
          When you create an account, you are responsible for maintaining the confidentiality of
          your login credentials. You are responsible for all activity that occurs under your
          account. Notify us immediately at{' '}
          <a href="mailto:salomigandra234@gmail.com" className="text-brand-600 underline">
            salomigandra234@gmail.com
          </a>{' '}
          if you suspect unauthorised use.
        </Section>

        <Section title="5. Content Accuracy">
          EdStudy makes reasonable efforts to keep course, exam, and salary information accurate and
          up to date. However, education policies, fee structures, and entrance exam details change
          frequently. Always verify critical information with the official institution or exam
          authority before making any decisions.
        </Section>

        <Section title="6. Saved Paths and User Data">
          Registered users may save courses and paths to their account. This data is stored securely
          in our database. We do not sell your personal information. See our{' '}
          <a href="/legal/privacy" className="text-brand-600 underline">
            Privacy Policy
          </a>{' '}
          for full details.
        </Section>

        <Section title="7. Intellectual Property">
          All content on EdStudy — including text, graphics, the logo, and code — is the property
          of EdStudy. You may not reproduce or distribute it for commercial purposes without written
          permission.
        </Section>

        <Section title="8. Limitation of Liability">
          EdStudy is provided &ldquo;as is&rdquo; without warranties of any kind. We are not liable
          for any direct, indirect, or consequential damages arising from your use of the platform,
          including decisions made based on information found here.
        </Section>

        <Section title="9. Changes to These Terms">
          We may update these Terms from time to time. Continued use of EdStudy after changes are
          posted constitutes your acceptance of the revised Terms. The date at the top of this page
          reflects the most recent update.
        </Section>

        <Section title="10. Contact">
          For any questions about these Terms, contact us at{' '}
          <a href="mailto:salomigandra234@gmail.com" className="text-brand-600 underline">
            salomigandra234@gmail.com
          </a>
          .
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
