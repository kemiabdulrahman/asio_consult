import { courses } from '../data/courses'
import CourseList from '../components/courses/CourseList'
import SectionHeading from '../components/ui/SectionHeading'
import { FaMapMarkerAlt, FaLaptop, FaChalkboardTeacher } from 'react-icons/fa'

export default function Courses() {
  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Our ICT Courses"
          subtitle="Professional computer training — learn in-person at our Ibadan center or join online. Quality instructors, practical skills."
        />

        {/* Hybrid Learning Banner */}
        <div className="relative overflow-hidden rounded-2xl p-6 md:p-8 mb-12 border border-blue-100 bg-gradient-to-r from-blue-50 via-white to-green-50">
          <div className="blob w-40 h-40 -top-10 -right-10 bg-blue-200/30" />
          <div className="relative">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <FaLaptop className="text-white text-sm" />
                </span>
                Hybrid Learning Model
              </h3>
              <p className="text-gray-600 text-sm">
                All our courses are taught in a hybrid format — attend physical classes at our training center in Ibadan, or join live sessions online from anywhere. Learn at your own pace with the support of experienced, quality instructors.
              </p>
            </div>
            <div className="flex gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">{courses.length}</div>
                <div className="text-xs text-gray-500">Courses</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">2</div>
                <div className="text-xs text-gray-500">Learning Modes</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">1</div>
                <div className="text-xs text-gray-500">Location</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm border border-gray-50 lift">
              <FaMapMarkerAlt className="text-primary text-lg flex-shrink-0" />
              <div>
                <div className="font-semibold text-gray-900 text-sm">📍 Ibadan</div>
                <div className="text-xs text-gray-500">Physical classes</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm border border-gray-50 lift">
              <FaLaptop className="text-blue-500 text-lg flex-shrink-0" />
              <div>
                <div className="font-semibold text-gray-900 text-sm">💻 Online</div>
                <div className="text-xs text-gray-500">Live remote sessions</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm border border-gray-50 lift">
              <FaChalkboardTeacher className="text-green-500 text-lg flex-shrink-0" />
              <div>
                <div className="font-semibold text-gray-900 text-sm">👩‍🏫 Expert Instructors</div>
                <div className="text-xs text-gray-500">Quality & experienced teachers</div>
              </div>
            </div>
          </div>
          </div>
        </div>

        <CourseList courses={courses} />

        {/* Enrollment CTA */}
        <div className="mt-20 bg-white rounded-2xl p-8 md:p-12 text-center shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-1 w-40 bg-gradient-to-r from-primary to-secondary" />
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Start Learning?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Contact us on WhatsApp to enroll in any course, ask questions about our programs, or schedule a free consultation. Choose between in-person classes in Ibadan or online sessions.
          </p>
          <a
            href="https://wa.me/2348026295718?text=Hi, I'd like to enroll in a course at Asio Consult"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-500 text-white font-semibold px-8 py-4 rounded-xl hover:bg-green-600 transition-colors duration-300"
          >
            Enroll via WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
