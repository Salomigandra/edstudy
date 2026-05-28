import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';

export const metadata = {
  title: 'Disclaimer — EdStudy',
  description: 'Important disclaimer about the information provided on EdStudy.',
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col max-w-lg mx-auto shadow-xl lg:max-w-none lg:shadow-none">
      <Header backHref="/" title="Disclaimer" />

      <main className="flex-1 px-4 py-6 pb-28 lg:max-w-3xl lg:mx-auto lg:px-8">
        <p className="text-xs text-slate-400 mb-6">Last updated: May 2026</p>

        {/* Prominent amber banner — matches path detail disclaimer style */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-7">
          <div className="flex gap-3">
            <span className="text-xl flex-shrink-0">⚠️</span>
            <p className="text-sm text-amber-800 leading-relaxed">
              EdStudy provides general educational guidance only. Always verify course details,
              fees, eligibility, and exam dates directly with the official institution or exam
              authority before making any decisions.
            </p>
          </div>
        </div>

        <Section title="1. General Information Only">
          The information on EdStudy — including course descriptions, eligibility criteria, fee
          ranges, salary data, entrance exam details, and career guidance — is provided for general
          informational purposes only. It does not constitute professional career counselling,
          legal advice, or financial advice.
        </Section>

        <Section title="2. Accuracy of Information">
          While EdStudy makes every effort to keep information accurate and current, education
          policies in India change frequently. Admission criteria, fee structures, course
          availability, and entrance exam patterns are subject to change by universities, boards, and
          government authorities at any time. EdStudy cannot guarantee that all information is
          complete, accurate, or up to date at any given moment.
        </Section>

        <Section title="3. Salary and Career Data">
          Salary figures shown on EdStudy (Fresher, Junior, Mid, Senior levels) are indicative
          estimates based on publicly available data and industry trends as of the time of
          publication. Actual salaries vary significantly based on institution attended, location,
          employer, individual performance, economic conditions, and many other factors. These
          figures should not be relied upon as guarantees of future earnings.
        </Section>

        <Section title="4. No Guarantee of Admission or Outcomes">
          EdStudy does not guarantee admission to any college, university, or programme. Information
          about entrance exams, cutoffs, or eligibility does not represent official admission
          requirements. Contact the respective institution directly for the most current and
          authoritative admission information.
        </Section>

        <Section title="5. Third-Party Links and Resources">
          EdStudy may reference external websites, institutions, or exam bodies. We have no control
          over the content or accuracy of external sites and are not responsible for any information
          found there. A reference to an external resource does not constitute an endorsement.
        </Section>

        <Section title="6. Quiz and Recommendations">
          The 5-question quiz on EdStudy provides weighted stream suggestions based on your
          responses. These are exploratory suggestions only — not a professional assessment of your
          aptitude, interests, or suitability for any career. We strongly encourage students to also
          seek guidance from school counsellors, teachers, and parents.
        </Section>

        <Section title="7. Limitation of Liability">
          EdStudy and its creators shall not be held liable for any decisions made — academic,
          financial, or otherwise — based on information found on this platform. Use of EdStudy is
          entirely at your own risk.
        </Section>

        <Section title="8. Contact">
          If you find incorrect or outdated information on EdStudy, please help us improve by
          reporting it to{' '}
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
