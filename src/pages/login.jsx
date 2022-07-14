import { useState } from "react";
import "../assets/style/auth.css";

import Modal from "../components/Modal";
import Header from "../components/header";


export default function Login() {
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modal, setModal] = useState({display:false})

    const database = [
        {
          username: "user1",
          password: "pass1"
        },
        {
          username: "user2",
          password: "pass2"
        }
      ];
    
      const errors = {
        uname: "invalid username",
        pass: "invalid password"
      };
    
      const handleSubmit = (event) => {
        //Prevent page reload
        event.preventDefault();
    
        var { uname, pass } = document.forms[0];
    
        // Find user login info
        const userData = database.find((user) => user.username === uname.value);
    
        // Compare user info
        if (userData) {
          if (userData.password !== pass.value) {
            // Invalid password
            setErrorMessages({ name: "pass", message: errors.pass });
          } else {
            setIsSubmitted(true);
          }
        } else {
          // Username not found
          setErrorMessages({ name: "uname", message: errors.uname });
        }
      };
    
      // Generate JSX code for error message
      const renderErrorMessage = (name) =>
        name === errorMessages.name && (
          <div className="error">{errorMessages.message}</div>
        );
    
      // JSX code for login form
      const renderForm = (
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <input type="text" name="uname" required placeholder="Enter your email address" />
              {renderErrorMessage("uname")}
            </div>
            <div className="input-container">
              <input type="password" name="pass" required placeholder="Enter your password"/>
              {renderErrorMessage("pass")}
            </div>
            <div className="button-container">
              <button type="submit">Login to buy your token</button>
              {/* <input type="submit" /> */}
            </div>
          </form>
        </div>
      );
    
      return (
        <>
        <Header>
          <nav>
            <a className="home" href="#">Home</a>
            <a href="#">Login</a>
            <a href="#">Sign up</a>
          </nav>
        </Header>
        <div className="content">
          <div className="login-form">
            <div className="title">Login</div>
            {isSubmitted ? setShowModal(true) :renderForm }
          </div>
          {modal.display && (
            <Modal 
          display={showModal}
          changeModalDisplay={()=>setShowModal(!showModal)}
          />
          )}
        </div>
        {/* <AlertModal
        state={showModal}
        hide={()=>{setShowModal(!showModal)}}
        /> */}
        </>
      );
    
}