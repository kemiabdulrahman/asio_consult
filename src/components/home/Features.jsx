import { Link } from 'react-router-dom'
import { FaGraduationCap, FaFileAlt, FaReceipt, FaLaptop, FaClipboardCheck, FaArrowRight } from 'react-icons/fa'
import SectionHeading from '../ui/SectionHeading'

const features = [
  {
    icon: FaGraduationCap,
    title: 'ICT Courses',
    description: 'Professional computer training from basics to advanced skills. Learn web development, networking, programming, and more — hybrid format available.',
    to: '/courses',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: FaFileAlt,
    title: 'Reportube',
    description: 'Automate result processing and report delivery to parents. Build exam questions with AI and convert them to CBT — all on Google Workspace.',
    to: '/reporttube',
    color: 'from-green-500 to-green-600'
  },
  {
    icon: FaReceipt,
    title: 'FinanceTube',
    description: 'Automated school billing. Generate next-term bills and deliver them to parents\' email inboxes — one-time payment.',
    to: '/financetube',
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: FaClipboardCheck,
    title: 'Entrance Exams (CBT)',
    description: 'AI-powered entrance examinations. Create questions with AI, run CBT, and deliver instant results and admission letters automatically.',
    to: '/entrance-exams',
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: FaLaptop,
    title: 'Laptops & Computers',
    description: 'Quality new and refurbished laptops at affordable prices. Bulk supply for schools with full CBT setup and configuration.',
    to: '/laptops',
    color: 'from-teal-500 to-cyan-500'
  }
]

export default function Features() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <SectionHeading
          title="What We Offer"
          subtitle="Comprehensive technology solutions tailored to meet your needs"
        />

        {/* Top row: 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {features.slice(0, 3).map((feature) => (
            <Link
              key={feature.title}
              to={feature.to}
              className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-card-hover transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 shadow-md group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300`}>
                <feature.icon className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                {feature.description}
              </p>
              <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Learn more <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>

        {/* Bottom row: 2 cards centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {features.slice(3).map((feature) => (
            <Link
              key={feature.title}
              to={feature.to}
              className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-card-hover transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 shadow-md group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300`}>
                <feature.icon className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                {feature.description}
              </p>
              <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Learn more <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
