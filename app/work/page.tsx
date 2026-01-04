import { Metadata } from 'next'
import TypingText from '@/components/TypingText'
export const metadata: Metadata = {
  title: 'Work',
  description: 'A little get to know me in the professional world',
}

const experiences = [
  {
    company: "Boston Consulting Group",
    role: "Associate",
    location: "Mumbai, India",
    period: "Sep ’24 – Present",
    highlight: "Worked across Strategy, Ops, and Digital transformation projects in Consumer, Industrial Goods, and Energy sectors.",
    projects: [
      {
        title: "BU Restructuring & Org Design",
        description: "Leading consumer client in India; end-to-end restructuring.",
        points: [
          "Led synergy assessment for two BUs (~$250M revenue), identifying ~$2.5–3.5M cost synergies and ~$8–10M revenue upside.",
          "Built a 5-year integrated financial model to evaluate functional structuring and business potential.",
          "Designed a leadership evaluation framework and target-state organization structures."
        ]
      },
      {
        title: "GCC Strategy Development",
        description: "French multinational integrated energy & petroleum company.",
        points: [
          "Benchmarked offshoring strategies of 7 global energy peers across R&D, engineering, and digital/IT.",
          "Identified industry trends and pitfalls; developed a full execution roadmap for GCC setup."
        ]
      },
      {
        title: "Profitability Improvement (BD)",
        description: "Margin analysis and cost benchmarking across Industrial Goods, Auto, and FMCG.",
        points: [
          "Analyzed internal trends across margins and indirect expenses to uncover value creation opportunities.",
          "Developed business cases for ZBB and cost initiatives, converting 5 clients into 12-week diagnostic phases."
        ]
      },
      {
        title: "Industry 4.0 Roadmap",
        description: "Creating a Digital Factory of the Future for India’s leading lead-acid battery manufacturer.",
        points: [
          "Designed a 9-12 month phased implementation plan with a ~$20Mn value potential strategy.",
          "Identified 120+ operational pain points and prioritized 6 high-impact digital use cases.",
          "Spearheaded vendor selection, databasing 1,000+ vendors and finalizing 6 strategic partners."
        ]
      }
    ]
  },
  {
    company: "Patch Up",
    role: "Founder’s Office",
    location: "Mumbai, India",
    period: "Jul ’24 – Sep ’24",
    highlight: "Shark Tank India Season 4 – Secured funding at ~$2.5Mn valuation.",
    points: [
      "Built a structured B2B sales funnel, securing 20+ key partnerships with doctors and nutritionists.",
      "Accelerated profitability to EBITDA+ by optimizing marketing spend and driving full-funnel analysis on Shopify.",
      "Managed investor relations including MIS, pitch decks, and VC calls."
    ]
  },
  {
    company: "Boston Consulting Group",
    role: "Summer Associate",
    location: "New Delhi, India",
    period: "May ’23 – Jul ’23",
    highlight: "Received Pre-Placement Offer (PPO) for outstanding performance.",
    points: [
      "Digitized timetables for 65K schools, impacting learning outcomes for 9M+ students.",
      "Developed a personalized teaching guidance webpage for 350,000+ teachers.",
      "Led quality checks for $1.5M multilingual workbooks across Rajasthan’s public schools."
    ]
  },
  {
    company: "Rio (Fintech Startup)",
    role: "Management Intern",
    location: "Remote",
    period: "Nov ’23 – Dec ’23",
    points: [
      "Managed recruitment for Credit Risk specialists, screening 200+ LinkedIn leads.",
      "Analyzed UPI and credit card usage trends in India to contribute to employer rebranding."
    ]
  }
];

export default function Work() {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
          Work
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          <TypingText text="A little bit about the work I've done in the professional world." speed={50} />
        </p>
      </div>

      <div className="container py-12 max-w-5xl">
        <div className="space-y-16">
          {experiences.map((exp, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-4 md:gap-12">
              {/* Left Column: Date and Location */}
              <div className="md:w-1/4">
                <p className="text-sm font-semibold uppercase tracking-widest text-pink-600 dark:text-pink-400">
                  {exp.period}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{exp.location}</p>
              </div>

              {/* Right Column: Content */}
              <div className="md:w-3/4">
                <div className="flex justify-between items-baseline mb-2">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {exp.company}
                  </h2>
                  <span className="text-lg text-gray-600 dark:text-gray-400 font-medium">
                    {exp.role}
                  </span>
                </div>

                {exp.highlight && (
                  <div className="mb-4 inline-block px-3 py-1 rounded-full bg-pink-50 dark:bg-pink-900/20 border border-pink-100 dark:border-pink-800 text-xs font-medium text-pink-700 dark:text-pink-300">
                    {exp.highlight}
                  </div>
                )}

                {exp.projects ? (
                  /* Multi-project layout for BCG Associate */
                  <div className="space-y-8 mt-6">
                    {exp.projects.map((proj, pIdx) => (
                      <div key={pIdx} className="relative pl-4 border-l-2 border-gray-100 dark:border-gray-800">
                        <h3 className="text-sm font-bold uppercase tracking-wide text-gray-700 dark:text-gray-300 mb-1">
                          {proj.title}
                        </h3>
                        <p className="text-sm italic text-gray-500 dark:text-gray-400 mb-2">{proj.description}</p>
                        <ul className="list-disc list-outside ml-4 space-y-2 text-gray-600 dark:text-gray-400 text-sm">
                          {proj.points.map((pt, i) => (
                            <li key={i}>{pt}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Standard bullet layout for other roles */
                  <ul className="list-disc list-outside ml-4 mt-4 space-y-3 text-gray-600 dark:text-gray-400 text-sm">
                    {exp.points?.map((pt, i) => (
                      <li key={i}>{pt}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}