import { FaQuoteLeft, FaStar } from 'react-icons/fa'
import SectionHeading from '../ui/SectionHeading'

const testimonials = [
  {
    name: 'Proprietor, Chrisdem Nursery & Primary School',
    location: 'Ibadan',
    text: 'Reportube has completely transformed how we prepare term reports. What used to take us several days of manual work now takes just a few hours. Our teachers love it and the parents are impressed with the professional reports.',
    product: 'Reportube',
    rating: 5
  },
  {
    name: 'Proprietor, As Sabbaq Model School',
    location: 'Ibadan',
    text: 'We switched to Reportube and it has been a game-changer for our school. The Google Sheets integration means we don\'t need any special software — it just works. We also use FinanceTube for our billing. Highly recommend Asio Consult!',
    product: 'Reportube & FinanceTube',
    rating: 5
  },
  {
    name: 'Proprietor, Al-Furqan Islamic School',
    location: 'Ibadan',
    text: 'As an Islamic school, we needed something flexible that could handle our unique grading system. Reportube handled it perfectly. The support team was very helpful in setting everything up for us. Thank you, Asio Consult!',
    product: 'Reportube',
    rating: 5
  }
]

export default function Testimonials() {
  return (
    <section className="py-24 bg-gradient-to-br from-dark via-gray-900 to-dark relative overflow-hidden">
      <div className="blob w-96 h-96 -top-20 -right-20 bg-primary/10" />
      <div className="blob w-96 h-96 -bottom-20 -left-20 bg-secondary/10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="What Our Schools Say"
          subtitle="Trusted by schools across Ibadan — from nurseries to model schools"
          light
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-primary/40 hover:-translate-y-1.5 transition-all duration-300"
            >
              <FaQuoteLeft className="text-primary/40 text-3xl mb-4" />

              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <FaStar key={i} className="text-secondary text-sm" />
                ))}
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              <div className="border-t border-white/10 pt-4 flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold flex-shrink-0">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">{testimonial.name}</div>
                  <div className="text-xs text-gray-400">{testimonial.location}</div>
                  {testimonial.product && (
                    <span className="inline-block mt-2 text-xs bg-white/10 text-primary border border-primary/20 px-2.5 py-0.5 rounded-full">
                      {testimonial.product}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
