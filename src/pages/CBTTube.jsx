import { cbtTube } from '../data/products'
import SectionHeading from '../components/ui/SectionHeading'
import Button from '../components/ui/Button'
import { FaCheck, FaStar, FaArrowRight, FaClipboardCheck } from 'react-icons/fa'
import googleLogo from '../assets/google.png'
import googleFormsLogo from '../assets/google-forms.png'
import googleSheetsLogo from '../assets/google-sheets.png'
import appsScriptLogo from '../assets/apps-script.png'

export default function CBTTube() {
  const product = cbtTube

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 rounded-full px-4 py-2 mb-4">
            <img src={googleLogo} alt="Google" className="w-4 h-4" />
            <span className="font-semibold">Google Workspace Add-on</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">{product.name}</h1>
          <p className="text-xl text-primary font-semibold mb-4">{product.tagline}</p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">{product.description}</p>
        </div>

        {/* Google Workspace Highlight */}
        <div className="mb-20 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-3xl p-8 md:p-12 border border-orange-100 relative overflow-hidden">
          <div className="blob w-60 h-60 -bottom-16 -right-16 bg-yellow-200/30" />
          <div className="blob w-40 h-40 -top-10 -left-10 bg-orange-200/30" />
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
                  'Questions imported via Google Forms — easy and familiar',
                  'Apps Script auto-generates and randomizes exams',
                  'Results stored in Google Sheets — instant access',
                  'No software to install — runs in your browser',
                  'Works with your existing Google account'
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
                  <img src={googleFormsLogo} alt="Google Forms" className="w-12 h-12 object-contain" />
                  <img src={appsScriptLogo} alt="Apps Script" className="w-12 h-12 object-contain" />
                </div>
                <div className="text-sm text-gray-500">Google Forms + Apps Script</div>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works — Easy Question Import */}
        <div className="mb-20">
          <SectionHeading
            title="How Question Import Works"
            subtitle="Importing questions is incredibly easy — just use Google Forms"
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { image: googleFormsLogo, alt: 'Google Forms', title: 'Create in Forms', description: 'Write your exam questions in Google Forms — just like filling a form' },
              { image: appsScriptLogo, alt: 'Apps Script', title: 'Apps Script Generates', description: 'Apps Script automatically processes and generates the exam from your questions' },
              { icon: FaClipboardCheck, title: 'Students Take Exam', description: 'Students access the exam via a link and answer questions on any device' },
              { image: googleSheetsLogo, alt: 'Google Sheets', title: 'Instant Results', description: 'Auto-marked results with analytics appear immediately in Google Sheets' }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm text-center hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border border-gray-100 lift">
                <div className="w-14 h-14 rounded-xl bg-white border border-orange-100 shadow-sm flex items-center justify-center mx-auto mb-4">
                  {item.image ? (
                    <img src={item.image} alt={item.alt} className="w-9 h-9 object-contain" />
                  ) : (
                    <item.icon className="text-orange-600 text-2xl" />
                  )}
                </div>
                <div className="text-sm font-bold text-orange-500 mb-2">Step {index + 1}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-20">
          <SectionHeading
            title="Powerful Features"
            subtitle="Everything you need to conduct computer-based examinations"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {product.features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border border-gray-100 lift">
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-4">
                  <FaCheck className="text-orange-600 text-xl" />
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {product.pricing.map((plan, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-8 shadow-sm border-2 transition-all hover:-translate-y-1 ${
                  plan.popular ? 'border-orange-500 relative' : 'border-transparent hover:shadow-md'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-sm font-semibold px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                )}

                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-orange-600">₦{plan.price}</span>
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
                  href={`https://wa.me/2348026295718?text=Hi, I'm interested in the ${plan.name} plan for CBT Tube (₦${plan.price} one-time payment)`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block text-center py-3 rounded-xl font-semibold transition-colors ${
                    plan.popular
                      ? 'bg-orange-500 text-white hover:bg-orange-600'
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

        {/* Laptops + CBT Bundle CTA */}
        <div className="mb-20 bg-gradient-to-br from-dark via-gray-900 to-dark rounded-3xl p-8 md:p-12 text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Need Laptops for Your CBT Center?
              </h2>
              <p className="text-gray-300 mb-6">
                We supply affordable laptops in bulk for schools setting up CBT examination centers. Each laptop comes with full setup and configuration for CBT Tube — ready to use from day one.
              </p>
              <ul className="space-y-2 mb-6">
                {[
                  'Affordable bulk laptop supply for schools',
                  'Full setup & configuration included',
                  'Pre-configured for CBT Tube',
                  'Ongoing technical support'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <FaCheck className="text-secondary text-sm" />
                    <span className="text-gray-300 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href="https://wa.me/2348026295718?text=Hi, I'm interested in bulk laptops for our school CBT center"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-secondary text-dark font-semibold px-6 py-3 rounded-xl hover:bg-secondary-dark transition-colors"
              >
                Inquire About Bulk Laptops
              </a>
            </div>
            <div className="flex justify-center">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-2xl p-6 text-center">
                  <div className="text-3xl mb-2">💻</div>
                  <div className="text-sm font-semibold">Bulk Laptops</div>
                  <div className="text-xs text-gray-400">Affordable pricing</div>
                </div>
                <div className="bg-white/10 rounded-2xl p-6 text-center">
                  <div className="text-3xl mb-2">🔧</div>
                  <div className="text-sm font-semibold">Full Setup</div>
                  <div className="text-xs text-gray-400">Ready to use</div>
                </div>
                <div className="bg-white/10 rounded-2xl p-6 text-center">
                  <div className="text-3xl mb-2">📝</div>
                  <div className="text-sm font-semibold">CBT Tube</div>
                  <div className="text-xs text-gray-400">Pre-installed</div>
                </div>
                <div className="bg-white/10 rounded-2xl p-6 text-center">
                  <div className="text-3xl mb-2">🛡️</div>
                  <div className="text-sm font-semibold">Support</div>
                  <div className="text-xs text-gray-400">Ongoing assistance</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <SectionHeading
            title="What Schools Say"
            subtitle="Trusted by educational institutions across Ibadan"
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
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.07]" aria-hidden="true"
            style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '28px 28px' }} />
          <div className="relative">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Ready to Modernize Your Examinations?</h2>
          <p className="text-white/85 mb-6 max-w-2xl mx-auto">
            Join schools already using CBT Tube to conduct exams efficiently with auto-marking and instant results — all on Google Workspace.
          </p>
          <Button
            href="https://wa.me/2348026295718?text=Hi, I'd like to try CBT Tube for my school"
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
