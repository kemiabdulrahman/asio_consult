import { useState } from 'react'
import SectionHeading from '../components/ui/SectionHeading'
import { FaWhatsapp, FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPaperPlane } from 'react-icons/fa'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    const whatsappMessage = `Hello Asio Consult!%0A%0AName: ${formData.name}%0AEmail: ${formData.email}%0ASubject: ${formData.subject}%0AMessage: ${formData.message}`
    window.open(`https://wa.me/2348026295718?text=${whatsappMessage}`, '_blank')
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const contactInfo = [
    { icon: FaEnvelope, label: 'Email', value: 'info@asioconsult.com', href: 'mailto:info@asioconsult.com' },
    { icon: FaPhone, label: 'Phone', value: '+234 802 629 5718 / +234 806 695 2900', href: 'tel:+2348026295718' },
    { icon: FaWhatsapp, label: 'WhatsApp', value: '+234 802 629 5718', href: 'https://wa.me/2348026295718' },
    { icon: FaMapMarkerAlt, label: 'Location', value: 'Lagos, Nigeria', href: null },
  ]

  const socialLinks = [
    { icon: FaFacebook, href: '#', label: 'Facebook' },
    { icon: FaTwitter, href: '#', label: 'Twitter' },
    { icon: FaInstagram, href: '#', label: 'Instagram' },
    { icon: FaLinkedin, href: '#', label: 'LinkedIn' },
  ]

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Get In Touch"
          subtitle="Have a question or want to learn more about our services? We'd love to hear from you."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Send Us a Message</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="John Doe"                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="john@example.com"                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="How can we help you?"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3 rounded-xl hover:bg-primary-dark shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 focus-ring"
              >
                <FaPaperPlane />
                Send Message
              </button>

              <p className="text-xs text-gray-500 mt-4">
                Your message will be sent via WhatsApp for a quick response.
              </p>
            </form>
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-6">
            {/* Contact Details */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">{item.label}</div>
                      {item.href ? (
                        <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="font-medium text-gray-900 hover:text-primary transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <div className="font-medium text-gray-900">{item.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Follow Us</h3>
                <div className="flex gap-3">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white hover:-translate-y-1 transition-all duration-300 focus-ring"
                    aria-label={label}
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* WhatsApp Quick Chat */}
            <div className="bg-green-500 rounded-2xl p-6 text-white">
              <FaWhatsapp className="text-3xl mb-3" />
              <h3 className="text-lg font-bold mb-2">Quick Chat</h3>
              <p className="text-sm text-white/80 mb-4">
                Need a quick response? Chat with us directly on WhatsApp!
              </p>
              <a
                href="https://wa.me/2348026295718?text=Hello, I have a question about Asio Consult's services"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white text-green-500 font-semibold px-6 py-2 rounded-lg hover:bg-gray-100 hover:-translate-y-0.5 transition-all duration-300 focus-ring"
              >
                Start Chat
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
