import { reportube } from '../data/products'
import SectionHeading from '../components/ui/SectionHeading'
import Button from '../components/ui/Button'
import { FaCheck, FaStar, FaArrowRight } from 'react-icons/fa'
import googleLogo from '../assets/google.png'
import googleFormsLogo from '../assets/google-forms.png'
import googleSheetsLogo from '../assets/google-sheets.png'
import appsScriptLogo from '../assets/apps-script.png'

export default function ReportTube() {
  const product = reportube

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
                  'Reports delivered to parents\' emails with a single click',
                  'AI creates exam questions & converts them to CBT',
                  'Automatic cloud backup via Google Drive'
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
                <div className="flex items-center justify-center gap-3 mb-2">
                  <img src={googleSheetsLogo} alt="Google Sheets" className="w-12 h-12 object-contain" />
                  <img src={googleFormsLogo} alt="Google Forms" className="w-12 h-12 object-contain" />
                  <img src={appsScriptLogo} alt="Apps Script" className="w-12 h-12 object-contain" />
                </div>
                <div className="text-sm text-gray-500">Google Workspace Tools</div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-20">
          <SectionHeading
            title="Powerful Features"
            subtitle="Everything you need to automate results processing, report delivery, and CBT exams"
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

        {/* Pricing */}
        <div className="mb-20">
          <SectionHeading
            title="Simple Pricing"
            subtitle="One-time payment — no subscriptions, no hidden fees. Pay once, use forever."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
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

                <h3 className="text-xl font-bold text-gray-900 mb-1">{plan.name}</h3>
                <p className="text-sm text-gray-500 mb-6">{plan.description}</p>

                <div className="space-y-3 mb-8">
                  {plan.prices.map((p, i) => (
                    <div key={i} className="flex items-center justify-between rounded-xl border border-gray-100 px-4 py-3 hover:border-primary/40 transition-colors">
                      <span className="text-sm font-medium text-gray-600">{p.label}</span>
                      <span className="text-xl font-bold text-primary">₦{p.price}</span>
                    </div>
                  ))}
                </div>

                <a
                  href={`https://wa.me/2348026295718?text=Hi, I'm interested in ${plan.name} at Asio Consult. Please share more details.`}
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

        {/* Add-on Enhancements */}
        <div className="mb-20">
          <SectionHeading
            title="Add-on Enhancements"
            subtitle="Extend your solution with powerful add-ons — one-time payment each"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {product.enhancements.map((enhancement, index) => (
              <div key={index} className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border border-gray-100 lift flex flex-col">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{enhancement.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1">{enhancement.description}</p>
                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="text-xl font-extrabold text-primary">₦{enhancement.price}</span>
                  <a
                    href={`https://wa.me/2348026295718?text=Hi, I'm interested in the ${enhancement.title} add-on (₦${enhancement.price})`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm hover:text-primary-dark transition-colors"
                  >
                    Inquire <FaArrowRight className="text-xs" />
                  </a>
                </div>
              </div>
            ))}
          </div>
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
          <h2 className="text-3xl font-bold tracking-tight mb-4">Ready to Transform Your School's Result Processing?</h2>
          <p className="text-white/85 mb-6 max-w-2xl mx-auto">
            Join schools already using Reportube to process results, send reports to parents, and run CBT exams — right inside Google Workspace.
          </p>
          <Button
            href="https://wa.me/2348026295718?text=Hi, I'd like to try Reportube for my school"
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
