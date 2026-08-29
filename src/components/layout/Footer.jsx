import { Link } from 'react-router-dom'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaWhatsapp, FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa'

const footerLinks = {
  services: [
    { label: 'ICT Courses', to: '/courses' },
    { label: 'ReportTube', to: '/reporttube' },
    { label: 'BillTube', to: '/billtube' },
    { label: 'CBT Tube', to: '/cbttube' },
    { label: 'Laptops & Computers', to: '/laptops' },
  ],
  company: [
    { label: 'About Us', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ],
}

const socialLinks = [
  { icon: FaFacebook, href: '#', label: 'Facebook' },
  { icon: FaTwitter, href: '#', label: 'Twitter' },
  { icon: FaInstagram, href: '#', label: 'Instagram' },
  { icon: FaLinkedin, href: '#', label: 'LinkedIn' },
]

const contactDetails = [
  { icon: FaEnvelope, label: 'Email', value: 'info@asioconsult.com' },
  { icon: FaPhone, label: 'Phone', value: '0802 629 5718 · 0806 695 2900' },
  { icon: FaMapMarkerAlt, label: 'Location', value: 'Ibadan, Nigeria' },
]

export default function Footer() {
  return (
    <footer className="bg-dark text-white relative overflow-hidden">
      {/* Decorative glow */}
      <div className="blob w-72 h-72 -bottom-20 -left-20 bg-primary/20" />
      <div className="blob w-72 h-72 -top-20 -right-20 bg-secondary/10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:pr-6">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <img
                src="/asio.jpg"
                alt="Asio Consult logo"
                className="w-10 h-10 rounded-xl object-cover shadow-md"
              />
              <span className="text-xl font-bold tracking-tight">
                Asio <span className="text-secondary">Consult</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Empowering education through technology. ICT training, innovative software solutions, and quality hardware.
            </p>
            <div className="flex gap-2.5">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-gray-800/60 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white hover:-translate-y-0.5 transition-all duration-300 focus-ring"
                  aria-label={label}
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-base font-semibold mb-5 tracking-wide text-white">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-secondary transition-colors duration-200 text-sm inline-block hover:translate-x-0.5 transition-transform"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-base font-semibold mb-5 tracking-wide text-white">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-secondary transition-colors duration-200 text-sm inline-block hover:translate-x-0.5 transition-transform"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-base font-semibold mb-5 tracking-wide text-white">Contact Us</h3>
            <ul className="space-y-4">
              {contactDetails.map((item) => (
                <li key={item.label} className="flex items-start gap-3">
                  <span className="mt-1 w-8 h-8 rounded-lg bg-gray-800/60 flex items-center justify-center text-secondary flex-shrink-0">
                    <item.icon size={14} />
                  </span>
                  <div>
                    <span className="block text-xs font-medium text-gray-500">{item.label}</span>
                    <span className="text-sm text-gray-300">{item.value}</span>
                  </div>
                </li>
              ))}
              <li className="flex items-start gap-3">
                <span className="mt-1 w-8 h-8 rounded-lg bg-gray-800/60 flex items-center justify-center text-green-400 flex-shrink-0">
                  <FaWhatsapp size={14} />
                </span>
                <div>
                  <span className="block text-xs font-medium text-gray-500">WhatsApp</span>
                  <a
                    href="https://wa.me/2348026295718"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-green-400 hover:text-green-300 transition-colors focus-ring"
                  >
                    Chat with us
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800/70 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Asio Consult. All rights reserved.</p>
          <p className="text-xs">ICT Training · Software Solutions · Computer Hardware</p>
        </div>
      </div>
    </footer>
  )
}
