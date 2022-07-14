import { React, useEffect, useRef } from 'react'
// import styled from 'styled-components'
import "./modalStyle.css";
// import {motion,AnimatePresence} from 'framer-motion'

// export default function AlertModal ({state, hide}){


const Modal = ({ display = true, children, changeModalDisplay }) => {
  let ref = useRef();

  useEffect(() => {
    window.addEventListener("click", removeClick)
    return () => window.removeEventListener("click", removeClick)
  }, []);

  const removeClick = (e) => {
    if (e.target !== ref.current) {
      changeModalDisplay();
    }
  };

  // if (isOpen) {
  return display ? (
    <div className={"modalcard"} ref={ref}>
      <h1>testing modal</h1>
      {children}
    </div>
  ) : (
    <></>
  )

};

export default Modal
