import Button from '../ui/Button'
import { FaCheck, FaArrowRight } from 'react-icons/fa'

const highlights = [
  'Expert ICT trainers with industry experience',
  'Practical, hands-on learning approach',
  'Affordable pricing and flexible schedules',
  'In-house software solutions for schools',
  'Quality refurbished and new computers',
  'Dedicated customer support'
]

const stats = [
  { value: '30+', label: 'Students Trained', accent: false },
  { value: '10+', label: 'Schools Served', accent: true },
  { value: '6+', label: 'Course Programs', accent: false },
  { value: '24/7', label: 'Support Available', accent: true },
]

export default function AboutPreview() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div className="relative order-2 lg:order-1">
            <div className="bg-tint rounded-3xl p-8 border border-primary/10">
              <div className="grid grid-cols-2 gap-4">
                {stats.map((s) => (
                  <div key={s.label} className="bg-white rounded-2xl p-6 shadow-sm lift border border-gray-50 text-center">
                    <div className={`text-4xl font-extrabold mb-2 ${s.accent ? 'text-secondary' : 'text-primary'}`}>
                      {s.value}
                    </div>
                    <div className="text-sm text-gray-600">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden lg:block absolute -bottom-6 -right-6 w-40 h-40 bg-gradient-to-br from-primary to-secondary rounded-3xl opacity-10" />
          </div>

          {/* Content Side */}
          <div className="order-1 lg:order-2">
            <div className="inline-block h-1.5 w-14 rounded-full bg-gradient-to-r from-primary to-secondary mb-5" />
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-6">
              Your Trusted ICT Partner
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Asio Consult is dedicated to empowering individuals and organizations through technology. We provide comprehensive ICT training, develop innovative software solutions for schools, and offer quality computer hardware at competitive prices.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Our mission is to bridge the digital divide by making technology education and tools accessible to everyone.
            </p>

            <div className="space-y-3.5 mb-8">
              {highlights.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <FaCheck className="text-primary text-xs" />
                  </div>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Button to="/about" variant="primary">
                Learn More About Us <FaArrowRight className="ml-2" />
              </Button>
              <Button to="/contact" variant="outline">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
