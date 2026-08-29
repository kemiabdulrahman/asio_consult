import { FaWhatsapp } from 'react-icons/fa'

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/2348026295718"
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-6 right-6 z-50 flex items-center gap-0 text-white transition-all duration-300 hover:gap-3 focus-ring rounded-full"
      aria-label="Chat on WhatsApp"
    >
      <span className="pointer-events-none max-w-0 overflow-hidden whitespace-nowrap bg-green-600 text-sm font-semibold translate-z-0 transition-all duration-300 group-hover:max-w-[140px] group-hover:pr-4 group-hover:pl-4 rounded-l-full py-3">
        Chat with us
      </span>
      <span className="relative bg-green-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 hover:shadow-2xl hover:scale-110 transition-all duration-300 flex-shrink-0">
        <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20" />
        <FaWhatsapp className="text-3xl relative" />
      </span>
    </a>
  )
}
