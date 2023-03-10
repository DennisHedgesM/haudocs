import React, { useState } from "react";
import "../LoginForm.css";
import Card from "../../components/card/Card";
import { auth } from "../../firebase";
import { sendEmailVerification } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { useAuthValue } from "../../context/Authvalue";
import bgimage from "../../assets/bg.jpg"
import { registerWithEmailAndPassword } from "../../firebase";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState("");
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState("");
  const {setTimeActive} = useAuthValue()
  const [name, setName] = useState("");

  const validatePassword = () => {
    let isValid = true
    if (password !== '' && confirmPassword !== ''){
      if (password !== confirmPassword) {
        isValid = false
        setErrorMessages('Passwords does not match')
      }
    }
    return isValid
  }

/*   const createUser = async () => {
    const usersCollectionRef = collection(db, "users")
    await addDoc(usersCollectionRef, { 
      email: email,
      createdAt: serverTimestamp(),
      user: userName,
      role: "",
    });
  }; */

  const errors = {
    email: "Invalid email",
    password: "Invalid password",
    noUsername: "Please enter your username",
    noPassword: "Please enter your password",
  };

/*   const handleSubmit = e => {
    // Prevent page from reloading
    e.preventDefault();
    if(validatePassword()) {
      // Create a new user with email and password using firebase
        createUserWithEmailAndPassword(auth, email, password, userName)
        .then(() => {
          sendEmailVerification(auth.currentUser) 
          .then(() => {
            setTimeActive(true)  
            navigate('/verifyemail')}).catch((err) => alert(err.message))
        }).catch(err => setErrorMessages(err.message))
    }
    setUser('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')

    if (!email) {
      // Username input is empty
      setErrorMessages({ email: "noUsername", message: errors.noUsername });
      return;
    }

    if (!password) {
      // Password input is empty
      setErrorMessages({ email: "noPassword", message: errors.noPassword });
      return;
    }
  }; */

  const register = () => {
    if (validatePassword()) {;
    registerWithEmailAndPassword(name, email, password)
    .then(() => {
      sendEmailVerification(auth.currentUser) 
      .then(() => {
        setTimeActive(true)  
        navigate('/verifyemail')}).catch((err) => alert(err.message))
    }).catch(err => setErrorMessages(err.message))
    }
    setName('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')

    if (!email) {
      // Username input is empty
      setErrorMessages({ email: "noUsername", message: errors.noUsername });
      return;
    }

    if (!password) {
      // Password input is empty
      setErrorMessages({ email: "noPassword", message: errors.noPassword });
      return;
    }
  };

  // Render error messages
  const renderErrorMsg = (email) =>
    email=== errorMessages.email && (
      <p className="error_msg">{errorMessages.message}</p>
    );

  const myStyle={
    backgroundImage:`url(${bgimage})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height: '100%',
    position: 'fixed'
  };

  return (
    <div style={myStyle}>
    <Card>
    <h1 className="title">Sign Up for HAUDOCS <p>Create a free account</p> </h1>
      <div className="inputs_container">
      <hr className='hrline'></hr>
      <p className='text-base mb-4 mt-6 text-white'>Welcome! Please Enter your details</p>
      {errorMessages && <div className='auth__error'>{errorMessages}</div>}
      <p className="text-base text-white">Your Name:</p>
        <input
          required
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      <p className="text-base text-white">Your Email:</p>
        <input
          required
          type="text"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {renderErrorMsg("username")}
        {renderErrorMsg("noUsername")}
        <p className="text-base text-white">Your Password:</p>
        <input
          required
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {renderErrorMsg("password")}
        {renderErrorMsg("noPassword")}

        <p className="text-base text-white">Confirm Password:</p>
        <input
          required
          type="password"
          placeholder="Password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
        {renderErrorMsg("password")}
        {renderErrorMsg("noPassword")}
      </div>
      <input onClick={register} type="submit" value="Signup" className="login_button" />
      <div className='w-full flex items-center justify-center'>
        <p className='text-sm font-normal text-white mt-5'>Already have an account? <Link to= "/Signin"><a className='font-semibold underline underline-offset-2 cursor-pointer'>Login here</a></Link></p>
      </div>
  </Card>
  </div>
  );
};

export default Signup;