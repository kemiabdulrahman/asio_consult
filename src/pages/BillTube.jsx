import { billTube } from '../data/products'
import SectionHeading from '../components/ui/SectionHeading'
import Button from '../components/ui/Button'
import { FaCheck, FaStar, FaArrowRight } from 'react-icons/fa'

export default function BillTube() {
  const product = billTube

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 rounded-full px-4 py-2 mb-5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
            <span className="font-semibold">Product</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">{product.name}</h1>
          <p className="text-xl text-primary font-semibold mb-4">{product.tagline}</p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">{product.description}</p>
        </div>

        {/* Features Grid */}
        <div className="mb-20">
          <SectionHeading
            title="Powerful Features"
            subtitle="Everything you need to manage your school's billing efficiently"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {product.features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border border-gray-100 lift">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
                  <FaCheck className="text-purple-600 text-xl" />
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
            subtitle="Streamline your billing in three simple steps"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Configure', description: 'Set up fee structures and payment methods' },
              { step: '02', title: 'Invoice', description: 'Generate professional invoices automatically' },
              { step: '03', title: 'Track', description: 'Monitor payments and send automated reminders' }
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center mx-auto mb-5 group-hover:bg-purple-500 group-hover:scale-110 transition-all duration-300">
                  <span className="text-2xl font-extrabold text-purple-600 group-hover:text-white">{item.step}</span>
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
                  plan.popular ? 'border-purple-500 relative' : 'border-transparent hover:shadow-md'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-500 text-white text-sm font-semibold px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                )}

                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-purple-600">₦{plan.price}</span>
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
                  href={`https://wa.me/2348026295718?text=Hi, I'm interested in the ${plan.name} plan for BillTube (₦${plan.price} one-time payment)`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block text-center py-3 rounded-xl font-semibold transition-colors ${
                    plan.popular
                      ? 'bg-purple-500 text-white hover:bg-purple-600'
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
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.07]" aria-hidden="true"
            style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '28px 28px' }} />
          <div className="relative">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Ready to Simplify Your School Billing?</h2>
          <p className="text-white/85 mb-6 max-w-2xl mx-auto">
            Join schools already using BillTube to manage fees and payments efficiently.
          </p>
          <Button
            href="https://wa.me/2348026295718?text=Hi, I'd like to try BillTube for my school"
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
