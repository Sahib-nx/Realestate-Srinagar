import { Link } from 'react-router-dom'

interface PillButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: 'outline' | 'filled' | 'white'
  className?: string
}

export default function PillButton({ children, href, onClick, variant = 'outline', className = '' }: PillButtonProps) {
  const baseStyles = 'inline-block rounded-full px-7 py-3 font-["Inter"] text-[13px] font-medium uppercase tracking-[0.05em] transition-all duration-200 cursor-pointer'

  const variants = {
    outline: 'border border-[#00523C] text-[#00523C] hover:bg-[#00523C] hover:text-white',
    filled: 'bg-[#00523C] text-white hover:bg-[#00402e]',
    white: 'bg-white text-[#00523C] hover:bg-[#f5f5f5]',
  }

  const classes = `${baseStyles} ${variants[variant]} ${className}`

  if (href) {
    return (
      <Link to={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  )
}
