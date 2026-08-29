import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import WhatsAppButton from './components/ui/WhatsAppButton'
import Home from './pages/Home'
import Courses from './pages/Courses'
import CourseDetail from './pages/CourseDetail'
import ReportTube from './pages/ReportTube'
import FinanceTube from './pages/FinanceTube'
import EntranceExams from './pages/EntranceExams'
import Laptops from './pages/Laptops'
import About from './pages/About'
import Contact from './pages/Contact'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/reporttube" element={<ReportTube />} />
          <Route path="/financetube" element={<FinanceTube />} />
          <Route path="/entrance-exams" element={<EntranceExams />} />
          <Route path="/billtube" element={<Navigate to="/financetube" replace />} />
          <Route path="/cbttube" element={<Navigate to="/entrance-exams" replace />} />
          <Route path="/laptops" element={<Laptops />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default App
