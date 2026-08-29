import Hero from '../components/home/Hero'
import Features from '../components/home/Features'
import AboutPreview from '../components/home/AboutPreview'
import Testimonials from '../components/home/Testimonials'
import Button from '../components/ui/Button'
import { FaArrowRight } from 'react-icons/fa'

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <AboutPreview />
      <Testimonials />

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary via-primary to-primary-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07]" aria-hidden="true"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '28px 28px' }} />
        <div className="blob w-80 h-80 -bottom-24 -left-16 bg-white/10" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-white/85 mb-9 max-w-2xl mx-auto leading-relaxed">
            Whether you want to learn new skills, automate your school operations, or get quality hardware — we're here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button to="/courses" variant="white" size="lg" className="px-9">
              Browse Courses <FaArrowRight className="ml-2" />
            </Button>
            <Button
              href="https://wa.me/2348026295718?text=Hello, I'd like to learn more about Asio Consult's services"
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary"
            >
              Chat on WhatsApp
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
