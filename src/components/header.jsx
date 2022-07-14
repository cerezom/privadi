import React, { useState, useRef, useEffect } from "react";
import logo from '../assets/images/logo.svg';
import "../assets/style/header.css"

export default function Header({children}){
  const [sticky, setSticky] = useState({ isSticky: false, offset: 0 });
  const headerRef = useRef(null);
  const handleScroll = () => {
    if (window.pageYOffset > 100) {
      setSticky({ isSticky: true, offset: "20px" });
    } else {
      setSticky({ isSticky: false, offset: 0 });
    }
  };
  useEffect(() => {
    var header = headerRef.current.getBoundingClientRect();
    const handleScrollEvent = () => {
      handleScroll()
    }
 
    window.addEventListener('scroll', handleScrollEvent);
 
    return () => {
      window.removeEventListener('scroll', handleScrollEvent);
    };
  }, []);
  
    return (
    <header id="sticky-header" className={`navbar${sticky.isSticky ? ' sticky' : ''}`} ref={headerRef}>
    <div className="logo">
      <a href="#"><img src={logo} alt="crypto528 logo" /></a>
    </div>
  
    {children}
    
   
  </header>
  )
}