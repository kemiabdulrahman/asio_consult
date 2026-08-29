import SectionHeading from '../components/ui/SectionHeading'
import Button from '../components/ui/Button'
import { FaEye, FaBullseye, FaHeart, FaUsers, FaHandshake, FaLightbulb, FaMapMarkerAlt, FaSchool } from 'react-icons/fa'

const values = [
  { icon: FaLightbulb, title: 'Innovation', description: 'We embrace new technologies and creative solutions to solve real-world problems.' },
  { icon: FaHandshake, title: 'Integrity', description: 'We build trust through honest dealings, transparent pricing, and reliable services.' },
  { icon: FaUsers, title: 'Accessibility', description: 'We make technology education and tools accessible to everyone, regardless of background.' },
  { icon: FaHeart, title: 'Excellence', description: 'We strive for the highest quality in our training, products, and customer service.' },
]

const team = [
  { name: 'Founder & CEO', role: 'Vision & Strategy', bio: 'Passionate about leveraging technology to transform education and empower the next generation of digital leaders.' },
  { name: 'Head of Training', role: 'ICT Education', bio: 'Experienced IT professional dedicated to delivering practical, industry-relevant training programs.' },
  { name: 'Lead Developer', role: 'Software Solutions', bio: 'Full-stack developer specializing in educational software that simplifies school administration.' },
]

const partnerSchools = [
  'Chrisdem Nursery & Primary School',
  'As Sabbaq Model School',
  'Al-Furqan Islamic School',
]

export default function About() {
  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">About Asio Consult</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We are a technology company based in Ibadan, dedicated to empowering education through innovative ICT training, software solutions, and quality hardware.
          </p>
          <div className="flex items-center justify-center gap-2 text-gray-500 mt-4">
            <FaMapMarkerAlt className="text-primary" />
            <span>Located in Ibadan, Nigeria</span>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="bg-white rounded-2xl p-9 shadow-sm border border-gray-100 lift relative overflow-hidden">
            <div className="blob w-40 h-40 -top-10 -right-10 bg-primary/10" />
            <div className="relative">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <FaBullseye className="text-primary text-2xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To bridge the digital divide by providing accessible, high-quality ICT education and innovative technology solutions that empower individuals, schools, and businesses to thrive in the digital age.
            </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-9 shadow-sm border border-gray-100 lift relative overflow-hidden">
            <div className="blob w-40 h-40 -top-10 -right-10 bg-secondary/10" />
            <div className="relative">
            <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
              <FaEye className="text-secondary text-2xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              To be the leading technology partner for educational institutions and individuals across Africa, known for our commitment to quality, innovation, and making technology accessible to all.
            </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <SectionHeading
            title="Our Core Values"
            subtitle="The principles that guide everything we do"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm text-center hover:shadow-card-hover transition-shadow border border-gray-100 lift group">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <value.icon className="text-primary text-2xl group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Partner Schools */}
        <div className="mb-20">
          <SectionHeading
            title="Schools We Work With"
            subtitle="Trusted by schools across Ibadan for our software solutions and training"
          />

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {partnerSchools.map((school, index) => (
                <div key={index} className="flex items-center gap-3 bg-gray-50 rounded-xl p-4 hover:bg-primary/5 transition-colors">
                  <FaSchool className="text-primary text-xl flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{school}</div>
                    <div className="text-xs text-gray-500">Ibadan</div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-gray-500 text-sm mt-6">
              ...and many more schools across Ibadan trust Asio Consult for their technology needs.
            </p>
          </div>
        </div>

        {/* Team */}
        <div className="mb-20">
          <SectionHeading
            title="Our Team"
            subtitle="Meet the people behind Asio Consult"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm text-center hover:shadow-card-hover transition-shadow border border-gray-100 lift">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4 shadow-md">
                  <span className="text-white text-2xl font-bold">{member.name[0]}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                <p className="text-primary text-sm font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-dark via-gray-900 to-dark rounded-3xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Let's Work Together</h2>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            Whether you need ICT training, software solutions, or quality hardware — we're here to help your organization succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button to="/contact" variant="white" size="lg">Contact Us</Button>
            <Button to="/courses" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-dark">
              View Our Services
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
