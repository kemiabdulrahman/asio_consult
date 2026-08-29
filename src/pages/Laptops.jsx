import { laptops } from '../data/laptops'
import ProductGrid from '../components/products/ProductGrid'
import SectionHeading from '../components/ui/SectionHeading'
import { FaWhatsapp, FaSchool, FaClipboardCheck, FaCog, FaCheck } from 'react-icons/fa'
import { useState } from 'react'

const brands = ['All', ...new Set(laptops.map(l => l.brand))]
const categories = ['All', ...new Set(laptops.map(l => l.category))]

export default function Laptops() {
  const [selectedBrand, setSelectedBrand] = useState('All')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filtered = laptops.filter(l => {
    const brandMatch = selectedBrand === 'All' || l.brand === selectedBrand
    const catMatch = selectedCategory === 'All' || l.category === selectedCategory
    return brandMatch && catMatch
  })

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Laptops & Computers"
          subtitle="Quality new and refurbished laptops at affordable prices. Bulk supply for schools with full setup and configuration."
        />

        {/* Bulk Laptops for Schools */}
        <div className="mb-12 bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-6 md:p-8 border border-blue-100 relative overflow-hidden">
          <div className="blob w-52 h-52 -top-16 -right-10 bg-blue-200/30" />
          <div className="relative flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <FaSchool className="text-primary text-xl" />
                Laptops for Schools & CBT Centers
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                We supply laptops in bulk for schools at affordable prices. Need laptops for a CBT examination center? We provide full setup and configuration so your laptops are ready to use from day one.
              </p>
              <ul className="space-y-2">
                {[
                  'Affordable bulk pricing for schools',
                  'Full setup & configuration included',
                  'Pre-configured for CBT examinations',
                  'Quality refurbished and new options',
                  'Ongoing technical support'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-700">
                    <FaCheck className="text-green-500 text-sm flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex gap-4">
              <a
                href="https://wa.me/2348026295718?text=Hi, I need bulk laptops for my school. What are the options?"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-xl hover:bg-primary-dark transition-colors shadow-md hover:shadow-lg"
              >
                <FaWhatsapp />
                Bulk Order
              </a>
              <a
                href="/entrance-exams"
                className="inline-flex items-center gap-2 bg-orange-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-orange-600 transition-colors shadow-md hover:shadow-lg"
              >
                <FaClipboardCheck />
                Entrance Exams (CBT)
              </a>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <div className="flex flex-wrap gap-2">
            {brands.map(brand => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all focus-ring ${
                  selectedBrand === brand
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
          <span className="hidden md:block w-px bg-gray-200" />
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all focus-ring ${
                  selectedCategory === cat
                    ? 'bg-dark text-white shadow-md'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <ProductGrid products={filtered} />

        {/* Setup & Support CTA */}
        <div className="mt-16 bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaCog className="text-primary" />
                Full Setup & Configuration
              </h3>
              <p className="text-gray-600 mb-4">
                Every laptop we supply comes with complete setup and configuration. Whether it's for general use, a computer lab, or a CBT examination center — we make sure everything works perfectly before delivery.
              </p>
              <ul className="space-y-2">
                {[
                  'Operating system installation & updates',
                  'Software setup & configuration',
                  'Entrance Exams (CBT) pre-installation (if needed)',
                  'Network & Wi-Fi configuration',
                  'On-site setup for bulk orders'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-700">
                    <FaCheck className="text-green-500 text-sm flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-center">
              <a
                href="https://wa.me/2348026295718?text=Hi, I need laptops with full setup for my school/computer lab"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 text-white font-semibold px-8 py-4 rounded-xl hover:bg-green-600 transition-colors duration-300"
              >
                <FaWhatsapp />
                Get a Custom Quote
              </a>
            </div>
          </div>
        </div>

        {/* Custom Request CTA */}
        <div className="mt-8 bg-dark rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          <div className="blob w-72 h-72 -top-20 -right-16 bg-primary/20" />
          <div className="blob w-72 h-72 -bottom-20 -left-16 bg-secondary/10" />
          <div className="relative">
          <h3 className="text-2xl font-bold tracking-tight mb-4">
            Looking for Something Specific?
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Can't find what you need? We can source specific laptops and computers to meet your requirements. Contact us with your specifications.
          </p>
          <a
            href="https://wa.me/2348026295718?text=Hi, I'm looking for a specific laptop/computer. Can you help?"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-secondary text-dark font-semibold px-8 py-4 rounded-xl hover:bg-secondary-dark transition-colors duration-300"
          >
            <FaWhatsapp />
            Request Custom Order
          </a>
          </div>
        </div>
      </div>
    </div>
  )
}
