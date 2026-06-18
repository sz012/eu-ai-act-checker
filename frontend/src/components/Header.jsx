import { Link } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'

export default function Header() {
  return (
    <header className="site-header">
      <Link to="/" className="brand">
        <ShieldCheck size={20} className="brand-icon" />
        EU AI Act Checker
      </Link>
      <span className="header-tag">Not legal advice</span>
    </header>
  )
}
