import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorModal from '../../components/ErrorModal';
import { AuthContext } from '../../shared/auth-context';
import { useNavigate } from 'react-router-dom';

function Login({ setName }) {
  const [closeModal, setCloseModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [email, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useContext(AuthContext);

  const navigate = useNavigate();

  const emailHandler = e => {
    setUserEmail(e.target.value);
  };

  const passwordHandler = e => {
    setPassword(e.target.value);
  };

  const closeModalHandler = e => {
    setCloseModal(false);
    setIsLoading(false);
  };

  const errorHandler = () => {
    setError(null);
  };

  const loginHandler = async e => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const request = {
        password,
        email,
      };

      const response = await axios.post(
        process.env.REACT_APP_BACKEND_URL + '/users/login',
        request
      );

      setIsLoading(false);
      auth.login(response.data.userId, response.data.token);
      setName(response.data.name);

      navigate('/main');
    } catch (err) {
      setError(
        err.response.data?.message || 'Something went wrong, please try again'
      );
      setCloseModal(true);
    }

    setPassword('');
    setUserEmail('');
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
        <form onSubmit={loginHandler}>
          <h1 className="login__header">Please Login</h1>
          <label className="username__label" htmlFor="email">
            Email
          </label>
          <input
            value={email}
            onChange={emailHandler}
            type="text"
            id="email"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            required
          ></input>

          <span className="error__message">Please enter valid email</span>
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
          <span className="error__password">
            Capital, small letter and number
          </span>
          <button className="form__button login__button">Login</button>
        </form>
        <Link to="/signup">
          <button className="signup__button">Signup</button>
        </Link>
      </motion.div>
    </React.Fragment>
  );
}

export default Login;
