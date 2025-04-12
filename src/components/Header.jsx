import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import tw from 'twin.macro'
import styled from 'styled-components'
import { Icon } from '@iconify/react'
import { motion, AnimatePresence } from 'motion/react'

export default function Header() {
  const location = useLocation()
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 480)

  function toggleNav() {
    setIsNavOpen(!isNavOpen)
  }

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 480
      setIsMobile(mobile)

      if (!mobile) setIsNavOpen(true)
    }

    handleResize()
    
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Determine when to show blur effect
  const showBlur = !isMobile || isNavOpen

  return (
    <SiteHeader className={showBlur ? 'show-blur' : ''}>
      <ToggleMenu onClick={toggleNav}>
        <AnimatePresence mode="wait">
          <motion.div
            key={isNavOpen ? 'close' : 'menu'}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Icon 
              fontSize="32px" 
              icon={isNavOpen 
                ? "iconamoon:close-thin" 
                : "iconamoon:menu-burger-horizontal-thin"
              } 
            />
          </motion.div>
        </AnimatePresence>
      </ToggleMenu>

      <AnimatePresence>
      {(isNavOpen || !isMobile) && (
        <Nav
          className='flex-col xs:flex-row'
          $isOpen={isNavOpen}
          as={motion.nav}
          initial={isMobile ? { opacity: 0, height: 0 } : { opacity: 1 }}
          animate={{ 
            opacity: 1, 
            height: 'auto',
            transition: {
              height: { duration: 0.3 }
            }
          }}
          exit={isMobile ? { 
            opacity: 0, 
            height: 0,
            transition: {
              height: { duration: 0.3 }
            }
          } : { opacity: 1 }}
          transition={{ 
            duration: 0.3, 
            ease: "easeOut"
          }}
        >
          { links.map(link => (
            <Link
              to={link.path}
              key={link.label}
              className={`flex items-center gap-1 ${location.pathname === link.path ? 'active' : ''}`}
            >
              <Icon icon={link.icon}  />
              <div>{link.label}</div>
            </Link>
          )) }
        </Nav>
        )}
      </AnimatePresence>
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
  z-index: 20;
  transition: backdrop-filter 0.3s ease;


  &::before {
    ${tw`h-[250px] xs:h-[120px]`};
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    mask-image: linear-gradient(to bottom, 
      rgba(0, 0, 0, 1) 0%, 
      rgba(0, 0, 0, 1) 40%, 
      rgba(0, 0, 0, .9) 80%,
      rgba(0, 0, 0, 0) 100%
    );
    -webkit-mask-image: linear-gradient(to bottom, 
      rgba(0, 0, 0, 1) 0%, 
      rgba(0, 0, 0, 1) 40%, 
      rgba(0, 0, 0, .9) 80%,
      rgba(0, 0, 0, 0) 100%
    );
    z-index: -1;
    background: linear-gradient(to bottom, #c52f6ebe, transparent);
    opacity: 0;
    transform: translateY(-10px);
    transition: opacity 0.3s ease, transform 0.3s ease;
  }

  &.show-blur {
    &::before {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

const Nav = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  margin: 2rem;
  margin-bottom: 0;
  gap: .2rem;

  // Mobile nav styling
  @media (max-width: 479px) {
    position: absolute;
    opacity: ${props => props.$isOpen ? '1' : '0'};
    pointer-events: ${props => props.$isOpen ? 'auto' : 'none'};
  }

  a {
    display: flex;
    justify-content: center;
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

const ToggleMenu = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  justify-content: flex-end;
  padding: .2rem;
  margin-bottom: 1rem;
  opacity: .8;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.2);
  transition: all .3s;

  ${tw`xs:hidden`};

  &:hover {
    opacity: 1;
    cursor: pointer;
    scale: 1.2;
  }
`