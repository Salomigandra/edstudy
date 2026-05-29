// Supplementary content per course slug.
// This data lives here in V1 (manually curated).
// Migration to Supabase DB columns planned for V2.

export const pathData = {

  'science-b-tech-be': {
    dayInLife: "You spend your mornings in lectures on algorithms, circuits, or thermodynamics depending on your branch. Afternoons are labs, projects, and group work. By Year 3 you're building real systems — apps, circuits, simulations — and interviewing for internships.",
    skills: [
      { name: 'Problem Solving', transferable: true },
      { name: 'Logical Thinking', transferable: true },
      { name: 'Engineering Design', transferable: false },
      { name: 'Data Analysis', transferable: true },
      { name: 'Teamwork on Projects', transferable: true },
    ],
    marketDirection: 'shifting',
    marketNote: 'Demand for engineers is strong but the type of work is changing fast. Junior coding roles are being automated. Engineers who understand systems, products, and data will thrive. Branch and skills matter more than degree name.',
    myths: [
      {
        myth: 'B.Tech is always better than B.Sc Computer Science.',
        reality: 'A B.Sc CSE from BITS or a top NIT is more valued by many companies than a B.Tech from an average private college. Skill matters far more than the degree label.',
      },
      {
        myth: 'You need to be from IIT to get a good tech job.',
        reality: 'Most engineers working at top companies are from tier-2 and tier-3 colleges. Skills, projects, internships, and communication get you hired — not just your college name.',
      },
      {
        myth: 'All B.Tech branches pay equally.',
        reality: 'CSE and ECE typically have stronger campus placements. But Civil and Mechanical engineers with the right skills go into core industries, government PSUs, and infrastructure roles with very stable careers.',
      },
    ],
    collegeTypeNote: 'For B.Tech, an NIT or IIIT > autonomous private > affiliated private. An autonomous college (like BITS, VIT, Manipal) sets its own syllabus and exams — the curriculum is often more industry-relevant. An affiliated private college follows the state university syllabus which may be outdated. Always check NAAC rating and placement records before choosing.',
  },

  'science-mbbs-medical': {
    dayInLife: "Year 1-2 is intense theory — anatomy, physiology, biochemistry. You spend hours in dissection labs and study halls. From Year 3 you're in hospitals, seeing real patients, doing clinical rotations. It's exhausting, deeply meaningful, and unlike any other degree.",
    skills: [
      { name: 'Clinical Diagnosis', transferable: false },
      { name: 'Patient Communication', transferable: true },
      { name: 'High-Pressure Decision Making', transferable: true },
      { name: 'Research & Evidence-Based Practice', transferable: true },
      { name: 'Anatomy & Physiology', transferable: false },
    ],
    marketDirection: 'stable',
    marketNote: 'Healthcare demand in India is growing — but MBBS alone is increasingly not enough. Specialisation (MD/MS) is what drives income and respect. The path is long (10+ years to full specialisation) and competitive. It is deeply rewarding for the right person.',
    myths: [
      {
        myth: 'Only people who couldn\'t get MBBS seats choose BDS, BAMS, or BPT.',
        reality: 'BDS (Dentistry), BAMS (Ayurveda), BPT (Physiotherapy), and B.Optom (Optometry) are first-choice careers for thousands of students who understand what those professions actually involve. A good dentist with a private practice earns more than many MBBS doctors and has far better work-life balance.',
      },
      {
        myth: 'MBBS guarantees a good income.',
        reality: 'A fresh MBBS graduate earns ₹40–60K/month as a resident doctor. Real income comes after MD/MS specialisation — which takes 3 more years and requires clearing a highly competitive PG entrance exam (NEET PG).',
      },
      {
        myth: 'Government medical colleges are only for NEET toppers.',
        reality: 'State-level NEET counselling allocates seats across all government colleges. A student with a solid (not exceptional) NEET score can get a government seat in their home state, especially in specialties like AYUSH streams.',
      },
    ],
    collegeTypeNote: 'For MBBS, government medical colleges (AIIMS, state govt colleges) are strongly preferred — lower fees, MCI-recognised, strong hospital exposure. Private deemed medical colleges can charge ₹50–80L for the full course. Always verify MCI/NMC recognition and the college hospital\'s patient volume before choosing.',
  },

  'science-b-sc-science': {
    dayInLife: "Your mornings alternate between theory lectures and lab practicals — titrations, microscopy, data collection. Afternoons are for assignments and seminars. B.Sc gives you space to go deep into one subject. By final year, you can choose to pivot toward research, teaching, or professional exams.",
    skills: [
      { name: 'Scientific Method & Research', transferable: true },
      { name: 'Data Collection & Analysis', transferable: true },
      { name: 'Lab Techniques', transferable: false },
      { name: 'Critical Thinking', transferable: true },
      { name: 'Technical Writing', transferable: true },
    ],
    marketDirection: 'stable',
    marketNote: 'Pure science graduates have strong options — but only if you plan ahead. The degree opens doors to: MSc → research/academia, B.Ed → teaching, competitive exams (UPSC, CSIR-NET), and industry roles in pharma, biotech, and environmental sectors. The degree alone is not enough; the plan after matters.',
    myths: [
      {
        myth: 'B.Sc is a backup option for people who didn\'t get engineering or medicine.',
        reality: 'B.Sc students who go on to MSc, PhD, or research roles often have more intellectually fulfilling and financially stable careers than average B.Tech graduates. Many UPSC toppers, ISRO scientists, and leading researchers started with B.Sc.',
      },
      {
        myth: 'B.Sc has no job market.',
        reality: 'Pharma, biotech, FMCG, environmental consulting, forensics, and government research labs all hire B.Sc graduates. The key is choosing the right specialisation and planning post-graduation early.',
      },
    ],
    collegeTypeNote: 'For B.Sc, a central university (Delhi University, BHU, HCU) or autonomous college significantly outperforms a regular affiliated college. The difference shows in research exposure, faculty quality, and post-grad opportunities. NAAC A+ or A rating is a good minimum bar.',
  },

  'science-bca-b-sc-cs': {
    dayInLife: "Days are split between coding labs, theory classes in data structures and networking, and project work. From Year 1 you are writing actual programs. BCA and B.Sc CS are heavily practical — by Year 2 most students are building small apps, websites, or tools.",
    skills: [
      { name: 'Programming & Coding', transferable: true },
      { name: 'Database Management', transferable: true },
      { name: 'Web/App Development', transferable: true },
      { name: 'Logical Problem Solving', transferable: true },
      { name: 'Software Debugging', transferable: true },
    ],
    marketDirection: 'growing',
    marketNote: 'BCA and B.Sc CS graduates are highly employable if they build strong coding skills. The degree name matters less than your GitHub, projects, and problem-solving ability. Many top tech company employees have BCA/B.Sc CS, not B.Tech.',
    myths: [
      {
        myth: 'BCA is inferior to B.Tech CSE.',
        reality: 'In terms of actual coding and software skills, BCA and B.Sc CS curricula are very similar to B.Tech CSE. BCA graduates regularly get placed alongside B.Tech graduates at the same companies. The difference is mostly in the engineering theory modules — not in software skills.',
      },
      {
        myth: 'You need B.Tech to work in IT.',
        reality: 'India\'s IT industry hires based on skill, not degree label. TCS, Infosys, Wipro, and most product companies have BCA/B.Sc CS employees at all levels. Strong DSA skills and project experience matter far more.',
      },
    ],
    collegeTypeNote: 'For BCA/B.Sc CS, the college matters less than for B.Tech — because skills are self-demonstrable (your code speaks for you). Focus on colleges with good lab infrastructure, industry tie-ups, and active coding culture. Autonomous colleges tend to have more practical curricula than affiliated ones.',
  },

  'commerce-b-com-b-com-hons': {
    dayInLife: "Mornings are lectures in accounting, business law, taxation, and economics. Afternoons involve problem sets, case studies, and exam prep. B.Com (Hons) is more rigorous and analytical than regular B.Com. Most students simultaneously prepare for CA, CMA, or MBA entrance exams alongside their degree.",
    skills: [
      { name: 'Financial Accounting', transferable: false },
      { name: 'Taxation & Compliance', transferable: false },
      { name: 'Business Law', transferable: true },
      { name: 'Analytical Thinking', transferable: true },
      { name: 'Excel & Financial Modelling', transferable: true },
    ],
    marketDirection: 'stable',
    marketNote: 'B.Com alone has limited direct placement value. Its real power is as a foundation for CA, CMA, MBA Finance, or banking exams. Students who combine B.Com with a professional qualification or competitive exam have very strong career trajectories.',
    myths: [
      {
        myth: 'B.Com graduates only become accountants.',
        reality: 'B.Com graduates work in investment banking, financial analysis, audit, taxation, fintech, government finance, and corporate roles. The degree is a foundation — what you build on it defines your career.',
      },
      {
        myth: 'B.Com Hons and regular B.Com are the same.',
        reality: 'B.Com Hons (especially from DU, Christ, Loyola) has a significantly more rigorous curriculum, better faculty, and much stronger placement outcomes. If you\'re in commerce, aim for Hons wherever possible.',
      },
    ],
    collegeTypeNote: 'For B.Com, brand matters a lot — Delhi University colleges (SRCC, Hindu, Hansraj), Christ University, Loyola Chennai, and Symbiosis are in a different league from random affiliated colleges. The alumni network and faculty quality make a real difference for placements and CA articleship opportunities.',
  },

  'commerce-bba-bms': {
    dayInLife: "Days mix management theory, marketing case studies, finance basics, and group projects. BBA is more practical and communication-heavy than B.Com — lots of presentations, team assignments, and industry visits. It prepares you for management roles and MBA directly.",
    skills: [
      { name: 'Business Communication', transferable: true },
      { name: 'Marketing & Strategy', transferable: true },
      { name: 'Team Leadership', transferable: true },
      { name: 'Financial Basics', transferable: true },
      { name: 'Entrepreneurial Thinking', transferable: true },
    ],
    marketDirection: 'stable',
    marketNote: 'BBA is a strong foundation for an MBA, which is where real career acceleration happens. Standalone BBA has moderate placement value — mostly in sales, marketing, operations, and business development roles. The degree shines most when followed by CAT/MBA from a good B-school.',
    myths: [
      {
        myth: 'BBA is easier than B.Com so it\'s a lesser degree.',
        reality: 'BBA and B.Com are different, not ranked. BBA develops management, communication, and strategic skills. B.Com develops deeper accounting and finance skills. The right choice depends on what career you want — not which is "harder."',
      },
      {
        myth: 'You need an MBA after BBA or it\'s worthless.',
        reality: 'BBA graduates get placed in business development, marketing, operations, and HR roles directly. An MBA amplifies your trajectory — it\'s not a rescue plan for a BBA.',
      },
    ],
    collegeTypeNote: 'For BBA, institutions like Shaheed Sukhdev (DU), Christ University, Symbiosis, and NMIMS have strong placement ecosystems. A BBA from a random private college has limited brand value — in this case, skills and internships matter more than the degree itself.',
  },

  'commerce-ca-cma-cs': {
    dayInLife: "CA is not a college degree — it\'s a professional qualification with 3 levels (Foundation, Intermediate, Final) and mandatory 3-year articleship (practical training). Most days involve intense self-study, coaching classes, and real-work exposure during articleship at audit firms or companies.",
    skills: [
      { name: 'Financial Reporting & Audit', transferable: false },
      { name: 'Taxation (Direct & Indirect)', transferable: false },
      { name: 'Corporate Law & Compliance', transferable: true },
      { name: 'Analytical Rigour', transferable: true },
      { name: 'Business Advisory', transferable: true },
    ],
    marketDirection: 'stable',
    marketNote: 'CA remains one of India\'s most respected and well-compensated qualifications. The pass rate is low (8–12% for Finals) — it genuinely filters for excellence. A qualified CA from a Big 4 firm starts at ₹7–10L. Industry CAs and independent practitioners can earn significantly more. CMA is equally valuable for cost accounting and manufacturing sectors — not a lesser alternative.',
    myths: [
      {
        myth: 'CMA is for people who couldn\'t clear CA.',
        reality: 'CMA (Cost and Management Accounting) is a distinct, highly respected qualification in manufacturing, infrastructure, and government sectors. Many CMA professionals earn more than CAs in their specific domains. They are different paths, not ranked.',
      },
      {
        myth: 'CA is only for maths toppers.',
        reality: 'CA requires logical thinking, discipline, and strong reading comprehension — not exceptional maths ability. Many successful CAs were not maths toppers. The articleship gives real-world experience that makes the qualification extremely practical.',
      },
    ],
    collegeTypeNote: 'CA/CMA is delivered through ICAI and ICMAI respectively — not colleges. However, doing CA alongside B.Com from a strong college gives you better peer networks, access to articleship at top firms, and a fallback qualification. The coaching institute you choose (ICAI study material, CA Foundation coaching) matters far more than the college.',
  },

  'arts-ba-honours': {
    dayInLife: "Mornings are seminars, reading-heavy lectures, and discussions. You spend a lot of time reading primary texts, writing essays, and defending arguments. BA Hons develops your ability to think critically, communicate complex ideas, and research independently — skills that take time to appreciate but are highly transferable.",
    skills: [
      { name: 'Critical Analysis', transferable: true },
      { name: 'Research & Writing', transferable: true },
      { name: 'Public Communication', transferable: true },
      { name: 'Cultural & Social Awareness', transferable: true },
      { name: 'Independent Thinking', transferable: true },
    ],
    marketDirection: 'shifting',
    marketNote: 'The job market for pure humanities is competitive — but not because the skills are weak. It\'s because the paths are less obvious. BA graduates thrive in civil services, media, law, policy, NGOs, content, HR, and business roles. The key is knowing which path you\'re preparing for and building toward it from Year 1.',
    myths: [
      {
        myth: 'BA is for students who couldn\'t get into science or commerce.',
        reality: 'BA from top colleges (DU\'s Lady Sri Ram, Hindu, St. Stephens; HCU; JNU; Ashoka) is academically rigorous and highly competitive. UPSC toppers, journalists, authors, policymakers, and business leaders across India started with BA degrees.',
      },
      {
        myth: 'BA has no job market.',
        reality: 'Every company needs people who can communicate, research, and think clearly. BA graduates fill roles in HR, content strategy, policy analysis, UX research, journalism, PR, and management. The degree is a foundation for a wide range of careers — not a dead end.',
      },
    ],
    collegeTypeNote: 'For BA, the college brand and faculty quality make an enormous difference. BA from DU, JNU, Hyderabad Central University, Presidency Kolkata, or Ashoka University carries significant weight. From a regular affiliated college, the same degree has much weaker brand signal — compensate with competitive exam prep, internships, and strong writing skills.',
  },

  'arts-ba-llb-law': {
    dayInLife: "Law school is reading-intensive — case studies, statutes, legal theory, and moot courts. BA LLB is a 5-year integrated programme. The first 2 years blend arts subjects with law fundamentals. From Year 3, it\'s deep law. Moot courts, internships at law firms or courts, and legal aid clinics are where real skills develop.",
    skills: [
      { name: 'Legal Research & Analysis', transferable: true },
      { name: 'Argumentation & Advocacy', transferable: true },
      { name: 'Contract & Constitutional Law', transferable: false },
      { name: 'Written & Oral Communication', transferable: true },
      { name: 'Negotiation', transferable: true },
    ],
    marketDirection: 'growing',
    marketNote: 'Law is expanding rapidly in India — corporate law, intellectual property, fintech regulation, and international arbitration are high-growth areas. Litigation at lower courts is extremely competitive and financially slow to start. Corporate law at top firms (Trilegal, AZB, Cyril Amarchand) is highly paid but demanding. Choose based on which type of law genuinely interests you.',
    myths: [
      {
        myth: 'All lawyers argue in court.',
        reality: 'Most corporate lawyers never step into a courtroom. They draft contracts, advise companies on compliance, handle mergers and acquisitions, and manage intellectual property. Legal roles in companies (in-house counsel) are growing fast and pay very well.',
      },
      {
        myth: 'Law is only for people who are very argumentative.',
        reality: 'Most legal work is research, writing, and analysis — not dramatic courtroom argument. Quiet, thorough, detail-oriented people often make the best lawyers.',
      },
    ],
    collegeTypeNote: 'For law, NLUs (National Law Universities — NLSIU Bangalore, NALSAR Hyderabad, NLU Delhi) are the gold standard, accessed via CLAT. Private law colleges vary enormously — Symbiosis, Christ, and a few others have good placement records. A law degree from a random affiliated college is hard to leverage without exceptional internship experience and AIBE clearing.',
  },

  'science-allied-health-sciences': {
    dayInLife: "Allied health programmes (BPT, BOT, B.Optom, BMLT, BASLP) combine classroom theory with significant clinical placement hours. By Year 2 you are working with real patients in hospitals or clinics under supervision. The work is hands-on, patient-facing, and deeply practical.",
    skills: [
      { name: 'Patient Assessment & Care', transferable: false },
      { name: 'Clinical Reasoning', transferable: true },
      { name: 'Rehabilitation Techniques', transferable: false },
      { name: 'Empathy & Communication', transferable: true },
      { name: 'Evidence-Based Practice', transferable: true },
    ],
    marketDirection: 'growing',
    marketNote: 'Allied health is one of India\'s fastest-growing healthcare sectors. India has a severe shortage of physiotherapists, audiologists, occupational therapists, and optometrists relative to population. Government hospitals, corporate hospital chains, sports teams, schools, and private clinics all hire. Private practice is a strong option after a few years of experience.',
    myths: [
      {
        myth: 'BPT/BOT is only for people who didn\'t get MBBS or BDS.',
        reality: 'Physiotherapy, Occupational Therapy, and Audiology are distinct clinical professions chosen by students who specifically want that type of work. A good physiotherapist running a sports rehab clinic earns more than most junior doctors and has far better work-life balance.',
      },
      {
        myth: 'Allied health professionals have low career growth.',
        reality: 'Senior physiotherapists in corporate hospitals, IPL team physios, clinical specialists, and private practice owners regularly earn ₹8–20L+. The profession is underrated in India but growing fast.',
      },
    ],
    collegeTypeNote: 'For allied health, choose colleges with strong hospital affiliations and clinical rotation programmes. Government medical college-affiliated programmes (like those attached to AIIMS or state medical colleges) are preferred. Check the hospital bed strength and OPD volume — your clinical exposure is everything.',
  },

  'arts-bsw-social-work': {
    dayInLife: "A typical day involves fieldwork visits to communities, documenting case histories, attending team meetings at an NGO or hospital, and writing reports for government welfare programmes. You interact with real people facing real challenges — poverty, disability, domestic issues, child welfare. It's emotionally demanding and deeply purposeful work.",
    skills: [
      { name: 'Community Needs Assessment', transferable: true },
      { name: 'Case Documentation', transferable: true },
      { name: 'Counselling & Active Listening', transferable: true },
      { name: 'Policy & Social Welfare Knowledge', transferable: false },
      { name: 'Project Coordination', transferable: true },
    ],
    marketDirection: 'growing',
    marketNote: "Social work is growing as India scales government welfare schemes, CSR mandates for companies, and mental health awareness. Hospitals, NGOs, corporates, government agencies, and international organisations all hire social workers. Mid-career professionals with an MSW earn well — don't judge this field only by fresher salaries.",
    myths: [
      {
        myth: 'Social work is only for people who want to work with the poor.',
        reality: 'Social workers work in hospitals, schools, corporates, prisons, disaster response, and international development. The field spans health, education, policy, HR, and more.',
      },
      {
        myth: 'BSW has no career growth.',
        reality: 'With an MSW and a few years of experience, social workers move into programme management, policy advisory, NGO leadership, and UN/international agency roles — some of the most meaningful and well-paid careers in the development sector.',
      },
    ],
    collegeTypeNote: 'For social work, TISS (Tata Institute of Social Sciences, Mumbai/Hyderabad) is the gold standard. Madras Christian College, Delhi School of Social Work, and Loyola College Chennai also have strong programmes. Post-graduation (MSW) from a good institute significantly upgrades your career trajectory.',
  },

  'arts-ba-psychology': {
    dayInLife: "A BA Psychology day involves lectures on cognitive science, social behaviour, research methods, and abnormal psychology. Lab sessions involve running experiments or surveys. You read a lot of case studies and discuss real human behaviour. From Year 2, you may do internships at schools, NGOs, or wellness centres.",
    skills: [
      { name: 'Behavioural Observation & Analysis', transferable: true },
      { name: 'Research Design & Data Interpretation', transferable: true },
      { name: 'Empathy & Active Listening', transferable: true },
      { name: 'Report Writing', transferable: true },
      { name: 'Understanding of Human Development', transferable: true },
    ],
    marketDirection: 'growing',
    marketNote: "Mental health awareness in India is growing rapidly. BA Psychology alone opens HR, research, and education roles. Clinical counselling needs an MA/M.Sc — but the career ceiling is genuinely high. India has fewer than 1 psychologist per 100,000 people — demand will only increase.",
    myths: [
      {
        myth: 'You can be a counsellor or therapist with just a BA.',
        reality: 'Clinical counselling and therapy legally require a Masters degree (MA/M.Sc Psychology) and often registration. A BA is the foundation — plan for postgraduate study if clinical work is your goal.',
      },
      {
        myth: "Psychology grads can't get non-counselling jobs.",
        reality: 'Some of the highest-hiring fields for psychology graduates are HR, UX research, market research, and L&D (Learning & Development). Understanding human behaviour is valuable almost everywhere.',
      },
    ],
    collegeTypeNote: 'For psychology, Christ University Bengaluru, St. Xavier\'s Mumbai, Fergusson Pune, and Loyola Chennai are strong. For higher study, NIMHANS Bengaluru, TISS, and top central universities are where the real clinical depth is built. Avoid private colleges where clinical placement hours are poor — those hours define your competence.',
  },

  'commerce-hotel-tourism-hospitality': {
    dayInLife: "Hotel management programmes split time between theory (operations management, food science, cost control) and practical labs — actual kitchen work, front office simulations, food plating. Industrial training placements at real hotels are part of the curriculum. It's physical, fast-paced, and people-centred.",
    skills: [
      { name: 'Customer Service Excellence', transferable: true },
      { name: 'F&B Operations', transferable: false },
      { name: 'Revenue & Cost Management', transferable: true },
      { name: 'Event Planning & Execution', transferable: true },
      { name: 'Cross-Cultural Communication', transferable: true },
    ],
    marketDirection: 'growing',
    marketNote: 'India\'s tourism and hospitality sector is projected to be a $250B industry by 2030. International hotel chains (Marriott, Hyatt, IHG), Indian chains (Taj, Oberoi, ITC), airlines, and cruise lines all hire hospitality graduates. Career growth can be rapid — a general manager at a 5-star property is a top earner.',
    myths: [
      {
        myth: 'Hotel management is only about cooking or serving food.',
        reality: 'Hotel management covers finance, sales, HR, operations, marketing, and technology. The CEO of Marriott India and many senior travel executives have hotel management backgrounds.',
      },
      {
        myth: 'It is not a "serious" degree.',
        reality: 'A degree from IHM (Institute of Hotel Management — the government chain) or top private schools places graduates in international properties within months. The industry respects practical skills and customer-facing excellence over exam scores.',
      },
    ],
    collegeTypeNote: 'Government IHMs (Aurangabad, Pusa Delhi, Mumbai, Hyderabad) are top-tier with NCHMCT JEE entry. Private colleges vary enormously — check their industry tie-ups, kitchen and front-office lab quality, and placement hotel brands. Avoid colleges with no real hotel training infrastructure.',
  },

};

// Fallback for courses without supplementary data
export const defaultSupplementary = {
  dayInLife: null,
  skills: [],
  marketDirection: 'stable',
  marketNote: 'Career outcomes vary based on college quality, specialisation, and skills built during the programme. Research your specific college and specialisation before deciding.',
  myths: [],
  collegeTypeNote: 'College type significantly affects your experience and outcomes. Prefer government or autonomous colleges with NAAC A or A+ ratings. Always check placement records and faculty quality beyond just the degree name.',
};

export function getPathSupplementary(slug) {
  return pathData[slug] ?? defaultSupplementary;
}
