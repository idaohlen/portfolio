import { Link } from 'react-router-dom'
import classes from './Header.module.css'

export default function Header() {

  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
    </header>
  )
}