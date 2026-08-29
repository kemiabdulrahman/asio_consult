import { Link } from 'react-router-dom'
import { FaClock, FaSignal, FaArrowRight, FaMapMarkerAlt, FaLaptop } from 'react-icons/fa'

export default function CourseCard({ course }) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border border-gray-100">
      <div className="relative h-48 overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
            {course.level}
          </span>
          {course.bonus && (
            <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
              BONUS COURSE
            </span>
          )}
        </div>
        {course.mode === 'hybrid' && (
          <div className="absolute bottom-4 left-4 flex gap-2">
            <span className="bg-white/95 backdrop-blur-sm text-gray-800 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
              <FaMapMarkerAlt className="text-primary" /> {course.location}
            </span>
            <span className="bg-white/95 backdrop-blur-sm text-gray-800 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
              <FaLaptop className="text-blue-500" /> Online
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
          {course.title}
        </h3>
        <p className="text-gray-600 text-sm mb-5 line-clamp-2">
          {course.description}
        </p>

        <div className="flex items-center gap-4 text-sm text-gray-500 mb-5">
          <span className="flex items-center gap-1.5">
            <FaClock className="text-primary" />
            {course.duration}
          </span>
          <span className="flex items-center gap-1.5">
            <FaSignal className="text-primary" />
            {course.level}
          </span>
        </div>

        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
          <div>
            {course.bonus ? (
              <>
                <span className="text-2xl font-extrabold text-green-600">FREE</span>
                <div className="text-xs text-gray-500">with any course registration</div>
              </>
            ) : (
              <span className="text-2xl font-extrabold text-primary">₦{course.price}</span>
            )}
          </div>
          <Link
            to={`/courses/${course.id}`}
            className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-dark hover:gap-3 transition-all"
          >
            View Details <FaArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  )
}
