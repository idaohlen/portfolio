import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import anime from "animejs/lib/anime.es.js";
import tw from "twin.macro";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import { getActualHeight } from "../utils/utils";

export default function Header() {
  const location = useLocation();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 480);
  const navRef = useRef(null);
  const menuIconRef = useRef(null);

  function toggleNav() {
    setIsNavOpen(!isNavOpen);

    anime({
      targets: menuIconRef.current,
      scale: [0, 1],
      duration: 300,
      easing: "easeOutQuad"
    });
  }

  function handleLinkClick() {
    if (isMobile) {
      setIsNavOpen(false);
      anime({
        targets: menuIconRef.current,
        scale: [0, 1],
        duration: 300,
        easing: "easeOutQuad"
      });
    }
  }

  // Animate the nav menu when it opens/closes
  useEffect(() => {
    if (!navRef.current) return;
    
    // When opening the menu on mobile
    if (isNavOpen && isMobile) {
      navRef.current.style.display = 'flex';
      
      // Get the actual height before animation
      const targetHeight = getActualHeight(navRef.current);
      
      // Set initial state for animation
      anime.set(navRef.current, {
        opacity: 0,
        height: 0,
        overflow: 'hidden'
      });
      
      // Animate to visible state
      anime({
        targets: navRef.current,
        opacity: [0, 1],
        height: [0, targetHeight],
        duration: 300,
        easing: "easeOutQuad",
        complete: function() {
          // After animation completes, set height to auto
          navRef.current.style.height = 'auto';
          navRef.current.style.overflow = 'visible';
        }
      });
    } 
    // When closing the menu on mobile
    else if (!isNavOpen && isMobile && navRef.current.style.display !== 'none') {
      // Get current height before animating
      const currentHeight = navRef.current.offsetHeight;
      
      // Set fixed height before animation
      navRef.current.style.height = `${currentHeight}px`;
      navRef.current.style.overflow = 'hidden';
      
      // Animate to hidden state
      anime({
        targets: navRef.current,
        opacity: [1, 0],
        height: [currentHeight, 0],
        duration: 300,
        easing: "easeOutQuad",
        complete: function() {
          navRef.current.style.display = 'none';
        }
      });
    }
  }, [isNavOpen, isMobile]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 480;
      setIsMobile(mobile);

      if (!mobile) setIsNavOpen(false);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Close the menu when the route changes
  useEffect(() => {
    if (isMobile) {
      setIsNavOpen(false);
    }
  }, [location.pathname, isMobile]);

  // Determine when to show blur effect
  const showBlur = !isMobile || isNavOpen;

  return (
    <SiteHeader className={showBlur ? "show-blur" : ""}>
      <ToggleMenu onClick={toggleNav}>
        <div ref={menuIconRef} style={{ transformOrigin: 'center' }}>
          <Icon
            fontSize="30px"
            icon={
              isNavOpen
                ? "iconamoon:close-thin"
                : "iconamoon:menu-burger-horizontal-thin"
            }
            className="p-1"
          />
        </div>
      </ToggleMenu>

      <Nav
        className="flex-col xs:flex-row"
        $isOpen={isNavOpen}
        ref={navRef}
        style={{ 
          display: (isNavOpen || !isMobile) ? 'flex' : 'none',
          opacity: isMobile ? 0 : 1,
          height: isMobile ? 0 : 'auto'
        }}
      >
        {links.map(link => (
          <Link
            to={link.path}
            onClick={handleLinkClick}
            key={link.label}
            className={`flex items-center gap-1 ${location.pathname === link.path ? 'active' : ''}`}
          >
            <Icon icon={link.icon} />
            <div>{link.label}</div>
          </Link>
        ))}
      </Nav>
    </SiteHeader>
  );
}

const links = [
  {
    label: "Home",
    path: "/",
    icon: "iconamoon:home-light",
  },
  {
    label: "About",
    path: "/about",
    icon: "iconamoon:comment-light",
  },
  {
    label: "Skills",
    path: "/skills",
    icon: "iconamoon:lightning-1-light",
  },
  {
    label: "Projects",
    path: "/projects",
    icon: "ion:code-slash",
  },
];

const SiteHeader = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 20;
  transition: backdrop-filter 0.3s ease;

  &::before {
    ${tw`h-[250px] xs:h-[120px]`};
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    mask-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 1) 0%,
      rgba(0, 0, 0, 1) 40%,
      rgba(0, 0, 0, 0.9) 80%,
      rgba(0, 0, 0, 0) 100%
    );
    -webkit-mask-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 1) 0%,
      rgba(0, 0, 0, 1) 40%,
      rgba(0, 0, 0, 0.9) 80%,
      rgba(0, 0, 0, 0) 100%
    );
    z-index: -1;
    background: linear-gradient(to bottom, #c52f6ebe, transparent);
    opacity: 0;
    transform: translateY(-10px);
    transition: opacity 0.3s ease, transform 0.3s ease;
    pointer-events: none;
  }

  &.show-blur {
    &::before {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  margin: 2rem;
  margin-bottom: 0;
  gap: 0.2rem;

  // Mobile nav styling
  @media (max-width: 479px) {
    position: absolute;
    opacity: ${(props) => (props.$isOpen ? "1" : "0")};
    pointer-events: ${(props) => (props.$isOpen ? "auto" : "none")};
  }

  a {
    display: flex;
    justify-content: center;
    color: white;
    padding: 0.4rem 1rem;
    border: 1px solid #ffffff83;
    border-radius: 10rem;
    text-decoration: none;
    transform: scale(0.9);

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
      background: rgba(255, 157, 244, 0.3);
    }

    &:nth-child(2):hover {
      --color: rgb(255, 197, 61);
      border-color: var(--color);
      background: rgba(255, 197, 61, 0.3);
    }

    &:nth-child(3):hover {
      --color: rgb(48, 201, 140);
      border-color: var(--color);
      background: rgba(48, 201, 140, 0.3);
    }

    &:nth-child(4):hover {
      --color: rgb(137, 198, 255);
      border-color: var(--color);
      background: rgba(137, 198, 255, 0.3);
    }
  }
`;

const ToggleMenu = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  justify-content: flex-end;
  padding: 0.2rem;
  margin-bottom: 1rem;
  opacity: 0.8;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.2);
  transition: all 0.3s;

  ${tw`xs:hidden`};

  &:hover {
    opacity: 1;
    cursor: pointer;
    scale: 1.2;
  }
`;
