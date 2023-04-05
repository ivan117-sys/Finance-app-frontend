import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../../shared/auth-context';
import axios from 'axios';
import './Signup.css';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorModal from '../../components/ErrorModal';

function Signup({ setNameSignup }) {
  const [closeModal, setCloseModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const closeModalHandler = e => {
    setCloseModal(false);
    setIsLoading(false);
  };

  const errorHandler = () => {
    setError(null);
  };
  const nameHandler = e => {
    setName(e.target.value);
  };

  const passwordHandler = e => {
    setPassword(e.target.value);
  };

  const emailHandler = e => {
    setEmail(e.target.value);
  };

  const signupHandler = async e => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const request = {
        name,
        password,
        email,
      };

      const response = await axios.post(
        process.env.REACT_APP_BACKEND_URL + '/users/signup',
        request
      );
      setNameSignup(response.data.name);

      setIsLoading(false);
      auth.login(response.data.user, response.data.token);
      navigate('/main');
    } catch (err) {
      setError(
        err.response.data.message || 'Something went wrong, please try again'
      );
      setCloseModal(true);
    }
  };

  return (
    <React.Fragment>
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }}
        className="login__container"
      >
        {isLoading && <LoadingSpinner asOverlay />}
        {error && closeModal && (
          <ErrorModal
            closeModalHandler={closeModalHandler}
            error={error}
            errorHandler={errorHandler}
          />
        )}
        <form onSubmit={signupHandler}>
          <h1 className="signup__header">Please Signup</h1>

          <label className="name__label" htmlFor="name">
            Name
          </label>
          <input
            value={name}
            onChange={nameHandler}
            type="text"
            id="name"
            required
          ></input>

          <span className="error__message">Please enter valid name</span>
          <label className="email__label" htmlFor="email">
            Email
          </label>
          <input
            type="text"
            id="email"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            className="input__email"
            required
            value={email}
            onChange={emailHandler}
          ></input>
          <span className="error__email">Please enter valid email</span>

          <label className="password__label" htmlFor="password">
            Password
          </label>
          <input
            value={password}
            onChange={passwordHandler}
            type="password"
            id="password"
            required
            className="input__password"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
          ></input>
          <span className="error__password">Please enter valid password</span>
          <button className="form__button s__button">Signup</button>
        </form>
      </motion.div>
    </React.Fragment>
  );
}

export default Signup;
