import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { Icon } from '@iconify/react'

export default function Header() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Add 'scrolled' class when page is scrolled down
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <SiteHeader className={scrolled ? 'scrolled' : ''}>
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
    icon: 'ion:code-slash'
  }
]

const SiteHeader = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  transition: backdrop-filter 0.3s ease;

  &.scrolled {
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 120px;
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      mask-image: linear-gradient(to bottom, 
        rgba(0, 0, 0, 1) 0%, 
        rgba(0, 0, 0, 1) 60%, 
        rgba(0, 0, 0, 0) 100%
      );
      -webkit-mask-image: linear-gradient(to bottom, 
        rgba(0, 0, 0, 1) 0%, 
        rgba(0, 0, 0, 1) 60%, 
        rgba(0, 0, 0, 0) 100%
      );
      z-index: -1;
      background-color: transparent;
    }
  }
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
      --color: rgb(255, 157, 244);
      border-color: var(--color);
      background: rgba(255, 157, 244, .3);
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