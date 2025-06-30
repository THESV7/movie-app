import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="text-center bg-neutral-600/35 text-neutral-400 py-2">
      <div className="flex items-center justify-center gap-4">
        <Link to="/">About</Link>
        <Link to="/">Contact</Link>
      </div>
      <p className="text-sm">© 2025 Movieo — Built with ❤️ using the TMDb API for movie lovers.</p>
    </footer>
  )
}

export default Footer