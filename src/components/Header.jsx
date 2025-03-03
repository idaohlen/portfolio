import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { Icon } from '@iconify/react'

export default function Header() {
  const location = useLocation()

  return (
    <SiteHeader>
      <Nav>
        { links.map(link => (
          <Link to={link.path} key={link.label} className={`flex items-center gap-1 ${location.pathname === link.path ? 'active' : ''}`}>
            <Icon icon={link.icon}  />
            <div>{link.label}</div>
          </Link>
        )) }
      </Nav>
    </SiteHeader>
  )
}

const links = [
  {
    label: 'Home',
    path: '/',
    icon: 'iconamoon:home-light'
  },
  {
    label: 'About',
    path: '/about',
    icon: 'iconamoon:comment-light'
  },
  {
    label: 'Skills',
    path: '/skills',
    icon: 'iconamoon:lightning-1-light'
  },
  {
    label: 'Projects',
    path: '/projects',
    icon: 'stash:folder'
  }
]

const SiteHeader = styled.header`
  position: sticky;
  left: 0;
  right: 0;
`

const Nav = styled.nav`
  display: flex;
  justify-content: flex-end;
  margin: 2rem;
  gap: .2rem;
  font-size: .9rem;
  a {
    color: white;
    padding: .4rem 1rem;
    border: 1px solid #ffffff83;
    border-radius: 10rem;
    text-decoration: none;
    transform: scale(.9);

    &.active {
      transform: scale(1);
      border: 1px solid #ffffff;
    }

    &:hover {
      background: #ffffff2a;
      border-color: #ffffffd1;
    }
    
    &:first-child:hover {
      --color: rgb(255, 140, 78);
      border-color: var(--color);
      background: rgba(255, 140, 78, .3);
    }

    &:nth-child(2):hover {
      --color: rgb(255, 197, 61);
      border-color: var(--color);
      background: rgba(255, 197, 61, .3);
    }

    &:nth-child(3):hover {
      --color: rgb(48, 201, 140);
      border-color: var(--color);
      background: rgba(48, 201, 140, .3);
    }

    &:nth-child(4):hover {
      --color: rgb(137, 198, 255);
      border-color: var(--color);
      background: rgba(137, 198, 255, .3);
    }
  }
`