import { Link } from 'react-router-dom'
import styled from 'styled-components'

const SiteHeader = styled.header`
  position: absolute;
  left: 0;
  right: 0;
`

const Nav = styled.nav`
  display: flex;
  justify-content: flex-end;
  margin: 2rem;
  gap: 1rem;
  a {
    color: white;
    padding: .4rem 1rem;
    border: 1px solid white;
    border-radius: 10rem;
  }
`

export default function Header() {

  return (
    <SiteHeader>
      <Nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/projects">Projects</Link>
      </Nav>
    </SiteHeader>
  )
}