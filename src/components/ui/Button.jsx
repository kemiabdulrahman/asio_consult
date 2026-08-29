import { Link } from 'react-router-dom'

export default function Button({ children, to, href, variant = 'primary', size = 'md', className = '', onClick, ...props }) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 cursor-pointer focus-ring'

  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark shadow-md hover:shadow-lg hover:-translate-y-0.5',
    secondary: 'bg-secondary text-dark hover:bg-secondary-dark shadow-md hover:shadow-lg hover:-translate-y-0.5',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
    dark: 'bg-dark text-white hover:bg-gray-800 shadow-md hover:shadow-lg hover:-translate-y-0.5',
    white: 'bg-white text-primary hover:bg-gray-50 shadow-md hover:shadow-lg hover:-translate-y-0.5',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button onClick={onClick} className={classes} {...props}>
      {children}
    </button>
  )
}
