import Button from '../ui/Button'
import { FaArrowRight, FaMapMarkerAlt, FaGraduationCap, FaLaptop, FaFileAlt, FaReceipt } from 'react-icons/fa'

const stats = [
  { value: '30+', label: 'Students Trained' },
  { value: '10+', label: 'Schools Served' },
  { value: '6+', label: 'Course Programs' },
  { value: '24/7', label: 'Support Available' },
]

const tiles = [
  { icon: FaGraduationCap, label: 'ICT Courses', color: 'bg-blue-500', to: '/courses' },
  { icon: FaFileAlt, label: 'ReportTube', color: 'bg-green-500', to: '/reporttube' },
  { icon: FaReceipt, label: 'BillTube', color: 'bg-purple-500', to: '/billtube' },
  { icon: FaLaptop, label: 'Hardware', color: 'bg-teal-500', to: '/laptops' },
]

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-dark via-gray-900 to-dark text-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.07]" aria-hidden="true"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '36px 36px' }} />
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute -top-20 -left-16 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[35rem] h-[35rem] bg-secondary rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-500 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-md border border-white/15 rounded-full px-4 py-2 mb-7">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary" />
            </span>
            <span className="text-sm text-gray-200">Empowering Education Through Technology</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-[1.1] tracking-tight">
            Welcome to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Asio Consult
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-9 max-w-2xl mx-auto leading-relaxed">
            Your trusted partner for ICT training, innovative software solutions, and quality computer hardware. We help schools, businesses, and individuals thrive in the digital age.
          </p>

          <div className="flex items-center justify-center gap-2 text-gray-400 mb-12">
            <FaMapMarkerAlt className="text-primary" />
            <span className="text-sm">Located in Ibadan, Nigeria</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button to="/courses" variant="primary" size="lg" className="px-9">
              Explore Courses <FaArrowRight className="ml-2" />
            </Button>
            <Button to="/contact" variant="white" size="lg" className="px-9">
              Get in Touch
            </Button>
          </div>

          {/* Service tiles */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
            {tiles.map(({ icon: Icon, label, color, to }) => (
              <div key={label} className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-center hover:bg-white/10 hover:border-white/25 transition-all duration-300 cursor-pointer">
                <a href={to} className="block">
                  <span className={`inline-flex w-11 h-11 rounded-xl ${color} text-white items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <Icon size={18} />
                  </span>
                  <div className="text-sm font-medium text-gray-200">{label}</div>
                </a>
              </div>
            ))}
          </div>

          {/* Stats strip */}
          <div className="mt-16 border-t border-white/10 pt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  {s.value}
                </div>
                <div className="text-xs md:text-sm text-gray-400 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
