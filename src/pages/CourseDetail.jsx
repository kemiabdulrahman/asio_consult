import { useParams, Link } from 'react-router-dom'
import { getCourseById } from '../data/courses'
import { FaClock, FaSignal, FaCheck, FaArrowLeft, FaWhatsapp, FaMapMarkerAlt, FaLaptop, FaChalkboardTeacher } from 'react-icons/fa'
import Button from '../components/ui/Button'

export default function CourseDetail() {
  const { id } = useParams()
  const course = getCourseById(id)

  if (!course) {
    return (
      <div className="py-20 text-center min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h2>
          <p className="text-gray-600 mb-6">The course you're looking for doesn't exist.</p>
          <Button to="/courses" variant="primary">Browse All Courses</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link to="/courses" className="inline-flex items-center gap-2 text-primary hover:text-primary-dark mb-8 transition-colors">
          <FaArrowLeft /> Back to Courses
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Image */}
            <div className="relative rounded-2xl overflow-hidden h-64 md:h-80 shadow-md">
              <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-primary text-white text-sm font-semibold px-4 py-1 rounded-full shadow-sm">
                  {course.level}
                </span>
                {course.mode === 'hybrid' && (
                  <span className="bg-white/95 text-gray-800 text-sm font-semibold px-4 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    <FaLaptop className="text-blue-500" /> Hybrid Course
                  </span>
                )}
              </div>
            </div>

            {/* Title & Description */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{course.title}</h1>
              <p className="text-gray-600 leading-relaxed">{course.description}</p>
            </div>

            {/* Hybrid Learning Info */}
            {course.mode === 'hybrid' && (
              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100 relative overflow-hidden">
                <div className="blob w-32 h-32 -top-8 -right-8 bg-blue-200/30" />
                <div className="relative">
                <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <FaLaptop className="text-blue-500" /> Hybrid Learning Model
                </h2>
                <p className="text-gray-600 text-sm mb-4">
                  This course is available both in-person and online. Choose the format that works best for you.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 bg-white rounded-xl p-4">
                    <FaMapMarkerAlt className="text-primary mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">In-Person</div>
                      <div className="text-sm text-gray-600">Physical classes at our center in {course.location}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white rounded-xl p-4">
                    <FaLaptop className="text-blue-500 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Online</div>
                      <div className="text-sm text-gray-600">Join live sessions remotely from anywhere</div>
                    </div>
                  </div>
                </div>
              </div>
              </div>
            )}

            {/* Features */}
            <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">What You'll Learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {course.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FaCheck className="text-primary text-xs" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum */}
            <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Course Curriculum</h2>
              <div className="space-y-4">
                {course.curriculum.map((week, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-5 hover:border-primary/40 hover:shadow-sm transition-all">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-10 h-10 rounded-lg bg-primary/10 text-primary font-bold flex items-center justify-center flex-shrink-0">{week.week}</span>
                      <h3 className="font-semibold text-gray-900">{week.title}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2 pl-0">
                      {week.topics.map((topic, i) => (
                        <span key={i} className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full hover:bg-primary/10 hover:text-primary transition-colors">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-card-hover border border-gray-100 sticky top-24 overflow-hidden">
              <div className="h-1.5 bg-gradient-to-r from-primary via-secondary to-primary" />
              <div className="p-7">
              <div className="text-center mb-6">
                {course.bonus ? (
                  <>
                    <div className="text-3xl font-extrabold text-green-600 mb-2">FREE</div>
                    <p className="text-sm text-gray-500">Bonus course — included free with any course registration</p>
                  </>
                ) : (
                  <>
                    <div className="text-3xl font-extrabold text-primary mb-2">₦{course.price}</div>
                    <p className="text-sm text-gray-500">One-time payment</p>
                  </>
                )}
              </div>

              <div className="space-y-4 mb-7">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"><FaClock className="text-primary" /></span>
                  <div>
                    <div className="text-xs text-gray-500">Duration</div>
                    <div className="font-medium text-gray-900">{course.duration}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"><FaSignal className="text-primary" /></span>
                  <div>
                    <div className="text-xs text-gray-500">Level</div>
                    <div className="font-medium text-gray-900">{course.level}</div>
                  </div>
                </div>
                {course.mode === 'hybrid' && (
                  <>
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"><FaMapMarkerAlt className="text-primary" /></span>
                      <div>
                        <div className="text-xs text-gray-500">Location</div>
                        <div className="font-medium text-gray-900">{course.location}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"><FaLaptop className="text-primary" /></span>
                      <div>
                        <div className="text-xs text-gray-500">Mode</div>
                        <div className="font-medium text-gray-900">Hybrid (In-Person + Online)</div>
                      </div>
                    </div>
                  </>
                )}
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"><FaChalkboardTeacher className="text-primary" /></span>
                  <div>
                    <div className="text-xs text-gray-500">Instructors</div>
                    <div className="font-medium text-gray-900">Quality & Experienced Teachers</div>
                  </div>
                </div>
              </div>

              <a
                href={`https://wa.me/2348026295718?text=Hi, I'd like to enroll in the ${course.title} course (${course.bonus ? 'FREE bonus course' : `₦${course.price}`}). I'm interested in the hybrid option.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-green-500 text-white font-semibold py-4 rounded-xl hover:bg-green-600 shadow-md hover:shadow-lg transition-all duration-300 mb-3"
              >
                <FaWhatsapp />
                Enroll via WhatsApp
              </a>

              <p className="text-xs text-center text-gray-500">
                Contact us for group discounts and flexible payment plans
              </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
