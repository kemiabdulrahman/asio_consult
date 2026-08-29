import { reportTube } from '../data/products'
import SectionHeading from '../components/ui/SectionHeading'
import Button from '../components/ui/Button'
import { FaCheck, FaStar, FaArrowRight } from 'react-icons/fa'
import googleLogo from '../assets/google.png'
import googleSheetsLogo from '../assets/google-sheets.png'

export default function ReportTube() {
  const product = reportTube

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 rounded-full px-4 py-2 mb-4">
            <img src={googleLogo} alt="Google" className="w-4 h-4" />
            <span className="font-semibold">Google Workspace Add-on</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">{product.name}</h1>
          <p className="text-xl text-primary font-semibold mb-4">{product.tagline}</p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">{product.description}</p>
        </div>

        {/* Google Workspace Highlight */}
        <div className="mb-20 bg-gradient-to-br from-blue-50 to-green-50 rounded-3xl p-8 md:p-12 border border-blue-100 relative overflow-hidden">
          <div className="blob w-60 h-60 -bottom-16 -right-16 bg-green-200/30" />
          <div className="blob w-40 h-40 -top-10 -left-10 bg-blue-200/30" />
          <div className="relative flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center">
                  <img src={googleLogo} alt="Google" className="w-7 h-7" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Built on Google Workspace</h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">{product.googleIntegration}</p>
              <ul className="space-y-2">
                {[
                  'No software to install — runs in your browser',
                  'Works with your existing Google account',
                  'Familiar Google Sheets interface',
                  'Automatic cloud backup via Google Drive',
                  'Share reports via Gmail instantly'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-700">
                    <FaCheck className="text-green-500 text-sm flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-shrink-0">
              <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
                <img src={googleSheetsLogo} alt="Google Sheets" className="w-16 h-16 mx-auto mb-2 object-contain" />
                <div className="text-sm text-gray-500">Google Sheets</div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-20">
          <SectionHeading
            title="Powerful Features"
            subtitle="Everything you need to automate your school's report generation"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {product.features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border border-gray-100 lift">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <FaCheck className="text-primary text-xl" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-20 bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
          <SectionHeading
            title="How It Works"
            subtitle="Get started in three simple steps"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Install', description: 'Add ReportTube from the Google Workspace Marketplace' },
              { step: '02', title: 'Configure', description: 'Set up templates and grading systems in Google Sheets' },
              { step: '03', title: 'Generate', description: 'Auto-generate and share reports via Google Docs or email' }
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <span className="text-2xl font-extrabold text-primary group-hover:text-white">{item.step}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div className="mb-20">
          <SectionHeading
            title="Simple Pricing"
            subtitle="One-time payment — no subscriptions, no hidden fees. Pay once, use forever."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {product.pricing.map((plan, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-8 shadow-sm border-2 transition-all hover:-translate-y-1 ${
                  plan.popular ? 'border-primary relative' : 'border-transparent hover:shadow-md'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-sm font-semibold px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                )}

                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-primary">₦{plan.price}</span>
                  <span className="text-gray-500 text-sm ml-2">one-time</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={`https://wa.me/2348026295718?text=Hi, I'm interested in the ${plan.name} plan for ReportTube (₦${plan.price} one-time payment)`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block text-center py-3 rounded-xl font-semibold transition-colors ${
                    plan.popular
                      ? 'bg-primary text-white hover:bg-primary-dark'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Get Started
                </a>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-500 text-sm mt-6">
            {product.paymentNote}
          </p>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <SectionHeading
            title="What Schools Say"
            subtitle="Trusted by educational institutions across the country"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {product.testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar key={i} className="text-secondary text-sm" />
                  ))}
                </div>
                <p className="text-gray-600 italic mb-4">"{testimonial.text}"</p>
                <div className="font-semibold text-gray-900">{testimonial.name}</div>
                <div className="text-sm text-gray-500">{testimonial.role}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-primary to-primary-dark rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.07]" aria-hidden="true"
            style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '28px 28px' }} />
          <div className="relative">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Ready to Transform Your Report Generation?</h2>
          <p className="text-white/85 mb-6 max-w-2xl mx-auto">
            Join schools already using ReportTube to save time and improve accuracy — right inside Google Sheets.
          </p>
          <Button
            href="https://wa.me/2348026295718?text=Hi, I'd like to try ReportTube for my school"
            variant="white"
            size="lg"
          >
            Request Free Demo <FaArrowRight className="ml-2" />
          </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
