import { FaWhatsapp } from 'react-icons/fa'

export default function ProductCard({ product }) {
  const discount = product.originalPrice
    ? Math.round(((parseInt(product.originalPrice.replace(/,/g, '')) - parseInt(product.price.replace(/,/g, ''))) / parseInt(product.originalPrice.replace(/,/g, ''))) * 100)
    : 0

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border border-gray-100 flex flex-col">
      <div className="relative h-56 overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-4 left-4 flex gap-2">
          {discount > 0 && (
            <span className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
              -{discount}% OFF
            </span>
          )}
        </div>
        <div className="absolute top-4 right-4">
          <span className={`text-xs font-semibold px-3 py-1 rounded-full shadow-sm ${
            product.available
              ? 'bg-green-500 text-white'
              : 'bg-red-500 text-white'
          }`}>
            {product.available ? 'Available' : 'Sold Out'}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2.5 py-1 rounded-md">
            {product.brand}
          </span>
          <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2.5 py-1 rounded-md">
            {product.condition}
          </span>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        <p className="text-sm text-gray-600 mb-3">
          {product.specs}
        </p>

        <p className="text-xs text-gray-500 mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-end gap-3 mb-5 mt-auto">
          <span className="text-2xl font-extrabold text-primary">₦{product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through mb-0.5">₦{product.originalPrice}</span>
          )}
        </div>

        <a
          href={`https://wa.me/2348026295718?text=Hi, I'm interested in the ${product.name} (${product.specs}) - ₦${product.price}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-green-500 text-white font-semibold py-3 rounded-xl hover:bg-green-600 hover:shadow-lg transition-all duration-300"
        >
          <FaWhatsapp />
          Buy via WhatsApp
        </a>
      </div>
    </div>
  )
}
